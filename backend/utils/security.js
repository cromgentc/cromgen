import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from 'node:crypto'

export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')
  const hash = pbkdf2Sync(String(password), salt, 120000, 32, 'sha256').toString('hex')

  return `${salt}:${hash}`
}

export function verifyPassword(password, storedHash = '') {
  const [salt, hash] = storedHash.split(':')
  if (!salt || !hash) return false

  const candidate = pbkdf2Sync(String(password), salt, 120000, 32, 'sha256')
  const stored = Buffer.from(hash, 'hex')

  return stored.length === candidate.length && timingSafeEqual(stored, candidate)
}

export function signToken(payload) {
  const header = base64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = base64Url(
    JSON.stringify({
      ...payload,
      iat: Math.floor(Date.now() / 1000),
    }),
  )
  const signature = createHmac('sha256', getJwtSecret()).update(`${header}.${body}`).digest('base64url')

  return `${header}.${body}.${signature}`
}

export function verifyToken(token) {
  const [header, body, signature] = String(token).split('.')
  if (!header || !body || !signature) return null

  const expected = createHmac('sha256', getJwtSecret()).update(`${header}.${body}`).digest('base64url')

  if (expected.length !== signature.length || !timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) {
    return null
  }

  try {
    return JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
  } catch {
    return null
  }
}

export function getBearerToken(request) {
  const authorization = request.headers.authorization || ''
  const [scheme, token] = authorization.split(' ')

  return scheme?.toLowerCase() === 'bearer' ? token : ''
}

function getJwtSecret() {
  return process.env.JWT_SECRET || 'change-this-secret'
}

function base64Url(value) {
  return Buffer.from(value).toString('base64url')
}
