import {
  createPublicApplication,
  deleteAllSettingApplications,
  deleteSettingApplication,
  downloadSettingApplicationResume,
  listSettingApplications,
  viewSettingApplicationResume,
} from '../controllers/applicationController.js'

export const applicationRoutes = [
  { method: 'POST', path: '/api/applications', handler: createPublicApplication },
  { method: 'GET', path: '/api/settings/applications', handler: listSettingApplications },
  { method: 'GET', path: /^\/api\/settings\/applications\/([^/]+)\/resume$/, params: ['id'], handler: viewSettingApplicationResume },
  { method: 'GET', path: /^\/api\/settings\/applications\/([^/]+)\/resume\/download$/, params: ['id'], handler: downloadSettingApplicationResume },
  { method: 'DELETE', path: '/api/settings/applications', handler: deleteAllSettingApplications },
  { method: 'DELETE', path: /^\/api\/settings\/applications\/([^/]+)$/, params: ['id'], handler: deleteSettingApplication },
]
