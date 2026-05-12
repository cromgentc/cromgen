import {
  createContract,
  deleteContractByToken,
  findContractByToken,
  findContracts,
  signCompanyContractByToken,
  signContractByToken,
  updateContractByToken,
} from '../models/Contract.js'
import { getSiteSettings } from '../models/SiteSettings.js'
import { requireRole } from '../middleware/auth.js'
import { json, notFound, readJson, validationError } from '../utils/http.js'
import { sendEmail } from '../utils/email.js'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import mammoth from 'mammoth'

const settingsAuth = requireRole(['admin', 'staff'])

export async function listSettingContracts(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  return json(200, {
    contracts: await findContracts(),
  })
}

export async function createSettingContract(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const body = await readJson(request)

  const isDraft = String(body.status || '').toLowerCase() === 'draft'
  const isCompanySigned = String(body.status || '').toLowerCase() === 'company-signed'
  const shouldEmailRecipient = !isDraft && !isCompanySigned
  if (!body.title || (shouldEmailRecipient && (!body.recipientName || !body.recipientEmail))) {
    return validationError(isDraft ? 'Title is required' : 'Title, recipient name, and recipient email are required')
  }

  if (body.contractFile?.data && !isDocxFile(body.contractFile)) {
    return validationError('Only DOCX contract files are allowed')
  }

  const contract = await createContract(body)
  const emailResult = isDraft
    ? { sent: false, reason: 'Saved as draft' }
    : isCompanySigned
      ? { sent: false, reason: 'Signed by sender' }
    : await sendContractRequestEmail(contract, createSigningUrl(request, contract)).catch((error) => ({
        sent: false,
        reason: error instanceof Error ? error.message : 'Email failed',
      }))

  return json(201, {
    ok: true,
    message: isDraft
      ? 'Contract saved as draft.'
      : isCompanySigned
        ? 'Contract signed and saved.'
      : emailResult.sent
        ? 'Contract saved and signing email sent to recipient.'
        : 'Contract saved, but signing email could not be sent.',
    contract,
    email: emailResult,
  })
}

export async function deleteSettingContract(request, { token }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const deleted = await deleteContractByToken(token)
  if (!deleted) return notFound('Contract not found')

  return json(200, {
    ok: true,
    message: 'Contract deleted',
  })
}

export async function updateSettingContract(request, { token }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const body = await readJson(request)
  const existingContract = await findContractByToken(token)
  if (!existingContract) return notFound('Contract not found')

  const isDraft = String(body.status || '').toLowerCase() === 'draft'
  const isCompanySigned = String(body.status || '').toLowerCase() === 'company-signed'
  const shouldEmailRecipient = !isDraft && !isCompanySigned
  if (!body.title || (shouldEmailRecipient && (!body.recipientName || !body.recipientEmail))) {
    return validationError(isDraft ? 'Title is required' : 'Title, recipient name, and recipient email are required')
  }

  if (body.contractFile?.data && !isDocxFile(body.contractFile)) {
    return validationError('Only DOCX contract files are allowed')
  }

  const contract = await updateContractByToken(token, body)
  const shouldSend = shouldEmailRecipient && String(existingContract.status || '').toLowerCase() === 'draft'
  const emailResult = shouldSend
    ? await sendContractRequestEmail(contract, createSigningUrl(request, contract)).catch((error) => ({
        sent: false,
        reason: error instanceof Error ? error.message : 'Email failed',
      }))
    : { sent: false, reason: shouldSend ? 'Email failed' : 'Email not requested' }

  return json(200, {
    ok: true,
    message: shouldSend
      ? emailResult.sent ? 'Contract saved and signing email sent to recipient.' : 'Contract saved, but signing email could not be sent.'
      : isCompanySigned ? 'Contract signed and saved.'
      : 'Contract updated successfully.',
    contract,
    email: emailResult,
  })
}

export async function previewSettingContractFile(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const body = await readJson(request)
  const file = body.contractFile
  if (!file?.data) return validationError('Contract file is required')

  if (!isDocxFile(file)) {
    return validationError('Only DOCX contract files can be previewed')
  }

  const fileBody = decodeDataUrl(file.data)
  if (!fileBody) return validationError('Contract file could not be read')

  const result = await mammoth.extractRawText({ buffer: fileBody })

  return json(200, {
    ok: true,
    text: result.value || '',
  })
}

export async function getPublicContractForSigning(_request, { token }) {
  const contract = await findContractByToken(token)
  if (!contract) return notFound('Contract not found')

  return json(200, {
    contract,
  })
}

export async function getPublicContractFile(_request, { token }) {
  const contract = await findContractByToken(token)
  if (!contract?.contractFile?.data) return notFound('Contract file not found')

  const file = contract.contractFile
  const body = decodeDataUrl(file.data)
  if (!body) return notFound('Contract file not found')

  return {
    raw: true,
    status: 200,
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
      'Content-Disposition': `inline; filename="${sanitizeFileName(file.name || 'contract-document')}"`,
      'Cache-Control': 'private, max-age=300',
    },
    body,
  }
}

export async function getPublicContractHtml(_request, { token }) {
  const contract = await findContractByToken(token)
  if (!contract?.contractFile?.data) return notFound('Contract file not found')

  if (!isDocxFile(contract.contractFile)) {
    return validationError('Only DOCX contract files can be converted to HTML')
  }

  const body = decodeDataUrl(contract.contractFile.data)
  if (!body) return notFound('Contract file not found')

  const result = await mammoth.convertToHtml({ buffer: body }, {
    styleMap: [
      "p[style-name='Title'] => h1:fresh",
      "p[style-name='Subtitle'] => h2:fresh",
      "p[style-name='Heading 1'] => h1:fresh",
      "p[style-name='Heading 2'] => h2:fresh",
      "p[style-name='Heading 3'] => h3:fresh",
    ],
  })

  return {
    raw: true,
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'private, max-age=300',
    },
    body: Buffer.from(createContractHtmlDocument(result.value), 'utf8'),
  }
}

export async function getPublicSignedContractFile(_request, { token }) {
  const contract = await findContractByToken(token)
  if (!contract) return notFound('Contract not found')

  if (!contract.signedContractFile?.data && contract.signaturePlacements?.length) {
    const generatedFile = await createSignedPdfFile(contract, contract)
    if (generatedFile?.data) {
      return sendPdfFile(generatedFile)
    }
  }

  if (!contract.signedContractFile?.data) return notFound('Signed contract file not found')

  return sendPdfFile(contract.signedContractFile)
}

function sendPdfFile(file) {
  const body = decodeDataUrl(file.data)
  if (!body) return notFound('Signed contract file not found')

  return {
    raw: true,
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${sanitizeFileName(file.name || 'signed-contract.pdf')}"`,
      'Cache-Control': 'private, max-age=300',
    },
    body,
  }
}

export async function signCompanyPublicContract(request, { token }) {
  const body = await readJson(request)
  const existingContract = await findContractByToken(token)
  if (!existingContract) return notFound('Contract not found')

  const signedBody = {
    ...body,
    companySignatureName: body.companySignatureName || existingContract.senderName || 'Cromgen Technology',
  }

  if (!signedBody.companySignatureName || !signedBody.companySignatureData) {
    return validationError('First party signature and signer name are required')
  }

  const signedContractFile = await createSignedPdfFile(existingContract, signedBody)

  const contract = await signCompanyContractByToken(token, {
    ...signedBody,
    signedContractFile,
    signerIp: request.headers['x-forwarded-for'] || request.socket?.remoteAddress || '',
    userAgent: request.headers['user-agent'] || '',
  })

  if (!contract) return notFound('Contract not found')

  const origin = process.env.APP_ORIGIN || request.headers.origin || `http://${request.headers.host}`
  const signingUrl = `${origin.replace(/\/$/, '')}/contract-sign/${contract.signingToken}`
  const emailResult = await sendContractRequestEmail(contract, signingUrl).catch((error) => ({
    sent: false,
    reason: error instanceof Error ? error.message : 'Email failed',
  }))

  return json(emailResult.sent ? 200 : 503, {
    ok: emailResult.sent,
    message: emailResult.sent
      ? 'First party signed. Contract email sent to second party.'
      : 'First party signed. Email is not configured or failed to send.',
    contract,
    email: emailResult,
  })
}

export async function signPublicContract(request, { token }) {
  const body = await readJson(request)
  const existingContract = await findContractByToken(token)
  if (!existingContract) return notFound('Contract not found')

  const signedBody = {
    ...body,
    companySignatureName: body.companySignatureName || existingContract.senderName || 'Cromgen Technology',
    signatureName: body.signatureName || existingContract.recipientName,
    signerEmail: body.signerEmail || existingContract.recipientEmail,
  }

  if (!signedBody.signatureName || !signedBody.signerEmail || !signedBody.signatureData) {
    return validationError('Signature, signer name, and signer email are required')
  }

  const signedContractFile = await createSignedPdfFile(existingContract, signedBody)

  const contract = await signContractByToken(token, {
    ...signedBody,
    signedContractFile,
    signerIp: request.headers['x-forwarded-for'] || request.socket?.remoteAddress || '',
    userAgent: request.headers['user-agent'] || '',
  })

  if (!contract) return notFound('Contract not found')

  const origin = process.env.APP_ORIGIN || request.headers.origin || `http://${request.headers.host}`
  const signingUrl = `${origin.replace(/\/$/, '')}/contract-sign/${contract.signingToken}`
  const notificationResult = await sendSignedNotificationEmail(contract, signingUrl).catch((error) => ({
    sent: false,
    reason: error instanceof Error ? error.message : 'Email failed',
  }))

  return json(200, {
    ok: true,
    message: notificationResult?.sent === false
      ? 'Contract signed successfully, but signed copy notification could not be sent.'
      : 'Contract signed successfully. Signed copy notification sent.',
    contract,
    email: notificationResult || { sent: true },
  })
}

function sendContractRequestEmail(contract, signingUrl) {
  const recipientName = escapeEmailHtml(contract.recipientName || 'Client')
  const contractTitle = escapeEmailHtml(contract.title || 'Contract')

  return sendEmail({
    to: contract.recipientEmail,
    subject: `Contract ready for signature: ${contract.title}`,
    text: `Hello ${contract.recipientName}, Cromgen Technology has sent you a contract titled ${contract.title}. Please use the Review and Sign button in this email to complete the signature.`,
    html: `
      <div style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif;color:#101828">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#f4f6fb;padding:32px 0">
          <tr>
            <td align="center" style="padding:32px 16px">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;border-collapse:collapse;overflow:hidden;border:1px solid #e4e9f2;border-radius:18px;background:#ffffff;box-shadow:0 24px 70px rgba(16,24,40,0.10)">
                <tr>
                  <td style="background:#101828;padding:28px 32px;color:#ffffff">
                    <div style="font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#b8c2ff">Cromgen Technology</div>
                    <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;font-weight:900;color:#ffffff">Contract ready for signature</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:30px 32px 8px">
                    <p style="margin:0;color:#475467;font-size:16px;line-height:1.7">Hello <strong style="color:#101828">${recipientName}</strong>,</p>
                    <p style="margin:14px 0 0;color:#475467;font-size:16px;line-height:1.7">Cromgen Technology has sent you a contract for review and signature.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 32px">
                    <div style="border:1px solid #e4e9f2;border-radius:14px;background:#f8fafc;padding:18px 20px">
                      <div style="font-size:11px;font-weight:900;letter-spacing:1.2px;text-transform:uppercase;color:#465fff">Contract Title</div>
                      <div style="margin-top:7px;color:#101828;font-size:18px;font-weight:900;line-height:1.4">${contractTitle}</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 32px 34px">
                    <a href="${signingUrl}" style="display:inline-block;border-radius:12px;background:#465fff;padding:14px 22px;color:#ffffff;font-size:13px;font-weight:900;letter-spacing:1px;text-decoration:none;text-transform:uppercase;box-shadow:0 12px 30px rgba(70,95,255,0.28)">Review and Sign</a>
                  </td>
                </tr>
                <tr>
                  <td style="border-top:1px solid #e4e9f2;background:#fbfcff;padding:18px 32px">
                    <p style="margin:0;color:#667085;font-size:12px;line-height:1.6">This secure request was sent by Cromgen Technology. Please review the document carefully before signing.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `,
  })
}

function escapeEmailHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function decodeDataUrl(dataUrl) {
  const match = String(dataUrl || '').match(/^data:([^;]+);base64,(.+)$/)
  if (!match) return null
  return Buffer.from(match[2], 'base64')
}

function sanitizeFileName(name) {
  return String(name || 'contract-document').replace(/["\r\n]/g, '').trim() || 'contract-document'
}

function isDocxFile(file) {
  return (
    file?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    /\.docx$/i.test(file?.name || '')
  )
}

function createContractHtmlDocument(body) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          html,body{margin:0;background:#fff;color:#101828;font-family:Arial,Helvetica,sans-serif}
          body{padding:44px 52px;font-size:14px;line-height:1.65}
          h1,h2,h3{margin:0 0 14px;color:#101828;line-height:1.25}
          h1{font-size:26px} h2{font-size:21px} h3{font-size:17px}
          p{margin:0 0 12px}
          table{width:100%;border-collapse:collapse;margin:18px 0}
          td,th{border:1px solid #d0d5dd;padding:9px 10px;vertical-align:top}
          ul,ol{margin:0 0 14px 22px;padding:0}
          img{max-width:100%;height:auto}
        </style>
      </head>
      <body>${body || '<p>Contract content could not be rendered.</p>'}</body>
    </html>
  `
}

async function createSignedPdfFile(contract, signedBody) {
  const sourceFile = contract.contractFile || {}
  const isPdf = sourceFile.type === 'application/pdf' || /\.pdf$/i.test(sourceFile.name || '')
  if (!isPdf || !sourceFile.data) return { name: '', type: '', data: '' }

  const sourceBytes = decodeDataUrl(sourceFile.data)
  if (!sourceBytes) return { name: '', type: '', data: '' }

  const pdfDoc = await PDFDocument.load(sourceBytes)
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  if (!firstPage) return { name: '', type: '', data: '' }

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const { width, height } = firstPage.getSize()
  const placements = Array.isArray(signedBody.signaturePlacements) ? signedBody.signaturePlacements : []

  for (const placement of placements) {
    const x = (clampPercent(placement.x) / 100) * width
    const y = height - ((clampPercent(placement.y) / 100) * height)

    if (placement.image) {
      const imageBytes = decodeDataUrl(placement.image)
      if (!imageBytes) continue

      const image = await pdfDoc.embedPng(imageBytes)
      const imageWidth = Math.min(150, width * 0.24)
      const imageHeight = Math.min(64, imageWidth / image.width * image.height)
      firstPage.drawImage(image, {
        x: Math.max(0, Math.min(width - imageWidth, x - imageWidth / 2)),
        y: Math.max(0, Math.min(height - imageHeight, y - imageHeight / 2)),
        width: imageWidth,
        height: imageHeight,
      })
      continue
    }

    const text = String(placement.label || '').trim()
    if (!text) continue

    const fontSize = String(placement.type || '').endsWith('-date') ? 10 : 14
    firstPage.drawText(text, {
      x: Math.max(0, Math.min(width - 180, x - 75)),
      y: Math.max(0, Math.min(height - fontSize, y - fontSize / 2)),
      size: fontSize,
      font,
      color: rgb(0.06, 0.09, 0.16),
    })
  }

  const bytes = await pdfDoc.save()
  const baseName = sanitizeFileName(sourceFile.name || contract.slug || 'contract.pdf').replace(/\.pdf$/i, '')
  return {
    name: `${baseName}-signed.pdf`,
    type: 'application/pdf',
    data: `data:application/pdf;base64,${Buffer.from(bytes).toString('base64')}`,
  }
}

function clampPercent(value) {
  const number = Number(value)
  if (!Number.isFinite(number)) return 0
  return Math.max(0, Math.min(100, number))
}

function createSigningUrl(request, contract) {
  const origin = process.env.APP_ORIGIN || request.headers.origin || `http://${request.headers.host}`
  return `${origin.replace(/\/$/, '')}/contract-sign/${contract.signingToken}`
}

async function sendSignedNotificationEmail(contract, signingUrl) {
  const siteSettings = await getSiteSettings().catch(() => null)
  const emailConfig = siteSettings?.emailConfig || {}
  const adminEmail =
    emailConfig.adminEmail ||
    process.env.ADMIN_EMAIL ||
    emailConfig.mailFrom ||
    process.env.MAIL_FROM ||
    emailConfig.smtpUser ||
    process.env.SMTP_USER
  const recipients = [adminEmail, contract.signerEmail || contract.recipientEmail].filter(Boolean)
  if (!recipients.length) return Promise.resolve({ sent: false, reason: 'Email recipients are not configured' })

  await Promise.all(recipients.map((email) => sendEmail({
    to: email,
    subject: `Contract signed: ${contract.title}`,
    text: `${contract.title} is fully signed. Open and download the signed copy here: ${signingUrl}`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#101828">
        <h2>Contract signed</h2>
        <p><strong>${contract.title}</strong> has been signed.</p>
        <p>Company signer: ${contract.companySignatureName}</p>
        <p>Client signer: ${contract.signatureName}</p>
        <p>Email: ${contract.signerEmail || contract.recipientEmail}</p>
        <p>Signed at: ${contract.signedAt}</p>
        <p><a href="${signingUrl}" style="display:inline-block;background:#101828;color:#fff;padding:12px 18px;border-radius:8px;text-decoration:none">Download Signed Copy</a></p>
      </div>
    `,
  })))

  return { sent: true }
}
