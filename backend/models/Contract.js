import { randomBytes } from 'node:crypto'
import { getDB } from '../config/db.js'

export async function findContracts() {
  const contracts = await collection()
    .find({}, {
      projection: {
        _id: 0,
        'contractFile.data': 0,
        'signedContractFile.data': 0,
      },
    })
    .sort({ createdAt: -1 })
    .toArray()

  return contracts.map(normalizeContract)
}

export async function createContract(fields) {
  const now = new Date()
  const sanitizedFields = sanitizeContractFields(fields)
  const contract = normalizeContract({
    ...sanitizedFields,
    slug: createSlug(fields.title),
    signingToken: randomBytes(24).toString('hex'),
    status: sanitizedFields.status || 'pending',
    createdAt: now,
    updatedAt: now,
  })

  await collection().insertOne(contract)
  return contract
}

export async function findContractByToken(signingToken) {
  const contract = await collection().findOne(contractIdentityFilter(signingToken), { projection: { _id: 0 } })
  return contract ? normalizeContract(contract) : null
}

export async function deleteContractByToken(signingToken) {
  const result = await collection().deleteOne(contractIdentityFilter(signingToken))
  return result.deletedCount > 0
}

export async function updateContractByToken(signingToken, fields) {
  const identityFilter = contractIdentityFilter(signingToken)
  const existing = await collection().findOne(identityFilter)
  if (!existing) return null

  const updatedAt = new Date()
  const sanitizedFields = sanitizeContractFields(fields)
  const nextContractFile = sanitizedFields.contractFile?.data ? sanitizedFields.contractFile : existing.contractFile
  const nextGoogleDocUrl = sanitizedFields.googleDocUrl || existing.googleDocUrl || ''
  const nextStatus = sanitizedFields.status || existing.status || 'pending'
  const contract = normalizeContract({
    ...existing,
    ...sanitizedFields,
    contractFile: nextContractFile,
    googleDocUrl: nextGoogleDocUrl,
    status: nextStatus,
    updatedAt,
  })

  await collection().updateOne(
    identityFilter,
    {
      $set: {
        ...contract,
        updatedAt,
      },
    },
  )

  return contract
}

export async function signContractByToken(signingToken, fields) {
  const identityFilter = contractIdentityFilter(signingToken)
  const existing = await collection().findOne(identityFilter)
  if (!existing) return null

  const signedAt = new Date()
  const signedFields = sanitizeSignedFields(fields)
  const contract = normalizeContract({
    ...existing,
    ...signedFields,
    status: 'signed',
    signedAt,
    updatedAt: signedAt,
  })

  await collection().updateOne(
    identityFilter,
    {
      $set: {
        ...contract,
        signedAt,
        updatedAt: signedAt,
      },
    },
  )

  return contract
}

export async function signCompanyContractByToken(signingToken, fields) {
  const identityFilter = contractIdentityFilter(signingToken)
  const existing = await collection().findOne(identityFilter)
  if (!existing) return null

  const companySignedAt = new Date()
  const signedFields = sanitizeSignedFields(fields)
  const contract = normalizeContract({
    ...existing,
    ...signedFields,
    status: 'company-signed',
    companySignedAt,
    updatedAt: companySignedAt,
  })

  await collection().updateOne(
    identityFilter,
    {
      $set: {
        ...contract,
        companySignedAt,
        updatedAt: companySignedAt,
      },
    },
  )

  return contract
}

function contractIdentityFilter(value) {
  const identity = String(value || '').trim()
  return {
    $or: [
      { signingToken: identity },
      { slug: identity },
    ],
  }
}

export function normalizeContract(contract) {
  return {
    slug: String(contract.slug || '').trim(),
    signingToken: String(contract.signingToken || '').trim(),
    title: String(contract.title || '').trim(),
    recipientName: String(contract.recipientName || '').trim(),
    recipientEmail: String(contract.recipientEmail || '').trim(),
    contractBody: String(contract.contractBody || '').trim(),
    googleDocUrl: String(contract.googleDocUrl || '').trim(),
    contractFile: normalizeContractFile(contract.contractFile),
    signedContractFile: normalizeContractFile(contract.signedContractFile),
    senderName: String(contract.senderName || 'Cromgen Technology').trim(),
    status: String(contract.status || 'pending').trim(),
    projectStatus: normalizeProjectStatus(contract.projectStatus),
    finalContractBody: String(contract.finalContractBody || contract.contractBody || '').trim(),
    contractDate: String(contract.contractDate || '').trim(),
    contractTimestamp: String(contract.contractTimestamp || '').trim(),
    companySignatureName: String(contract.companySignatureName || '').trim(),
    companySignatureData: String(contract.companySignatureData || '').trim(),
    companySignedAt: contract.companySignedAt ? toIso(contract.companySignedAt) : '',
    signatureName: String(contract.signatureName || '').trim(),
    signatureText: String(contract.signatureText || '').trim(),
    signatureData: String(contract.signatureData || '').trim(),
    signatureUpload: String(contract.signatureUpload || '').trim(),
    signaturePlacements: normalizeSignaturePlacements(contract.signaturePlacements),
    signerEmail: String(contract.signerEmail || '').trim(),
    signerIp: String(contract.signerIp || '').trim(),
    userAgent: String(contract.userAgent || '').trim(),
    createdAt: toIso(contract.createdAt),
    updatedAt: toIso(contract.updatedAt),
    signedAt: contract.signedAt ? toIso(contract.signedAt) : '',
  }
}

function sanitizeContractFields(body) {
  return {
    title: String(body.title || '').trim(),
    recipientName: String(body.recipientName || '').trim(),
    recipientEmail: String(body.recipientEmail || '').trim().toLowerCase(),
    contractBody: String(body.contractBody || '').trim(),
    googleDocUrl: String(body.googleDocUrl || '').trim(),
    contractFile: normalizeContractFile(body.contractFile),
    senderName: String(body.senderName || 'Cromgen Technology').trim(),
    projectStatus: normalizeProjectStatus(body.projectStatus),
    status: normalizeContractStatus(body.status),
    signaturePlacements: normalizeSignaturePlacements(body.signaturePlacements),
  }
}

function normalizeContractStatus(status) {
  const value = String(status || '').trim().toLowerCase()
  return ['draft', 'pending', 'company-signed', 'signed'].includes(value) ? value : ''
}

function normalizeProjectStatus(status) {
  const value = String(status || 'active').trim().toLowerCase()
  return ['live', 'active', 'inactive', 'closed'].includes(value) ? value : 'active'
}

function normalizeContractFile(file) {
  if (!file || typeof file !== 'object') {
    return { name: '', type: '', data: '' }
  }

  return {
    name: String(file.name || '').trim(),
    type: String(file.type || '').trim(),
    data: String(file.data || '').trim(),
  }
}

function sanitizeSignedFields(body) {
  return {
    signatureName: String(body.signatureName || '').trim(),
    signatureText: String(body.signatureText || '').trim(),
    signatureData: String(body.signatureData || '').trim(),
    signatureUpload: String(body.signatureUpload || '').trim(),
    companySignatureName: String(body.companySignatureName || '').trim(),
    companySignatureData: String(body.companySignatureData || '').trim(),
    signaturePlacements: normalizeSignaturePlacements(body.signaturePlacements),
    signedContractFile: normalizeContractFile(body.signedContractFile),
    finalContractBody: String(body.finalContractBody || '').trim(),
    contractDate: String(body.contractDate || '').trim(),
    contractTimestamp: String(body.contractTimestamp || '').trim(),
    signerEmail: String(body.signerEmail || '').trim().toLowerCase(),
    signerIp: String(body.signerIp || '').trim(),
    userAgent: String(body.userAgent || '').trim(),
  }
}

function normalizeSignaturePlacements(placements) {
  if (!Array.isArray(placements)) return []

  return placements.map((placement) => ({
    id: String(placement.id || '').trim(),
    type: String(placement.type || 'client').trim(),
    x: clampPercent(placement.x),
    y: clampPercent(placement.y),
    label: String(placement.label || '').trim(),
    image: String(placement.image || '').trim(),
  })).filter((placement) => placement.id && (placement.label || placement.image))
}

function clampPercent(value) {
  const number = Number(value)
  if (!Number.isFinite(number)) return 0
  return Math.max(0, Math.min(100, number))
}

function createSlug(title) {
  const base = String(title || 'contract')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `${base || 'contract'}-${Date.now()}`
}

function toIso(value) {
  return value ? new Date(value).toISOString() : new Date().toISOString()
}

function collection() {
  return getDB().collection('contracts')
}
