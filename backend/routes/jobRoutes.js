import {
  createSettingJobPost,
  deleteAllSettingJobPosts,
  deleteSettingJobPost,
  listPublicJobPosts,
  listSettingJobPosts,
  updateSettingJobPost,
} from '../controllers/jobController.js'

export const jobRoutes = [
  { method: 'GET', path: '/api/jobs', handler: listPublicJobPosts },
  { method: 'GET', path: '/api/settings/jobs', handler: listSettingJobPosts },
  { method: 'POST', path: '/api/settings/jobs', handler: createSettingJobPost },
  { method: 'DELETE', path: '/api/settings/jobs', handler: deleteAllSettingJobPosts },
  { method: 'POST', path: /^\/api\/settings\/jobs\/([^/]+)$/, params: ['slug'], handler: updateSettingJobPost },
  { method: 'DELETE', path: /^\/api\/settings\/jobs\/([^/]+)$/, params: ['slug'], handler: deleteSettingJobPost },
]
