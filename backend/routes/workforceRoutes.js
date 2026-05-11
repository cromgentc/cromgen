import {
  createSettingWorkforceRecord,
  deleteSettingWorkforceRecord,
  listWorkforceRecords,
  updateSettingWorkforceRecord,
} from '../controllers/workforceController.js'

export const workforceRoutes = [
  { method: 'GET', path: /^\/api\/settings\/workforce\/([^/]+)$/, params: ['type'], handler: listWorkforceRecords },
  { method: 'POST', path: /^\/api\/settings\/workforce\/([^/]+)$/, params: ['type'], handler: createSettingWorkforceRecord },
  { method: 'POST', path: /^\/api\/settings\/workforce\/([^/]+)\/([^/]+)$/, params: ['type', 'id'], handler: updateSettingWorkforceRecord },
  { method: 'DELETE', path: /^\/api\/settings\/workforce\/([^/]+)\/([^/]+)$/, params: ['type', 'id'], handler: deleteSettingWorkforceRecord },
]
