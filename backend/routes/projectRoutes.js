import {
  applyPublicProject,
  createSettingProject,
  deleteSettingProject,
  listPublicProjects,
  listSettingProjects,
  updateSettingProject,
} from '../controllers/projectController.js'

export const projectRoutes = [
  { method: 'GET', path: '/api/projects', handler: listPublicProjects },
  { method: 'POST', path: /^\/api\/projects\/([^/]+)\/apply$/, params: ['id'], handler: applyPublicProject },
  { method: 'GET', path: '/api/settings/projects', handler: listSettingProjects },
  { method: 'POST', path: '/api/settings/projects', handler: createSettingProject },
  { method: 'POST', path: /^\/api\/settings\/projects\/([^/]+)$/, params: ['id'], handler: updateSettingProject },
  { method: 'DELETE', path: /^\/api\/settings\/projects\/([^/]+)$/, params: ['id'], handler: deleteSettingProject },
]
