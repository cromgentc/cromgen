import { forbidden, unauthorized } from '../utils/http.js'
import { getBearerToken, verifyToken } from '../utils/security.js'

export function requireRole(allowedRoles) {
  return (request) => {
    const token = getBearerToken(request)

    if (!token) {
      return { error: unauthorized('Authorization token is required') }
    }

    const payload = verifyToken(token)

    const role = String(payload?.role || '').toLowerCase()

    if (!payload || !allowedRoles.includes(role)) {
      return { error: forbidden() }
    }

    return { payload: { ...payload, role } }
  }
}
