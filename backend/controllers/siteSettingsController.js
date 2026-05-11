import { requireRole } from '../middleware/auth.js'
import { getSiteSettings, updateSiteSettings } from '../models/SiteSettings.js'
import { json, readJson } from '../utils/http.js'

const settingsAuth = requireRole(['admin', 'staff'])

export async function getPublicSiteSettings() {
  return json(200, {
    settings: await getSiteSettings(),
  })
}

export async function getSettingSiteSettings(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  return json(200, {
    settings: await getSiteSettings(),
  })
}

export async function editSettingSiteSettings(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const body = await readJson(request)
  const settings = await updateSiteSettings(body)

  return json(200, {
    ok: true,
    message: 'Site settings updated',
    settings,
  })
}
