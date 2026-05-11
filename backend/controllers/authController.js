import { createUser, findActiveUserByEmailAndRole, findActiveUserById, toPublicUser } from '../models/User.js'
import { createVendor, findVendorByEmail, toPublicVendor } from '../models/Vendor.js'
import { json, readJson, unauthorized, validationError } from '../utils/http.js'
import { getBearerToken, signToken, verifyPassword, verifyToken } from '../utils/security.js'

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
