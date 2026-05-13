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
import { createWorkforceRecord, findRolePermissionRecordsForAccount, findWorkforceRecordById, updateWorkforceRecord } from '../models/WorkforceRecord.js'

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
    return loginVendorWithCredentials(email, password, request)
  }

  if (!['admin', 'staff', 'user'].includes(normalizedRole)) {
    return validationError('Login type must be admin, staff, user, or vendor')
  }

  return loginUserWithCredentials(email, password, normalizedRole, request)
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
    if (!vendor || vendor.status !== 'active') {
      return unauthorized('Invalid login details')
    }

    return json(200, {
      ok: true,
      user: await attachAccessPermissions({ ...toPublicVendor(vendor), role: 'vendor' }),
    })
  }

  const user = await findActiveUserById(payload.sub)
  if (!user || !['admin', 'staff', 'user'].includes(user.role)) {
    return unauthorized('Invalid login details')
  }

  return json(200, {
    ok: true,
    user: await attachAccessPermissions(toPublicUser(user)),
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

export async function updateLoginSession(request, { id }) {
  const token = getBearerToken(request)
  const payload = token ? verifyToken(token) : null
  if (!payload?.sub) return unauthorized('Authorization token is required')

  const record = await findWorkforceRecordById('loginHistory', id)
  if (!record) return notFound('Login history record not found')
  if (record.createdBy && record.createdBy !== payload.sub && payload.role !== 'admin') {
    return forbidden('You cannot update another login session')
  }

  const body = await readJson(request)
  const now = new Date()
  const startedAt = record.sessionStartedAt ? new Date(record.sessionStartedAt) : now
  const endedAt = body?.ended ? now : (record.sessionEndedAt ? new Date(record.sessionEndedAt) : null)
  const duration = formatSessionDuration(startedAt, endedAt || now, !body?.ended)
  const updated = await updateWorkforceRecord('loginHistory', id, {
    lastActivityAt: now.toISOString(),
    sessionEndedAt: body?.ended ? now.toISOString() : record.sessionEndedAt || '',
    sessionDuration: duration,
    timeOnWeb: duration,
  })

  return json(200, {
    ok: true,
    loginHistory: updated,
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
  const email = String(body.email || '').trim().toLowerCase()
  const password = String(body.password || '').trim()
  const name = String(body.name || body.company || email.split('@')[0] || '').trim()

  if (!name || !email || !password) {
    return validationError('Vendor name, email, and password are required')
  }

  try {
    const vendor = await createVendor({
      ...body,
      name,
      email,
      password,
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
    const vendor = await createVendor({
      ...body,
      status: 'suspended',
    })

    return json(201, {
      ok: true,
      message: 'Vendor registration submitted successfully. Your account is suspended until admin approval. Please wait for Cromgen admin to activate your vendor access before login.',
      vendor: toPublicVendor(vendor),
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

  return loginVendorWithCredentials(email, password, request)
}

async function loginVendorWithCredentials(email, password, request = null) {
  const vendor = await findVendorByEmail(email)

  if (!vendor || !verifyPassword(password, vendor.passwordHash)) {
    await recordLoginHistory(request, {
      email,
      role: 'vendor',
      status: 'Failed',
      reason: 'Invalid vendor login details',
    })
    return unauthorized('Invalid login details')
  }

  if (vendor.status !== 'active') {
    await recordLoginHistory(request, {
      email,
      role: 'vendor',
      status: 'Blocked',
      reason: 'Vendor account is waiting for admin approval',
    })
    return unauthorized('Your vendor account is suspended until admin approval. Please contact Cromgen admin to activate your account.')
  }

  const publicVendor = await attachAccessPermissions({ ...toPublicVendor(vendor), role: 'vendor' })
  const loginRecord = await recordLoginHistory(request, {
    user: { ...publicVendor, role: 'vendor' },
    email: vendor.email,
    role: 'vendor',
    status: 'Success',
  })

  return json(200, {
    ok: true,
    vendor: publicVendor,
    loginHistoryId: loginRecord?.id || '',
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

  return loginUserWithCredentials(email, password, role, request)
}

async function loginUserWithCredentials(email, password, role, request = null) {
  const roles = Array.isArray(role) ? role : [role]
  let user = null
  for (const candidateRole of roles) {
    user = await findActiveUserByEmailAndRole(email, candidateRole)
    if (user) break
  }

  if (!user || !verifyPassword(password, user.passwordHash)) {
    await recordLoginHistory(request, {
      email,
      role: roles.join(', '),
      status: 'Failed',
      reason: 'Invalid user login details',
    })
    return unauthorized('Invalid login details')
  }

  const publicUser = await attachAccessPermissions(toPublicUser(user))
  const loginRecord = await recordLoginHistory(request, {
    user: publicUser,
    email: user.email,
    role: user.role,
    status: 'Success',
  })

  return json(200, {
    ok: true,
    user: publicUser,
    loginHistoryId: loginRecord?.id || '',
    token: signToken({
      sub: String(user._id),
      role: user.role,
      email: user.email,
    }),
  })
}

async function recordLoginHistory(request, { user = null, email = '', role = '', status = 'Success', reason = '' } = {}) {
  try {
    const now = new Date()
    const ipAddress = getClientIp(request)
    const userAgent = request?.headers?.['user-agent'] || ''
    const deviceInfo = parseUserAgent(userAgent)
    const locationInfo = getLocationInfo(request, ipAddress)
    const source = request?.headers?.origin || request?.headers?.referer || 'Direct login'
    const sessionDuration = status === 'Success' ? 'Active session' : '0 minutes'

    return await createWorkforceRecord('loginHistory', {
      name: user?.name || user?.company || email || 'Unknown login',
      email: user?.email || email || '',
      role: user?.role || role || '',
      status,
      ipAddress,
      device: deviceInfo.label,
      browser: deviceInfo.browser,
      operatingSystem: deviceInfo.os,
      deviceType: deviceInfo.deviceType,
      location: locationInfo.label,
      latitude: locationInfo.latitude,
      longitude: locationInfo.longitude,
      mapUrl: locationInfo.mapUrl,
      directionUrl: locationInfo.directionUrl,
      loginSource: source,
      sessionStartedAt: now.toISOString(),
      sessionEndedAt: '',
      lastActivityAt: now.toISOString(),
      sessionDuration,
      timeOnWeb: sessionDuration,
      lastLogin: now.toISOString(),
      notes: [
        reason || `Login ${status.toLowerCase()}`,
        `Source: ${source}`,
        userAgent ? `User agent: ${userAgent}` : '',
      ].filter(Boolean).join(' | '),
      createdBy: user?.id || user?._id || '',
    })
  } catch (error) {
    console.error('Login history capture failed:', error.message)
    return null
  }
}

function getClientIp(request) {
  const headers = request?.headers || {}
  const rawIp = headers['cf-connecting-ip']
    || headers['x-real-ip']
    || String(headers['x-forwarded-for'] || '').split(',')[0]
    || request?.socket?.remoteAddress
    || request?.connection?.remoteAddress
    || ''

  return String(rawIp || '').trim().replace(/^::ffff:/, '') || 'Unknown IP'
}

function parseUserAgent(userAgent = '') {
  const ua = String(userAgent)
  const browser = /Edg\//.test(ua) ? 'Microsoft Edge'
    : /OPR\//.test(ua) ? 'Opera'
    : /Chrome\//.test(ua) ? 'Chrome'
    : /Firefox\//.test(ua) ? 'Firefox'
    : /Safari\//.test(ua) ? 'Safari'
    : 'Unknown browser'
  const os = /Windows NT/.test(ua) ? 'Windows'
    : /Android/.test(ua) ? 'Android'
    : /iPhone|iPad|iPod/.test(ua) ? 'iOS'
    : /Mac OS X/.test(ua) ? 'macOS'
    : /Linux/.test(ua) ? 'Linux'
    : 'Unknown OS'
  const deviceType = /Mobi|Android|iPhone|iPod/.test(ua) ? 'Mobile'
    : /iPad|Tablet/.test(ua) ? 'Tablet'
    : 'Desktop'

  return {
    browser,
    os,
    deviceType,
    label: `${deviceType} - ${browser} on ${os}`,
  }
}

function getLocationInfo(request, ipAddress) {
  const headers = request?.headers || {}
  const city = decodeHeader(headers['x-vercel-ip-city'] || headers['cf-ipcity'] || '')
  const region = decodeHeader(headers['x-vercel-ip-country-region'] || headers['cf-region'] || '')
  const country = decodeHeader(headers['x-vercel-ip-country'] || headers['cf-ipcountry'] || '')
  const latitude = headers['x-vercel-ip-latitude'] || headers['cf-iplatitude'] || ''
  const longitude = headers['x-vercel-ip-longitude'] || headers['cf-iplongitude'] || ''
  const locationParts = [city, region, country].filter(Boolean)
  const label = locationParts.length ? locationParts.join(', ') : `IP based lookup: ${ipAddress}`
  const mapQuery = latitude && longitude ? `${latitude},${longitude}` : label

  return {
    label,
    latitude,
    longitude,
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`,
    directionUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`,
  }
}

function decodeHeader(value) {
  if (!value) return ''
  try {
    return decodeURIComponent(String(value).replace(/\+/g, ' '))
  } catch {
    return String(value)
  }
}

async function attachAccessPermissions(user = {}) {
  if (!user?.email) return user
  if (String(user.role || '').toLowerCase() === 'admin') {
    return {
      ...user,
      accessPages: ['*'],
      accessPermission: 'Admin',
      accessRules: [],
    }
  }

  const rules = await findRolePermissionRecordsForAccount({ email: user.email, role: user.role })
  const pages = Array.from(new Set(rules.flatMap((rule) => parseAccessPages(rule.allowedPages || rule.moduleAccess))))
  const permissionRank = { read: 1, write: 2, manage: 3, admin: 4 }
  const accessPermission = rules.reduce((best, rule) => (
    (permissionRank[String(rule.permission || '').toLowerCase()] || 0) > (permissionRank[String(best || '').toLowerCase()] || 0)
      ? rule.permission
      : best
  ), '')

  return {
    ...user,
    accessPages: pages,
    accessPermission: accessPermission || '',
    accessRules: rules.map((rule) => ({
      id: rule.id,
      name: rule.name,
      permission: rule.permission,
      moduleAccess: rule.moduleAccess,
      allowedPages: rule.allowedPages,
    })),
  }
}

function parseAccessPages(value = []) {
  if (Array.isArray(value)) return value.map((item) => String(item || '').trim()).filter(Boolean)
  return String(value || '')
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function formatSessionDuration(start, end, active = false) {
  const startTime = start instanceof Date ? start.getTime() : new Date(start).getTime()
  const endTime = end instanceof Date ? end.getTime() : new Date(end).getTime()
  const totalMinutes = Math.max(0, Math.floor((endTime - startTime) / 60000))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const label = hours ? `${hours}h ${minutes}m` : `${minutes}m`
  return active ? `${label} active` : label
}
