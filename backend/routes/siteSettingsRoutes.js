import {
  editSettingSiteSettings,
  getPublicSiteSettings,
  getSettingSiteSettings,
} from '../controllers/siteSettingsController.js'

export const siteSettingsRoutes = [
  { method: 'GET', path: '/api/site-settings', handler: getPublicSiteSettings },
  { method: 'GET', path: '/api/settings/site', handler: getSettingSiteSettings },
  { method: 'POST', path: '/api/settings/site', handler: editSettingSiteSettings },
]
