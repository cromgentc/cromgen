import {
  createSettingProject,
  deleteSettingProject,
  listSettingProjects,
  updateSettingProject,
} from '../controllers/projectController.js'

export const projectRoutes = [
  { method: 'GET', path: '/api/settings/projects', handler: listSettingProjects },
  { method: 'POST', path: '/api/settings/projects', handler: createSettingProject },
  { method: 'POST', path: /^\/api\/settings\/projects\/([^/]+)$/, params: ['id'], handler: updateSettingProject },
  { method: 'DELETE', path: /^\/api\/settings\/projects\/([^/]+)$/, params: ['id'], handler: deleteSettingProject },
]
