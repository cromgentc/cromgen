import {
  createSettingServiceSample,
  deleteSettingServiceSample,
  listPublicServiceSamples,
  listSettingServiceSamples,
  updateSettingServiceSample,
} from '../controllers/serviceSampleController.js'

export const serviceSampleRoutes = [
  { method: 'GET', path: '/api/service-samples', handler: listPublicServiceSamples },
  { method: 'GET', path: '/api/settings/service-samples', handler: listSettingServiceSamples },
  { method: 'POST', path: '/api/settings/service-samples', handler: createSettingServiceSample },
  { method: 'POST', path: /^\/api\/settings\/service-samples\/([^/]+)$/, params: ['slug'], handler: updateSettingServiceSample },
  { method: 'DELETE', path: /^\/api\/settings\/service-samples\/([^/]+)$/, params: ['slug'], handler: deleteSettingServiceSample },
]
