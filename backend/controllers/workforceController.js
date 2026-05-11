import { requireRole } from '../middleware/auth.js'
import {
  createWorkforceRecord,
  deleteWorkforceRecord,
  findWorkforceRecords,
  isAllowedWorkforceType,
  updateWorkforceRecord,
} from '../models/WorkforceRecord.js'
import { json, notFound, readJson, validationError } from '../utils/http.js'

const settingsAuth = requireRole(['admin', 'staff'])
const publicReadableTypes = new Set(['helpCenter', 'faqs'])
const publicCreateTypes = new Set(['supportTickets', 'contactRequests'])

export async function listPublicWorkforceRecords(_request, { type }) {
  if (!publicReadableTypes.has(type) || !isAllowedWorkforceType(type)) return notFound('Support module not found')

  return json(200, {
    ok: true,
    records: await findWorkforceRecords(type),
  })
}

export async function createPublicWorkforceRecord(request, { type }) {
  if (!publicCreateTypes.has(type) || !isAllowedWorkforceType(type)) return notFound('Support module not found')

  const body = await readJson(request)
  if (!body.name) return validationError('Name is required')

  const record = await createWorkforceRecord(type, {
    ...body,
    status: body.status || 'Open',
  })

  return json(201, {
    ok: true,
    message: 'Request submitted successfully',
    record,
  })
}

export async function listWorkforceRecords(request, { type }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error
  if (!isAllowedWorkforceType(type)) return notFound('Workforce module not found')

  return json(200, {
    ok: true,
    records: await findWorkforceRecords(type),
  })
}

export async function createSettingWorkforceRecord(request, { type }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error
  if (!isAllowedWorkforceType(type)) return notFound('Workforce module not found')

  const body = await readJson(request)
  if (!body.name) return validationError('Name is required')

  const record = await createWorkforceRecord(type, body)
  return json(201, {
    ok: true,
    message: 'Record created successfully',
    record,
  })
}

export async function updateSettingWorkforceRecord(request, { type, id }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error
  if (!isAllowedWorkforceType(type)) return notFound('Workforce module not found')

  const body = await readJson(request)
  if (!body.name) return validationError('Name is required')

  const record = await updateWorkforceRecord(type, id, body)
  if (!record) return notFound('Record not found')

  return json(200, {
    ok: true,
    message: 'Record updated successfully',
    record,
  })
}

export async function deleteSettingWorkforceRecord(request, { type, id }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error
  if (!isAllowedWorkforceType(type)) return notFound('Workforce module not found')

  const deleted = await deleteWorkforceRecord(type, id)
  if (!deleted) return notFound('Record not found')

  return json(200, {
    ok: true,
    message: 'Record deleted successfully',
  })
}
