import {
  createPublicLead,
  deleteAllSettingLeads,
  deleteSettingLead,
  listSettingLeads,
} from '../controllers/leadController.js'

export const leadRoutes = [
  { method: 'POST', path: '/api/leads', handler: createPublicLead },
  { method: 'GET', path: '/api/settings/leads', handler: listSettingLeads },
  { method: 'DELETE', path: '/api/settings/leads', handler: deleteAllSettingLeads },
  { method: 'DELETE', path: /^\/api\/settings\/leads\/([^/]+)$/, params: ['id'], handler: deleteSettingLead },
]
