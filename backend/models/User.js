import { getDB } from '../config/db.js'
import { hashPassword } from '../utils/security.js'
import { ObjectId } from 'mongodb'

export async function seedSystemUsers() {
  const users = [
    {
      role: 'admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      name: process.env.ADMIN_NAME || 'Admin',
    },
    {
      role: 'staff',
      email: process.env.STAFF_EMAIL,
      password: process.env.STAFF_PASSWORD,
      name: process.env.STAFF_NAME || 'Staff',
    },
  ].filter((user) => user.email && user.password)

  for (const user of users) {
    await collection().updateOne(
      {
        email: String(user.email).trim().toLowerCase(),
        role: user.role,
      },
      {
        $setOnInsert: {
          email: String(user.email).trim().toLowerCase(),
          role: user.role,
          name: user.name,
          passwordHash: hashPassword(user.password),
          isActive: true,
          createdAt: new Date(),
        },
        $set: {
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    )
  }
}

export function findActiveUserByEmailAndRole(email, role) {
  return collection().findOne({
    email: String(email).trim().toLowerCase(),
    role,
    isActive: { $ne: false },
  })
}

export function findActiveUserById(id) {
  if (!ObjectId.isValid(id)) return null
  return collection().findOne({
    _id: new ObjectId(id),
    isActive: { $ne: false },
  })
}

export async function findUsers() {
  const users = await collection()
    .find({}, { projection: { passwordHash: 0 } })
    .sort({ createdAt: -1 })
    .toArray()

  return users.map(toPublicUser)
}

export async function findUsersCreatedBy(userId) {
  const users = await collection()
    .find({ createdBy: String(userId || '') }, { projection: { passwordHash: 0 } })
    .sort({ createdAt: -1 })
    .toArray()

  return users.map(toPublicUser)
}

export function countUsersByRole(role) {
  return collection().countDocuments({
    role,
    isActive: { $ne: false },
  })
}

export async function createUser({ name, email, password, role, phone = '', title = '', location = '', createdBy = '' }) {
  const now = new Date()
  const normalizedEmail = String(email).trim().toLowerCase()
  const existing = await collection().findOne({ email: normalizedEmail, role })
  if (existing) {
    const error = new Error('User email is already registered')
    error.code = 11000
    throw error
  }

  const user = {
    name: String(name || role).trim(),
    email: normalizedEmail,
    role,
    phone: String(phone || '').trim(),
    title: String(title || '').trim(),
    location: String(location || '').trim(),
    createdBy: String(createdBy || '').trim(),
    passwordHash: hashPassword(password),
    isActive: true,
    createdAt: now,
    updatedAt: now,
  }

  const result = await collection().insertOne(user)
  return { ...user, _id: result.insertedId }
}

export async function updateUserStatus(id, isActive) {
  if (!ObjectId.isValid(id)) return null

  await collection().updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        isActive: Boolean(isActive),
        updatedAt: new Date(),
      },
    },
  )

  const user = await collection().findOne({ _id: new ObjectId(id) })
  return user ? toPublicUser(user) : null
}

export async function deleteUserById(id) {
  if (!ObjectId.isValid(id)) return false

  const result = await collection().deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount > 0
}

export async function updateUserProfile(id, payload) {
  if (!ObjectId.isValid(id)) return null

  const fields = sanitizeProfileFields(payload)
  await collection().updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...fields,
        updatedAt: new Date(),
      },
    },
  )

  const user = await collection().findOne({ _id: new ObjectId(id) })
  return user ? toPublicUser(user) : null
}

export function toPublicUser(user) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar || '',
    title: user.title || '',
    phone: user.phone || '',
    location: user.location || '',
    bio: user.bio || '',
    socialLinks: normalizeProfileSocialLinks(user.socialLinks),
    createdBy: user.createdBy || '',
    isActive: user.isActive !== false,
    createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : '',
    updatedAt: user.updatedAt ? new Date(user.updatedAt).toISOString() : '',
  }
}

function sanitizeProfileFields(payload = {}) {
  const fields = {}

  for (const key of ['name', 'avatar', 'title', 'phone', 'location', 'bio']) {
    if (typeof payload[key] === 'string') {
      fields[key] = payload[key].trim()
    }
  }

  if (Array.isArray(payload.socialLinks)) {
    fields.socialLinks = normalizeProfileSocialLinks(payload.socialLinks)
  }

  return fields
}

function normalizeProfileSocialLinks(links = []) {
  if (!Array.isArray(links)) return []

  return links
    .map((link) => ({
      label: String(link?.label || '').trim(),
      url: String(link?.url || '').trim(),
    }))
    .filter((link) => link.label || link.url)
}

function collection() {
  return getDB().collection('users')
}
