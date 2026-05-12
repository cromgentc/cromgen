import { requireRole } from '../middleware/auth.js'
import {
  createApplication,
  deleteAllApplications,
  deleteApplicationById,
  findApplicationById,
  findApplications,
  findApplicationsCreatedBy,
  updateApplicationById,
} from '../models/Application.js'
import { findJobPostBySlug } from '../models/JobPost.js'
import { forbidden, json, notFound, readJson, validationError } from '../utils/http.js'
import { verifyToken } from '../utils/security.js'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import mammoth from 'mammoth'

const settingsAuth = requireRole(['admin', 'staff'])

export async function createPublicApplication(request) {
  const body = await readJson(request)
  const candidate = body.candidate || {}

  if (!body.job || !body.title || !candidate.name || !candidate.email || !candidate.phone) {
    return validationError('Job, title, candidate name, email, and phone are required')
  }

  const job = await findJobPostBySlug(body.job)
  const application = await createApplication({
    ...body,
    createdBy: job?.createdBy || '',
  })

  return json(201, {
    ok: true,
    message: 'Application submitted successfully',
    application,
  })
}

export async function listSettingApplications(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  return json(200, {
    applications: auth.payload?.role === 'staff' ? await findApplicationsCreatedBy(auth.payload.sub) : await findApplications(),
  })
}

export async function createSettingApplication(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const body = await readJson(request)
  const candidate = body.candidate || {}

  if (!body.job || !body.title || !candidate.name || !candidate.email || !candidate.phone) {
    return validationError('Job, title, candidate name, email, and phone are required')
  }

  const application = await createApplication({
    ...body,
    createdBy: auth.payload?.role === 'staff' ? auth.payload.sub : body.createdBy,
  })

  return json(201, {
    ok: true,
    message: 'Application created',
    application,
  })
}

export async function updateSettingApplication(request, { id }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const body = await readJson(request)
  const candidate = body.candidate || {}

  if (!body.job || !body.title || !candidate.name || !candidate.email || !candidate.phone) {
    return validationError('Job, title, candidate name, email, and phone are required')
  }

  const existing = await findApplicationById(id)
  if (auth.payload?.role === 'staff' && existing?.createdBy !== auth.payload.sub) {
    return forbidden('You can only update applications for your job posts')
  }

  const application = await updateApplicationById(id, {
    ...body,
    createdBy: auth.payload?.role === 'staff' ? auth.payload.sub : body.createdBy || existing?.createdBy,
  })
  if (!application) return notFound('Application not found')

  return json(200, {
    ok: true,
    message: 'Application updated',
    application,
  })
}

export async function deleteSettingApplication(request, { id }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const existing = auth.payload?.role === 'staff' ? await findApplicationById(id) : null
  if (existing && existing.createdBy !== auth.payload.sub) {
    return forbidden('You can only delete applications for your job posts')
  }

  const deleted = await deleteApplicationById(id)
  if (!deleted) return notFound('Application not found')

  return json(200, {
    ok: true,
    message: 'Application deleted',
  })
}

export async function deleteAllSettingApplications(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error
  if (auth.payload?.role === 'staff') return forbidden('Staff cannot delete all applications')

  const deletedCount = await deleteAllApplications()

  return json(200, {
    ok: true,
    message: 'All applications deleted',
    deletedCount,
  })
}

export async function viewSettingApplicationResume(request, { id }, url) {
  const auth = getDownloadAuth(request, url)
  if (auth.error) return auth.error

  const application = await findApplicationById(id)
  if (!application?.resume?.data) return notFound('Resume not found')

  const pdfBytes = await createResumePdf(application.resume)
  if (!pdfBytes) return notFound('Resume preview not available')

  return {
    raw: true,
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${sanitizeFileName(getBaseFileName(application.resume.name || 'resume'))}.pdf"`,
      'Cache-Control': 'private, max-age=300',
    },
    body: pdfBytes,
  }
}

export async function downloadSettingApplicationResume(request, { id }, url) {
  const auth = getDownloadAuth(request, url)
  if (auth.error) return auth.error

  const application = await findApplicationById(id)
  if (!application?.resume?.data) return notFound('Resume not found')

  const body = decodeDataUrl(application.resume.data)
  if (!body) return notFound('Resume not found')

  return {
    raw: true,
    status: 200,
    headers: {
      'Content-Type': application.resume.type || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${sanitizeFileName(application.resume.name || 'candidate-resume')}"`,
      'Cache-Control': 'private, max-age=300',
    },
    body,
  }
}

function getDownloadAuth(request, url) {
  const auth = settingsAuth(request)
  if (!auth.error) return auth

  const token = url?.searchParams?.get('token') || ''
  const payload = verifyToken(token)
  if (payload && ['admin', 'staff'].includes(payload.role)) return { payload }

  return auth
}

async function createResumePdf(resume) {
  const body = decodeDataUrl(resume.data)
  if (!body) return null

  if (isPdfFile(resume)) return body

  const pdf = await PDFDocument.create()
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold)
  let page = pdf.addPage([595.28, 841.89])
  let y = 790

  page.drawText(resume.name || 'Candidate Resume', {
    x: 48,
    y,
    size: 16,
    font: boldFont,
    color: rgb(0.03, 0.1, 0.22),
  })
  y -= 32

  const text = await extractResumeText(resume, body)
  const lines = wrapText(text || 'Resume preview could not extract readable text.', 92)

  for (const line of lines) {
    if (y < 48) {
      page = pdf.addPage([595.28, 841.89])
      y = 790
    }
    if (line) {
      page.drawText(line, {
        x: 48,
        y,
        size: 10,
        font,
        color: rgb(0.08, 0.11, 0.16),
      })
    }
    y -= 15
  }

  return Buffer.from(await pdf.save())
}

async function extractResumeText(resume, body) {
  if (isDocxFile(resume)) {
    const result = await mammoth.extractRawText({ buffer: body })
    return result.value
  }

  return `Preview supports PDF and DOCX files.\n\nUploaded file: ${resume.name || 'resume'}`
}

function decodeDataUrl(dataUrl) {
  const match = String(dataUrl || '').match(/^data:([^;]+);base64,(.+)$/)
  if (!match) return null
  return Buffer.from(match[2], 'base64')
}

function isPdfFile(file) {
  return /pdf/i.test(file.type || '') || /\.pdf$/i.test(file.name || '')
}

function isDocxFile(file) {
  return /wordprocessingml/i.test(file.type || '') || /\.docx$/i.test(file.name || '')
}

function sanitizeFileName(name) {
  return String(name || 'resume').replace(/[^\w.\- ]+/g, '').trim() || 'resume'
}

function getBaseFileName(name) {
  return String(name).replace(/\.[^.]+$/, '')
}

function wrapText(text, maxLength) {
  const wrapped = []
  String(text || '')
    .replace(/\r/g, '')
    .split('\n')
    .forEach((paragraph) => {
      const words = paragraph.trim().split(/\s+/).filter(Boolean)
      if (!words.length) {
        wrapped.push('')
        return
      }

      let line = ''
      words.forEach((word) => {
        const next = line ? `${line} ${word}` : word
        if (next.length > maxLength) {
          if (line) wrapped.push(line)
          line = word
        } else {
          line = next
        }
      })
      if (line) wrapped.push(line)
    })

  return wrapped
}
