import { requireRole } from '../middleware/auth.js'
import { findVendorById, toPublicVendor } from '../models/Vendor.js'
import {
  createWorkforceRecord,
  deleteWorkforceRecord,
  findWorkforceRecords,
  isAllowedWorkforceType,
  updateWorkforceRecord,
} from '../models/WorkforceRecord.js'
import { json, notFound, readJson, validationError } from '../utils/http.js'

const settingsAuth = requireRole(['admin', 'staff'])
const settingsOrVendorTaskAuth = requireRole(['admin', 'staff', 'vendor'])
const workforceAuth = requireRole(['admin', 'staff', 'vendor'])
const vendorTaskReadableTypes = new Set(['assignedTasks', 'tasks'])
const vendorFinanceTypes = new Set(['withdrawRequests', 'wallets'])
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
  const auth = workforceAuth(request)
  if (auth.error) return auth.error
  if (!isAllowedWorkforceType(type)) return notFound('Workforce module not found')
  if (auth.payload?.role === 'vendor' && !vendorTaskReadableTypes.has(type) && !vendorFinanceTypes.has(type)) {
    return json(200, { ok: true, records: [] })
  }

  const records = type === 'assignedTasks' && auth.payload?.role === 'vendor'
    ? await findVendorVisibleTaskRecords()
    : await findWorkforceRecords(type)

  if (vendorTaskReadableTypes.has(type) && auth.payload?.role === 'vendor') {
    const vendor = await findVendorById(auth.payload.sub)
    const publicVendor = vendor ? toPublicVendor(vendor) : null
    return json(200, {
      ok: true,
      records: publicVendor ? records.filter((record) => isTaskAssignedToVendor(record, publicVendor) || record.createdBy === auth.payload.sub) : [],
    })
  }

  if (vendorFinanceTypes.has(type) && auth.payload?.role === 'vendor') {
    const vendor = await findVendorById(auth.payload.sub)
    const publicVendor = vendor ? toPublicVendor(vendor) : null
    return json(200, {
      ok: true,
      records: records.filter((record) => (
        record.createdBy === auth.payload.sub ||
        (type === 'wallets' && publicVendor && isTaskAssignedToVendor({ assignee: record.name }, publicVendor))
      )),
    })
  }

  if (vendorFinanceTypes.has(type) && auth.payload?.role === 'staff') {
    return json(200, {
      ok: true,
      records: records.filter((record) => record.createdBy === auth.payload.sub),
    })
  }

  return json(200, {
    ok: true,
    records,
  })
}

export async function createSettingWorkforceRecord(request, { type }) {
  const auth = vendorFinanceTypes.has(type) ? settingsOrVendorTaskAuth(request) : settingsAuth(request)
  if (auth.error) return auth.error
  if (!isAllowedWorkforceType(type)) return notFound('Workforce module not found')

  const body = await readJson(request)
  if (!body.name) return validationError('Name is required')

  const record = await createWorkforceRecord(type, {
    ...body,
    createdBy: body.createdBy || auth.payload?.sub || '',
  })
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

function isTaskAssignedToVendor(record = {}, vendor = {}) {
  const assignee = normalizeAssigneeToken(record.assignee)
  const compactAssignee = compactAssigneeToken(record.assignee)
  if (!assignee && !compactAssignee) return false
  const tokens = [
    record.assigneeVendorCode,
    record.assigneeVendorId,
    record.assigneeEmail,
    vendor.vendorCode,
    vendor.code,
    vendor.email,
    vendor.name,
    vendor.company,
    vendor.id,
  ].map(normalizeAssigneeToken).filter(Boolean)
  const compactTokens = tokens.map(compactAssigneeToken).filter(Boolean)

  return tokens.some((token) => assignee.includes(token) || token.includes(assignee))
    || compactTokens.some((token) => compactAssignee.includes(token) || token.includes(compactAssignee))
}

async function findVendorVisibleTaskRecords() {
  const [assignedTasks, tasks] = await Promise.all([
    findWorkforceRecords('assignedTasks'),
    findWorkforceRecords('tasks'),
  ])

  return dedupeRecordsById([...assignedTasks, ...tasks])
}

function dedupeRecordsById(records = []) {
  const seen = new Set()
  return records.filter((record) => {
    const key = record.id || `${record.type}-${record.name}-${record.assignee}-${record.createdAt}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function normalizeAssigneeToken(value) {
  return String(value || '').trim().toLowerCase()
}

function compactAssigneeToken(value) {
  return normalizeAssigneeToken(value).replace(/[^a-z0-9]/g, '')
}
