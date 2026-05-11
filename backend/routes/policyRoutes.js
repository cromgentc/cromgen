import {
  editSettingPolicy,
  getPublicPolicy,
  getSettingPolicy,
  listPublicPolicies,
  listSettingPolicies,
} from '../controllers/policyController.js'

export const policyRoutes = [
  { method: 'GET', path: '/api/policies', handler: listPublicPolicies },
  { method: 'GET', path: /^\/api\/policies\/([^/]+)$/, params: ['slug'], handler: getPublicPolicy },
  { method: 'GET', path: '/api/settings/policies', handler: listSettingPolicies },
  { method: 'GET', path: /^\/api\/settings\/policies\/([^/]+)$/, params: ['slug'], handler: getSettingPolicy },
  { method: 'POST', path: /^\/api\/settings\/policies\/([^/]+)$/, params: ['slug'], handler: editSettingPolicy },
]
