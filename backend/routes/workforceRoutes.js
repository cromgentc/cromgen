import {
  createSettingWorkforceRecord,
  createPublicWorkforceRecord,
  deleteSettingWorkforceRecord,
  listPublicWorkforceRecords,
  listWorkforceRecords,
  updateSettingWorkforceRecord,
} from '../controllers/workforceController.js'

export const workforceRoutes = [
  { method: 'GET', path: /^\/api\/support\/([^/]+)$/, params: ['type'], handler: listPublicWorkforceRecords },
  { method: 'POST', path: /^\/api\/support\/([^/]+)$/, params: ['type'], handler: createPublicWorkforceRecord },
  { method: 'GET', path: /^\/api\/settings\/workforce\/([^/]+)$/, params: ['type'], handler: listWorkforceRecords },
  { method: 'POST', path: /^\/api\/settings\/workforce\/([^/]+)$/, params: ['type'], handler: createSettingWorkforceRecord },
  { method: 'POST', path: /^\/api\/settings\/workforce\/([^/]+)\/([^/]+)$/, params: ['type', 'id'], handler: updateSettingWorkforceRecord },
  { method: 'DELETE', path: /^\/api\/settings\/workforce\/([^/]+)\/([^/]+)$/, params: ['type', 'id'], handler: deleteSettingWorkforceRecord },
]
