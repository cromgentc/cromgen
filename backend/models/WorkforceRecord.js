import { ObjectId } from 'mongodb'
import { getDB } from '../config/db.js'

const allowedTypes = new Set([
  'teams',
  'roles',
  'attendance',
  'performance',
  'candidates',
  'agencies',
  'partners',
  'vendorPerformance',
  'vendorPayouts',
  'clients',
  'clientProjects',
  'clientBilling',
  'clientReports',
  'supportRequests',
  'tasks',
  'assignedTasks',
  'deadlines',
  'projectAnalytics',
  'finance',
  'billingCycles',
  'invoices',
  'revenueAnalytics',
  'wallets',
  'withdrawRequests',
  'salesPipeline',
  'followUps',
  'emailCampaigns',
  'whatsappCampaigns',
  'reports',
  'userReports',
  'vendorReports',
  'revenueReports',
  'aiAnalytics',
  'interviews',
  'hiringPipeline',
  'supportTickets',
  'helpCenter',
  'faqs',
  'contactRequests',
  'adminAccessControls',
  'securitySettings',
  'loginHistory',
  'activityLogs',
  'twoFactorAuthentication',
])

export function isAllowedWorkforceType(type) {
  return allowedTypes.has(type)
}

export async function findWorkforceRecords(type) {
  if (!isAllowedWorkforceType(type)) return []

  const records = await collection()
    .find({ type })
    .sort({ createdAt: -1 })
    .toArray()

  return records.map(toPublicWorkforceRecord)
}

export async function createWorkforceRecord(type, payload) {
  if (!isAllowedWorkforceType(type)) return null

  const now = new Date()
  const record = {
    type,
    ...sanitizePayload(payload),
    createdAt: now,
    updatedAt: now,
  }

  const result = await collection().insertOne(record)
  return toPublicWorkforceRecord({ ...record, _id: result.insertedId })
}

export async function updateWorkforceRecord(type, id, payload) {
  if (!isAllowedWorkforceType(type) || !ObjectId.isValid(id)) return null

  await collection().updateOne(
    { _id: new ObjectId(id), type },
    {
      $set: {
        ...sanitizePayload(payload),
        updatedAt: new Date(),
      },
    },
  )

  const record = await collection().findOne({ _id: new ObjectId(id), type })
  return record ? toPublicWorkforceRecord(record) : null
}

export async function deleteWorkforceRecord(type, id) {
  if (!isAllowedWorkforceType(type) || !ObjectId.isValid(id)) return false

  const result = await collection().deleteOne({ _id: new ObjectId(id), type })
  return result.deletedCount > 0
}

function sanitizePayload(payload = {}) {
  const fields = {}
  for (const [key, value] of Object.entries(payload)) {
    if (key === 'id' || key === '_id' || key === 'type' || key === 'createdAt' || key === 'updatedAt') continue
    fields[key] = typeof value === 'string' ? value.trim() : value
  }
  return fields
}

function toPublicWorkforceRecord(record) {
  return {
    id: String(record._id),
    type: record.type,
    name: record.name || '',
    email: record.email || '',
    role: record.role || '',
    department: record.department || '',
    company: record.company || '',
    contact: record.contact || '',
    phone: record.phone || '',
    project: record.project || '',
    amount: record.amount || '',
    invoiceBill: record.invoiceBill || '',
    billAmount: record.billAmount || '',
    withdrawableAmount: record.withdrawableAmount || '',
    platformFee: record.platformFee || '',
    heldAmount: record.heldAmount || '',
    releaseDate: record.releaseDate || '',
    approvalRemark: record.approvalRemark || '',
    reviewedAt: record.reviewedAt ? new Date(record.reviewedAt).toISOString() : '',
    budget: record.budget || '',
    dueDate: record.dueDate || '',
    startDate: record.startDate || '',
    priority: record.priority || '',
    category: record.category || '',
    assignee: record.assignee || '',
    deadline: record.deadline || '',
    progress: record.progress || '',
    channel: record.channel || '',
    subject: record.subject || '',
    invoiceNumber: record.invoiceNumber || '',
    invoiceFile: record.invoiceFile || null,
    cycle: record.cycle || '',
    method: record.method || '',
    paypalEmail: record.paypalEmail || '',
    accountNumber: record.accountNumber || '',
    ifscCode: record.ifscCode || '',
    upiId: record.upiId || '',
    qrScanner: record.qrScanner || '',
    balance: record.balance || '',
    requestDate: record.requestDate || '',
    stage: record.stage || '',
    nextAction: record.nextAction || '',
    openRate: record.openRate || '',
    reportType: record.reportType || '',
    metric: record.metric || '',
    ticketId: record.ticketId || '',
    question: record.question || '',
    answer: record.answer || '',
    articleUrl: record.articleUrl || '',
    googleDocUrl: record.googleDocUrl || '',
    assignedUserEmail: record.assignedUserEmail || '',
    applicantRole: record.applicantRole || '',
    applicantEmail: record.applicantEmail || '',
    sourceProjectId: record.sourceProjectId || '',
    accessLevel: record.accessLevel || '',
    lastLogin: record.lastLogin || '',
    ipAddress: record.ipAddress || '',
    device: record.device || '',
    action: record.action || '',
    severity: record.severity || '',
    enabled: record.enabled || '',
    enforcement: record.enforcement || '',
    scope: record.scope || '',
    reviewDate: record.reviewDate || '',
    status: record.status || '',
    permission: record.permission || '',
    date: record.date || '',
    checkIn: record.checkIn || '',
    checkOut: record.checkOut || '',
    score: record.score || '',
    notes: record.notes || '',
    createdBy: record.createdBy || '',
    createdAt: record.createdAt ? new Date(record.createdAt).toISOString() : '',
    updatedAt: record.updatedAt ? new Date(record.updatedAt).toISOString() : '',
  }
}

function collection() {
  return getDB().collection('workforceRecords')
}
