import { health, listServices, version } from '../controllers/serviceController.js'

export const serviceRoutes = [
  { method: 'GET', path: '/', handler: health },
  { method: 'GET', path: '/api/health', handler: health },
  { method: 'GET', path: '/api/version', handler: version },
  { method: 'GET', path: '/api/services', handler: listServices },
]
