import { requireRole } from '../middleware/auth.js'
import {
  createServiceSample,
  deleteServiceSampleBySlug,
  findServiceSamples,
  serviceSampleCategories,
  updateServiceSampleBySlug,
} from '../models/ServiceSample.js'
import { json, notFound, readJson, validationError } from '../utils/http.js'

const settingsAuth = requireRole(['admin', 'staff'])

export async function listPublicServiceSamples() {
  return json(200, {
    categories: serviceSampleCategories,
    samples: await findServiceSamples({ publishedOnly: true }),
  })
}

export async function listSettingServiceSamples(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  return json(200, {
    categories: serviceSampleCategories,
    samples: await findServiceSamples(),
  })
}

export async function createSettingServiceSample(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const body = await readJson(request)
  const error = validateServiceSample(body)
  if (error) return error

  const sample = await createServiceSample(body)

  return json(201, {
    ok: true,
    message: 'Service sample created',
    sample,
  })
}

export async function updateSettingServiceSample(request, { slug }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const body = await readJson(request)
  const error = validateServiceSample(body)
  if (error) return error

  const sample = await updateServiceSampleBySlug(slug, body)
  if (!sample) return notFound('Service sample not found')

  return json(200, {
    ok: true,
    message: 'Service sample updated',
    sample,
  })
}

export async function deleteSettingServiceSample(request, { slug }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const deleted = await deleteServiceSampleBySlug(slug)
  if (!deleted) return notFound('Service sample not found')

  return json(200, {
    ok: true,
    message: 'Service sample deleted',
  })
}

function validateServiceSample(body) {
  if (!body.category || !serviceSampleCategories.includes(body.category)) {
    return validationError('Please select a valid service sample category')
  }

  if (!body.title || !body.summary || !body.content) {
    return validationError('Title, summary, and sample content are required')
  }

  return null
}
