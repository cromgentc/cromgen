import { getDB } from '../config/db.js'

export const defaultSiteSettings = {
  key: 'site',
  topbarLogo: '',
  topbarLogoSize: 64,
  footerLogo: '',
  footerLogoSize: 52,
  faviconLogo: '',
  faviconLogoSize: 32,
  emailConfig: {
    smtpHost: '',
    smtpPort: 465,
    smtpUser: '',
    smtpPass: '',
    mailFrom: '',
    adminEmail: '',
  },
  socialLinks: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
    { label: 'Facebook', url: 'https://www.facebook.com/' },
    { label: 'X', url: 'https://x.com/' },
    { label: 'YouTube', url: 'https://www.youtube.com/' },
  ],
}

export async function seedSiteSettings() {
  await collection().updateOne(
    { key: 'site' },
    {
      $setOnInsert: {
        ...defaultSiteSettings,
        createdAt: new Date(),
      },
      $set: {
        updatedAt: new Date(),
      },
    },
    { upsert: true },
  )
}

export async function getSiteSettings() {
  const settings = await collection().findOne({ key: 'site' }, { projection: { _id: 0 } })
  return normalizeSiteSettings(settings || defaultSiteSettings)
}

export async function updateSiteSettings(fields) {
  const settings = normalizeSiteSettings({
    ...(await getSiteSettings()),
    ...sanitizeSiteSettings(fields),
  })

  await collection().updateOne(
    { key: 'site' },
    {
      $set: {
        ...settings,
        key: 'site',
        updatedAt: new Date(),
      },
    },
    { upsert: true },
  )

  return settings
}

export function normalizeSiteSettings(settings) {
  return {
    topbarLogo: String(settings.topbarLogo || '').trim(),
    topbarLogoSize: clampLogoSize(settings.topbarLogoSize, 64),
    footerLogo: String(settings.footerLogo || '').trim(),
    footerLogoSize: clampLogoSize(settings.footerLogoSize, 52),
    faviconLogo: String(settings.faviconLogo || '').trim(),
    faviconLogoSize: clampLogoSize(settings.faviconLogoSize, 32),
    emailConfig: normalizeEmailConfig(settings.emailConfig),
    socialLinks: normalizeSocialLinks(settings.socialLinks),
  }
}

function sanitizeSiteSettings(body) {
  const fields = {}

  for (const key of ['topbarLogo', 'footerLogo', 'faviconLogo']) {
    if (typeof body[key] === 'string') {
      fields[key] = body[key].trim()
    }
  }

  for (const key of ['topbarLogoSize', 'footerLogoSize', 'faviconLogoSize']) {
    if (body[key] !== undefined) {
      fields[key] = clampLogoSize(body[key], defaultSiteSettings[key])
    }
  }

  if (Array.isArray(body.socialLinks)) {
    fields.socialLinks = normalizeSocialLinks(body.socialLinks)
  }

  if (body.emailConfig && typeof body.emailConfig === 'object') {
    fields.emailConfig = normalizeEmailConfig(body.emailConfig)
  }

  return fields
}

function normalizeEmailConfig(config = {}) {
  return {
    smtpHost: String(config.smtpHost || '').trim(),
    smtpPort: clampPort(config.smtpPort, 465),
    smtpUser: String(config.smtpUser || '').trim(),
    smtpPass: String(config.smtpPass || '').trim(),
    mailFrom: String(config.mailFrom || '').trim(),
    adminEmail: String(config.adminEmail || '').trim(),
  }
}

function normalizeSocialLinks(links) {
  if (!Array.isArray(links)) return defaultSiteSettings.socialLinks

  return links
    .map((link) => ({
      label: String(link?.label || '').trim(),
      url: String(link?.url || '').trim(),
    }))
    .filter((link) => link.label && link.url)
}

function clampLogoSize(value, fallback) {
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return Math.min(160, Math.max(16, Math.round(number)))
}

function clampPort(value, fallback) {
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return Math.min(65535, Math.max(1, Math.round(number)))
}

function collection() {
  return getDB().collection('siteSettings')
}
