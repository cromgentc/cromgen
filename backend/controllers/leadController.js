import { requireRole } from '../middleware/auth.js'
import { createLead, deleteAllLeads, deleteLeadById, findLeads } from '../models/Lead.js'
import { json, notFound, readJson, validationError } from '../utils/http.js'

const settingsAuth = requireRole(['admin', 'staff'])

export async function createPublicLead(request) {
  const body = await readJson(request)

  if (!body.name || !body.email || !body.service || !body.query) {
    return validationError('Name, email, service, and query are required')
  }

  const lead = await createLead(body)

  return json(201, {
    ok: true,
    message: 'Lead submitted successfully',
    lead,
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
