import { health, listServices } from '../controllers/serviceController.js'

export const serviceRoutes = [
  { method: 'GET', path: '/api/health', handler: health },
  { method: 'GET', path: '/api/services', handler: listServices },
]
