import { useEffect, useState } from 'react'
import { SITE_ENDPOINTS, apiRequest } from '../api/apiEndpoint.js'

export const defaultSocialLinks = [
  ['LinkedIn', 'https://www.linkedin.com/', 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg'],
  ['Facebook', 'https://www.facebook.com/', 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg'],
  ['X', 'https://x.com/', 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/x.svg'],
  ['YouTube', 'https://www.youtube.com/', 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg'],
]

const socialIcons = {
  linkedin: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg',
  facebook: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg',
  x: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/x.svg',
  twitter: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/x.svg',
  youtube: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg',
  instagram: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg',
}

export function useSiteSettings() {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    let isMounted = true

    apiRequest(SITE_ENDPOINTS.publicDetail)
      .then((data) => {
        if (isMounted) setSettings(data.settings || null)
      })
      .catch(() => {
        if (isMounted) setSettings(null)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return settings
}

export function resolveSocialLinks(settings) {
  const links = Array.isArray(settings?.socialLinks) && settings.socialLinks.length
    ? settings.socialLinks.map((link) => [
        link.label,
        link.url,
        socialIcons[String(link.label || '').toLowerCase()] || socialIcons.linkedin,
      ])
    : defaultSocialLinks

  return links.filter(([, href]) => href)
}
