import {
  createUser,
  deleteUserById,
  findActiveUserByEmailAndRole,
  findActiveUserById,
  findUsers,
  toPublicUser,
  updateUserStatus,
} from '../models/User.js'
import { createVendor, findVendorByEmail, toPublicVendor } from '../models/Vendor.js'
import { forbidden, json, notFound, readJson, unauthorized, validationError } from '../utils/http.js'
import { requireRole } from '../middleware/auth.js'
import { getBearerToken, signToken, verifyPassword, verifyToken } from '../utils/security.js'

const adminOnly = requireRole(['admin'])

export function authRouteInfo(_request, params = {}) {
  return json(200, {
    ok: true,
    message: 'This auth endpoint is active. Use POST with JSON body in Postman or frontend form.',
    method: 'POST',
    endpoint: params.endpoint || '',
    exampleBody: {
      email: 'admin@example.com',
      password: 'admin123',
    },
  })
}

export function adminLogin(request) {
  return loginUser(request, 'admin')
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

export function staffLogin(request) {
  return loginUser(request, 'staff')
}

export async function currentUser(request) {
  const token = getBearerToken(request)
  const payload = token ? verifyToken(token) : null
  if (!payload?.sub) return unauthorized('Authorization token is required')

  const user = await findActiveUserById(payload.sub)
  if (!user || !['admin', 'staff'].includes(user.role)) {
    return unauthorized('Invalid login details')
  }

  return json(200, {
    ok: true,
    user: toPublicUser(user),
  })
}

export async function listSettingUsers(request) {
  const auth = adminOnly(request)
  if (auth.error) return auth.error

  return json(200, {
    ok: true,
    users: await findUsers(),
  })
}

export async function createSettingUser(request) {
  const auth = adminOnly(request)
  if (auth.error) return auth.error

  const body = await readJson(request)
  const { name, email, password, role = 'staff' } = body

  if (!name || !email || !password) {
    return validationError('Name, email, and password are required')
  }

  if (!['admin', 'staff'].includes(role)) {
    return validationError('Role must be admin or staff')
  }

  try {
    const user = await createUser({ name, email, password, role })
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

  const user = await findActiveUserByEmailAndRole(email, role)

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
