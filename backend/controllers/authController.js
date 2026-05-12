import {
  createUser,
  deleteUserById,
  findActiveUserByEmailAndRole,
  findActiveUserById,
  findUsers,
  findUsersCreatedBy,
  toPublicUser,
  updateUserProfile,
  updateUserStatus,
} from '../models/User.js'
import {
  createVendor,
  deleteVendorById,
  findVendorByEmail,
  findVendorById,
  findVendors,
  findVendorsCreatedBy,
  toPublicVendor,
  updateVendorStatus,
} from '../models/Vendor.js'
import { forbidden, json, notFound, readJson, unauthorized, validationError } from '../utils/http.js'
import { requireRole } from '../middleware/auth.js'
import { getBearerToken, signToken, verifyPassword, verifyToken } from '../utils/security.js'

const adminOnly = requireRole(['admin'])
const userListAccess = requireRole(['admin', 'staff', 'vendor', 'user'])
const userCreateAccess = requireRole(['admin', 'staff', 'vendor'])
const vendorCreateAccess = requireRole(['admin', 'staff'])

export function authRouteInfo(_request, params = {}) {
  return json(200, {
    ok: true,
    message: 'This auth endpoint is active. Use POST with JSON body in Postman or frontend form.',
    method: 'POST',
    endpoint: params.endpoint || '',
    exampleBody: {
      email: 'enter your email id',
      password: 'enter your password',
    },
  })
}

export function adminLogin(request) {
  return loginUser(request, 'admin')
}

export async function unifiedLogin(request) {
  const { email, password, role = 'admin' } = await readJson(request)
  const normalizedRole = String(role || 'admin').toLowerCase()

  if (!email || !password) {
    return validationError('Email and password are required')
  }

  if (normalizedRole === 'vendor') {
    return loginVendorWithCredentials(email, password)
  }

  if (!['admin', 'staff', 'user'].includes(normalizedRole)) {
    return validationError('Login type must be admin, staff, user, or vendor')
  }

  return loginUserWithCredentials(email, password, normalizedRole)
}

export async function adminRegister(request) {
  const body = await readJson(request)
  const { name, email, password } = body

  if (!email || !password) {
    return validationError('Email and password are required')
  }

  try {
    const user = await createUser({
      name: name || 'Admin',
      email,
      password,
      role: 'admin',
    })

    return json(201, {
      ok: true,
      message: 'Admin user created successfully',
      user: toPublicUser(user),
      token: signToken({
        sub: String(user._id),
        role: user.role,
        email: user.email,
      }),
    })
  } catch (error) {
    if (error?.code === 11000) {
      return validationError('Admin email is already registered')
    }

    throw error
  }
}

export async function userRegister(request) {
  const body = await readJson(request)
  const { name, email, password } = body

  if (!name || !email || !password) {
    return validationError('Name, email, and password are required')
  }

  try {
    const user = await createUser({
      ...body,
      role: 'user',
    })

    return json(201, {
      ok: true,
      message: 'User registered successfully',
      user: toPublicUser(user),
      token: signToken({
        sub: String(user._id),
        role: user.role,
        email: user.email,
      }),
    })
  } catch (error) {
    if (error?.code === 11000) {
      return validationError('User email is already registered')
    }

    throw error
  }
}

export function staffLogin(request) {
  return loginUser(request, ['staff', 'user'])
}

export async function currentUser(request) {
  const token = getBearerToken(request)
  const payload = token ? verifyToken(token) : null
  if (!payload?.sub) return unauthorized('Authorization token is required')

  if (payload.role === 'vendor') {
    const vendor = await findVendorById(payload.sub)
    if (!vendor || vendor.status === 'suspended') {
      return unauthorized('Invalid login details')
    }

    return json(200, {
      ok: true,
      user: { ...toPublicVendor(vendor), role: 'vendor' },
    })
  }

  const user = await findActiveUserById(payload.sub)
  if (!user || !['admin', 'staff', 'user'].includes(user.role)) {
    return unauthorized('Invalid login details')
  }

  return json(200, {
    ok: true,
    user: toPublicUser(user),
  })
}

export async function updateCurrentUser(request) {
  const token = getBearerToken(request)
  const payload = token ? verifyToken(token) : null
  if (!payload?.sub) return unauthorized('Authorization token is required')

  const existing = await findActiveUserById(payload.sub)
  if (!existing || !['admin', 'staff', 'user'].includes(existing.role)) {
    return unauthorized('Invalid login details')
  }

  const body = await readJson(request)
  const user = await updateUserProfile(payload.sub, body)
  if (!user) return notFound('User not found')

  return json(200, {
    ok: true,
    message: 'Profile updated successfully',
    user,
  })
}

export async function listSettingUsers(request) {
  const auth = userListAccess(request)
  if (auth.error) return auth.error

  if (auth.payload?.role !== 'admin') {
    const user = await findActiveUserById(auth.payload?.sub)
    const createdUsers = await findUsersCreatedBy(auth.payload?.sub)
    const users = auth.payload?.role === 'user'
      ? (user ? [toPublicUser(user)] : [])
      : createdUsers

    return json(200, {
      ok: true,
      users: dedupeById(users),
    })
  }

  return json(200, {
    ok: true,
    users: await findUsers(),
  })
}

export async function createSettingUser(request) {
  const auth = userCreateAccess(request)
  if (auth.error) return auth.error

  const body = await readJson(request)
  const { name, email, password, role = 'staff' } = body
  const requesterRole = auth.payload?.role

  if (!name || !email || !password) {
    return validationError('Name, email, and password are required')
  }

  if (!['admin', 'staff', 'user'].includes(role)) {
    return validationError('Role must be admin, staff, or user')
  }

  if (requesterRole === 'staff' && !['user'].includes(role)) {
    return forbidden('Staff can only create user accounts from this module')
  }

  if (requesterRole === 'vendor' && role !== 'user') {
    return forbidden('Vendor can only create user accounts')
  }

  try {
    const user = await createUser({ name, email, password, role, createdBy: auth.payload?.sub })
    return json(201, {
      ok: true,
      message: 'User added successfully',
      user: toPublicUser(user),
    })
  } catch (error) {
    if (error?.code === 11000) {
      return validationError('User email is already registered')
    }

    throw error
  }
}

export async function updateSettingUserStatus(request, { id }) {
  const auth = adminOnly(request)
  if (auth.error) return auth.error

  if (auth.payload?.sub === id) {
    return forbidden('You cannot suspend your own account')
  }

  const body = await readJson(request)
  const user = await updateUserStatus(id, body.isActive)
  if (!user) return notFound('User not found')

  return json(200, {
    ok: true,
    message: user.isActive ? 'User activated.' : 'User suspended.',
    user,
  })
}

export async function deleteSettingUser(request, { id }) {
  const auth = adminOnly(request)
  if (auth.error) return auth.error

  if (auth.payload?.sub === id) {
    return forbidden('You cannot delete your own account')
  }

  const deleted = await deleteUserById(id)
  if (!deleted) return notFound('User not found')

  return json(200, {
    ok: true,
    message: 'User deleted',
  })
}

export async function listSettingVendors(request) {
  const auth = requireRole(['admin', 'staff', 'vendor', 'user'])(request)
  if (auth.error) return auth.error

  if (auth.payload?.role === 'user') {
    return json(200, {
      ok: true,
      vendors: [],
    })
  }

  if (auth.payload?.role === 'vendor') {
    const vendor = await findVendorById(auth.payload?.sub)
    return json(200, {
      ok: true,
      vendors: vendor && vendor.status !== 'suspended' ? [toPublicVendor(vendor)] : [],
    })
  }

  if (auth.payload?.role === 'staff') {
    return json(200, {
      ok: true,
      vendors: await findVendorsCreatedBy(auth.payload?.sub),
    })
  }

  return json(200, {
    ok: true,
    vendors: await findVendors(),
  })
}

export async function createSettingVendor(request) {
  const auth = vendorCreateAccess(request)
  if (auth.error) return auth.error

  const body = await readJson(request)
  const { name, email, password } = body

  if (!name || !email || !password) {
    return validationError('Name, email, and password are required')
  }

  try {
    const vendor = await createVendor({
      ...body,
      createdBy: auth.payload?.sub,
      status: body.status || 'active',
    })

    return json(201, {
      ok: true,
      message: 'Vendor created successfully',
      vendor: toPublicVendor(vendor),
    })
  } catch (error) {
    if (error?.code === 11000) {
      return validationError('Vendor email is already registered')
    }

    throw error
  }
}

function dedupeById(records = []) {
  const seen = new Set()
  return records.filter((record) => {
    if (!record?.id || seen.has(record.id)) return false
    seen.add(record.id)
    return true
  })
}

export async function updateSettingVendorStatus(request, { id }) {
  const auth = adminOnly(request)
  if (auth.error) return auth.error

  const body = await readJson(request)
  const vendor = await updateVendorStatus(id, body.status)
  if (!vendor) return notFound('Vendor not found')

  return json(200, {
    ok: true,
    message: 'Vendor status updated.',
    vendor,
  })
}

export async function deleteSettingVendor(request, { id }) {
  const auth = adminOnly(request)
  if (auth.error) return auth.error

  const deleted = await deleteVendorById(id)
  if (!deleted) return notFound('Vendor not found')

  return json(200, {
    ok: true,
    message: 'Vendor deleted',
  })
}

export async function vendorRegister(request) {
  const body = await readJson(request)
  const { name, email, password } = body

  if (!name || !email || !password) {
    return validationError('Name, email, and password are required')
  }

  try {
    const vendor = await createVendor(body)

    return json(201, {
      ok: true,
      message: 'Vendor registered successfully',
      vendor: toPublicVendor(vendor),
      token: signToken({
        sub: String(vendor._id),
        role: 'vendor',
        email: vendor.email,
      }),
    })
  } catch (error) {
    if (error?.code === 11000) {
      return validationError('Vendor email is already registered')
    }

    throw error
  }
}

export async function vendorLogin(request) {
  const { email, password } = await readJson(request)

  if (!email || !password) {
    return validationError('Email and password are required')
  }

  return loginVendorWithCredentials(email, password)
}

async function loginVendorWithCredentials(email, password) {
  const vendor = await findVendorByEmail(email)

  if (!vendor || !verifyPassword(password, vendor.passwordHash)) {
    return unauthorized('Invalid login details')
  }

  return json(200, {
    ok: true,
    vendor: toPublicVendor(vendor),
    token: signToken({
      sub: String(vendor._id),
      role: 'vendor',
      email: vendor.email,
    }),
  })
}

async function loginUser(request, role) {
  const { email, password } = await readJson(request)

  if (!email || !password) {
    return validationError('Email and password are required')
  }

  return loginUserWithCredentials(email, password, role)
}

async function loginUserWithCredentials(email, password, role) {
  const roles = Array.isArray(role) ? role : [role]
  let user = null
  for (const candidateRole of roles) {
    user = await findActiveUserByEmailAndRole(email, candidateRole)
    if (user) break
  }

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return unauthorized('Invalid login details')
  }

  return json(200, {
    ok: true,
    user: toPublicUser(user),
    token: signToken({
      sub: String(user._id),
      role: user.role,
      email: user.email,
    }),
  })
}
