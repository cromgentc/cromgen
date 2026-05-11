import {
  adminLogin,
  adminRegister,
  authRouteInfo,
  currentUser,
  staffLogin,
  vendorLogin,
  vendorRegister,
} from '../controllers/authController.js'

export const authRoutes = [
  { method: 'GET', path: '/api/auth/admin/register', handler: (request) => authRouteInfo(request, { endpoint: '/api/auth/admin/register' }) },
  { method: 'GET', path: '/api/auth/admin/login', handler: (request) => authRouteInfo(request, { endpoint: '/api/auth/admin/login' }) },
  { method: 'GET', path: '/api/auth/staff/login', handler: (request) => authRouteInfo(request, { endpoint: '/api/auth/staff/login' }) },
  { method: 'GET', path: '/api/auth/vendor/register', handler: (request) => authRouteInfo(request, { endpoint: '/api/auth/vendor/register' }) },
  { method: 'GET', path: '/api/auth/vendor/login', handler: (request) => authRouteInfo(request, { endpoint: '/api/auth/vendor/login' }) },
  { method: 'GET', path: '/api/auth/me', handler: currentUser },
  { method: 'POST', path: '/api/auth/admin/register', handler: adminRegister },
  { method: 'POST', path: '/api/auth/admin/login', handler: adminLogin },
  { method: 'POST', path: '/api/auth/staff/login', handler: staffLogin },
  { method: 'POST', path: '/api/auth/vendor/register', handler: vendorRegister },
  { method: 'POST', path: '/api/auth/vendor/login', handler: vendorLogin },
]
