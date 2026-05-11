import { getDB } from '../config/db.js'
import { hashPassword } from '../utils/security.js'

export async function createVendor(payload) {
  const now = new Date()
  const vendor = {
    accountType: payload.accountType ? String(payload.accountType).trim() : 'company',
    name: String(payload.name).trim(),
    company: payload.company ? String(payload.company).trim() : '',
    email: String(payload.email).trim().toLowerCase(),
    phone: payload.phone ? String(payload.phone).trim() : '',
    serviceCategory: payload.serviceCategory ? String(payload.serviceCategory).trim() : '',
    location: payload.location ? String(payload.location).trim() : '',
    portfolio: payload.portfolio ? String(payload.portfolio).trim() : '',
    experience: payload.experience ? String(payload.experience).trim() : '',
    message: payload.message ? String(payload.message).trim() : '',
    passwordHash: hashPassword(payload.password),
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  }

  const result = await collection().insertOne(vendor)
  return { ...vendor, _id: result.insertedId }
}

export function findVendorByEmail(email) {
  return collection().findOne({
    email: String(email).trim().toLowerCase(),
  })
}

export function toPublicVendor(vendor) {
  return {
    id: vendor._id ? String(vendor._id) : undefined,
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
  }
}

function collection() {
  return getDB().collection('vendors')
}
