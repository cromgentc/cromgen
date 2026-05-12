import { getDB } from '../config/db.js'
import { hashPassword } from '../utils/security.js'
import { ObjectId } from 'mongodb'

export async function createVendor(payload) {
  const now = new Date()
  const email = String(payload.email).trim().toLowerCase()
  const existing = await collection().findOne({ email })
  if (existing) {
    const error = new Error('Vendor email is already registered')
    error.code = 11000
    throw error
  }

  const vendor = {
    vendorCode: payload.vendorCode ? String(payload.vendorCode).trim() : createVendorCode(payload.company || payload.name),
    accountType: payload.accountType ? String(payload.accountType).trim() : 'company',
    name: String(payload.name).trim(),
    company: payload.company ? String(payload.company).trim() : '',
    email,
    phone: payload.phone ? String(payload.phone).trim() : '',
    serviceCategory: payload.serviceCategory ? String(payload.serviceCategory).trim() : '',
    location: payload.location ? String(payload.location).trim() : '',
    portfolio: payload.portfolio ? String(payload.portfolio).trim() : '',
    experience: payload.experience ? String(payload.experience).trim() : '',
    message: payload.message ? String(payload.message).trim() : '',
    passwordHash: hashPassword(payload.password),
    status: payload.status ? String(payload.status).trim() : 'pending',
    createdBy: payload.createdBy ? String(payload.createdBy).trim() : '',
    createdAt: now,
    updatedAt: now,
  }

  const result = await collection().insertOne(vendor)
  return { ...vendor, _id: result.insertedId }
}

export async function findVendors() {
  const vendors = await collection()
    .find({}, { projection: { passwordHash: 0 } })
    .sort({ createdAt: -1 })
    .toArray()

  return vendors.map(toPublicVendor)
}

export async function findVendorsCreatedBy(userId) {
  const vendors = await collection()
    .find({ createdBy: String(userId || '') }, { projection: { passwordHash: 0 } })
    .sort({ createdAt: -1 })
    .toArray()

  return vendors.map(toPublicVendor)
}

export function findVendorByEmail(email) {
  return collection().findOne({
    email: String(email).trim().toLowerCase(),
  })
}

export async function findVendorById(id) {
  if (!ObjectId.isValid(id)) return null

  return collection().findOne({ _id: new ObjectId(id) })
}

export async function updateVendorStatus(id, status) {
  if (!ObjectId.isValid(id)) return null

  const nextStatus = ['active', 'pending', 'suspended'].includes(String(status).trim())
    ? String(status).trim()
    : 'pending'

  await collection().updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status: nextStatus,
        updatedAt: new Date(),
      },
    },
  )

  const vendor = await collection().findOne({ _id: new ObjectId(id) })
  return vendor ? toPublicVendor(vendor) : null
}

export async function deleteVendorById(id) {
  if (!ObjectId.isValid(id)) return false

  const result = await collection().deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount > 0
}

export function toPublicVendor(vendor) {
  return {
    id: vendor._id ? String(vendor._id) : undefined,
    vendorCode: vendor.vendorCode || '',
    accountType: vendor.accountType,
    name: vendor.name,
    company: vendor.company,
    email: vendor.email,
    phone: vendor.phone,
    serviceCategory: vendor.serviceCategory,
    location: vendor.location,
    portfolio: vendor.portfolio,
    experience: vendor.experience,
    message: vendor.message,
    status: vendor.status,
    createdBy: vendor.createdBy || '',
    createdAt: vendor.createdAt ? new Date(vendor.createdAt).toISOString() : '',
    updatedAt: vendor.updatedAt ? new Date(vendor.updatedAt).toISOString() : '',
  }
}

function createVendorCode(source) {
  const prefix = String(source || 'vendor')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 4) || 'VEND'

  return `${prefix}-${Date.now().toString().slice(-6)}`
}

function collection() {
  return getDB().collection('vendors')
}
