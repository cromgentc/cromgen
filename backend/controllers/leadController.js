import { randomUUID } from 'node:crypto'
import { requireRole } from '../middleware/auth.js'
import { createLead, deleteAllLeads, deleteLeadById, findLeads } from '../models/Lead.js'
import { json, notFound, readJson, validationError } from '../utils/http.js'
import { sendEmail } from '../utils/email.js'

const settingsAuth = requireRole(['admin', 'staff'])
const emailOtps = new Map()
const verifiedOtpTokens = new Map()
const OTP_TTL_MS = 10 * 60 * 1000
const VERIFIED_TTL_MS = 20 * 60 * 1000

export async function createPublicLead(request) {
  const body = await readJson(request)

  if (!body.name || !body.email || !body.service || !body.query) {
    return validationError('Name, email, service, and query are required')
  }

  if (body.requiresEmailVerification && !consumeVerifiedEmail(body.email, body.otpToken)) {
    return validationError('Please verify your email OTP before submitting')
  }

  const lead = await createLead(body)

  return json(201, {
    ok: true,
    message: 'Lead submitted successfully',
    lead,
  })
}

export async function sendLeadOtp(request) {
  const body = await readJson(request)
  const email = normalizeEmail(body.email)

  if (!isValidEmail(email)) {
    return validationError('Please enter a valid email address')
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000))
  emailOtps.set(email, {
    otp,
    expiresAt: Date.now() + OTP_TTL_MS,
  })

  let emailResult

  try {
    emailResult = await sendEmail({
      to: email,
      subject: 'Your Cromgen sample download OTP',
      text: `Your Cromgen Technology OTP is ${otp}. It will expire in 10 minutes.`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6">
          <h2>Your Cromgen Technology OTP</h2>
          <p>Use this code to verify your email and download the Machine Learning Solutions sample.</p>
          <p style="font-size:28px;font-weight:800;letter-spacing:6px;color:#ff4b2d">${otp}</p>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Lead OTP email failed:', error instanceof Error ? error.message : error)
    emailOtps.delete(email)
    return json(502, {
      ok: false,
      message: 'OTP email could not be sent. Please check SMTP settings and try again.',
    })
  }

  return json(200, {
    ok: true,
    message: emailResult.sent
      ? 'OTP sent to your email address'
      : 'OTP generated. Configure SMTP to send emails from the backend.',
    devOtp: emailResult.sent ? undefined : otp,
  })
}

export async function verifyLeadOtp(request) {
  const body = await readJson(request)
  const email = normalizeEmail(body.email)
  const otp = String(body.otp || '').trim()
  const record = emailOtps.get(email)

  if (!isValidEmail(email)) {
    return validationError('Please enter a valid email address')
  }

  if (!record || record.expiresAt < Date.now()) {
    emailOtps.delete(email)
    return validationError('OTP expired. Please request a new OTP.')
  }

  if (record.otp !== otp) {
    return validationError('Incorrect OTP. Please check your email and try again.')
  }

  emailOtps.delete(email)
  const token = randomUUID()
  verifiedOtpTokens.set(token, {
    email,
    expiresAt: Date.now() + VERIFIED_TTL_MS,
  })

  return json(200, {
    ok: true,
    message: 'Email verified successfully',
    otpToken: token,
  })
}

export async function listSettingLeads(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  return json(200, {
    leads: await findLeads(),
  })
}

export async function deleteSettingLead(request, { id }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const deleted = await deleteLeadById(id)
  if (!deleted) return notFound('Lead not found')

  return json(200, {
    ok: true,
    message: 'Lead deleted',
  })
}

export async function deleteAllSettingLeads(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const deletedCount = await deleteAllLeads()

  return json(200, {
    ok: true,
    message: 'All leads deleted',
    deletedCount,
  })
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function consumeVerifiedEmail(email, token) {
  const normalizedEmail = normalizeEmail(email)
  const normalizedToken = String(token || '').trim()
  const record = verifiedOtpTokens.get(normalizedToken)

  if (!record || record.expiresAt < Date.now() || record.email !== normalizedEmail) {
    verifiedOtpTokens.delete(normalizedToken)
    return false
  }

  verifiedOtpTokens.delete(normalizedToken)
  return true
}
