import { requireRole } from '../middleware/auth.js'
import { findVendorById, toPublicVendor } from '../models/Vendor.js'
import {
  createWorkforceRecord,
  deleteWorkforceRecord,
  findWorkforceRecords,
  findWorkforceRecordById,
  isAllowedWorkforceType,
  recordActivityLog,
  updateWorkforceRecord,
} from '../models/WorkforceRecord.js'
import { forbidden, json, notFound, readJson, validationError } from '../utils/http.js'

const settingsAuth = requireRole(['admin', 'staff'])
const settingsOrVendorTaskAuth = requireRole(['admin', 'staff', 'vendor'])
const workforceAuth = requireRole(['admin', 'staff', 'vendor', 'user'])
const vendorTaskReadableTypes = new Set(['assignedTasks', 'tasks'])
const vendorFinanceTypes = new Set(['withdrawRequests', 'wallets'])
const vendorReportTypes = new Set(['reports', 'userReports', 'revenueReports'])
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
  if (auth.payload?.role === 'vendor' && !vendorTaskReadableTypes.has(type) && !vendorFinanceTypes.has(type) && !vendorReportTypes.has(type)) {
    return json(200, { ok: true, records: [] })
  }

  const records = type === 'assignedTasks' && auth.payload?.role === 'vendor'
    ? await findVendorVisibleTaskRecords()
    : await findWorkforceRecords(type)

  if (vendorTaskReadableTypes.has(type) && ['vendor', 'user'].includes(auth.payload?.role)) {
    const vendor = await findVendorById(auth.payload.sub)
    const publicVendor = vendor ? toPublicVendor(vendor) : null
    return json(200, {
      ok: true,
      records: records.filter((record) => (
        record.createdBy === auth.payload.sub ||
        isTaskAssignedToRequester(record, auth.payload) ||
        (publicVendor && isTaskAssignedToVendor(record, publicVendor))
      )),
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

  if ((vendorFinanceTypes.has(type) || vendorReportTypes.has(type)) && auth.payload?.role === 'staff') {
    return json(200, {
      ok: true,
      records: records.filter((record) => record.createdBy === auth.payload.sub),
    })
  }

  if (vendorReportTypes.has(type) && auth.payload?.role === 'vendor') {
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
  if (type === 'roles' && auth.payload?.role !== 'admin') return forbidden('Only admin can manage role permissions')

  const body = await readJson(request)
  if (!body.name) return validationError('Name is required')

  const record = await createWorkforceRecord(type, {
    ...body,
    createdBy: body.createdBy || auth.payload?.sub || '',
  })
  await recordActivityLog({
    actor: auth.payload,
    action: 'Created record',
    category: activityCategoryForType(type),
    targetType: type,
    targetName: record?.name || body.name,
    targetId: record?.id,
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
  if (type === 'roles' && auth.payload?.role !== 'admin') return forbidden('Only admin can manage role permissions')

  const body = await readJson(request)
  if (!body.name) return validationError('Name is required')

  const record = await updateWorkforceRecord(type, id, body)
  if (!record) return notFound('Record not found')
  await recordActivityLog({
    actor: auth.payload,
    action: 'Updated record',
    category: activityCategoryForType(type),
    severity: type === 'roles' || type === 'securitySettings' ? 'Medium' : 'Low',
    targetType: type,
    targetName: record.name || body.name,
    targetId: record.id || id,
  })

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
  if (type === 'roles' && auth.payload?.role !== 'admin') return forbidden('Only admin can manage role permissions')

  const existing = await findWorkforceRecordById(type, id)
  const deleted = await deleteWorkforceRecord(type, id)
  if (!deleted) return notFound('Record not found')
  await recordActivityLog({
    actor: auth.payload,
    action: 'Deleted record',
    category: activityCategoryForType(type),
    severity: 'Medium',
    targetType: type,
    targetName: existing?.name || existing?.email || '',
    targetId: id,
  })

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

function activityCategoryForType(type = '') {
  if (['users', 'teams', 'roles', 'attendance', 'performance', 'adminAccessControls'].includes(type)) return 'User'
  if (['vendors', 'tasks', 'assignedTasks', 'withdrawRequests', 'wallets'].includes(type)) return 'Vendor'
  if (['finance', 'billingCycles', 'invoices', 'revenueAnalytics'].includes(type)) return 'Finance'
  if (['securitySettings', 'loginHistory', 'activityLogs', 'twoFactorAuthentication'].includes(type)) return 'Security'
  if (['newsPosts', 'serviceSamples', 'helpCenter', 'faqs', 'contactRequests', 'supportTickets'].includes(type)) return 'Content'
  return 'Admin'
}

function isTaskAssignedToRequester(record = {}, payload = {}) {
  const assignee = normalizeAssigneeToken(record.assignee)
  if (!assignee) return false
  const tokens = [payload.email, payload.sub].map(normalizeAssigneeToken).filter(Boolean)
  return tokens.some((token) => assignee.includes(token) || token.includes(assignee))
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
