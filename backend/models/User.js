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

export function countUsersByRole(role) {
  return collection().countDocuments({
    role,
    isActive: { $ne: false },
  })
}

export async function createUser({ name, email, password, role }) {
  const now = new Date()
  const user = {
    name: String(name || role).trim(),
    email: String(email).trim().toLowerCase(),
    role,
    passwordHash: hashPassword(password),
    isActive: true,
    createdAt: now,
    updatedAt: now,
  }

  const result = await collection().insertOne(user)
  return { ...user, _id: result.insertedId }
}

export function toPublicUser(user) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

function collection() {
  return getDB().collection('users')
}
