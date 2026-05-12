import {
  createPublicLead,
  deleteAllSettingLeads,
  deleteSettingLead,
  listSettingLeads,
  sendLeadOtp,
  verifyLeadOtp,
} from '../controllers/leadController.js'

export const leadRoutes = [
  { method: 'POST', path: '/api/leads', handler: createPublicLead },
  { method: 'POST', path: '/api/leads/otp/send', handler: sendLeadOtp },
  { method: 'POST', path: '/api/leads/otp/verify', handler: verifyLeadOtp },
  { method: 'GET', path: '/api/settings/leads', handler: listSettingLeads },
  { method: 'DELETE', path: '/api/settings/leads', handler: deleteAllSettingLeads },
  { method: 'DELETE', path: /^\/api\/settings\/leads\/([^/]+)$/, params: ['id'], handler: deleteSettingLead },
]
