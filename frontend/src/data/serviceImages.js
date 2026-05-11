import heroImage from '../assets/ai-services-hero.png'
import aiServicesImage from '../assets/artificial-intelligence-services.png'
import callCenterImage from '../assets/call-center-services.png'
import digitalMarketingImage from '../assets/digital-marketing-services.png'
import hrConsultantImage from '../assets/hr-consultant-services-hero.png'
import itImage from '../assets/it-services-hero.png'
import softwareImage from '../assets/software-development-services-hero.png'
import telecomImage from '../assets/telecommunications-services-hero.png'
import { slugify } from './services.js'

export const serviceImages = {
  default: heroImage,
  ai: aiServicesImage,
  callCenter: callCenterImage,
  hr: hrConsultantImage,
  marketing: digitalMarketingImage,
  it: itImage,
  software: softwareImage,
  telecom: telecomImage,
}

export function getServiceImage(service) {
  return serviceImages[service.image] || serviceImages.default
}

const imageKeywords = {
  'artificial-intelligence': 'artificial intelligence dashboard automation office',
  'digital-marketing': 'digital marketing analytics campaign team',
  'call-center-service': 'call center customer support headset office',
  'it-services': 'information technology server cloud cybersecurity',
  'software-development-services': 'software development code product design',
  'hr-consultant': 'human resources recruitment interview office',
  telecommunications: 'telecommunications network voip control room',
}

export function getServiceDetailImage(category, serviceName) {
  const query = encodeURIComponent(
    `${serviceName} ${imageKeywords[category.slug] || category.title} business service`,
  )
  const signature = encodeURIComponent(`${category.slug}-${slugify(serviceName)}`)

  return `https://source.unsplash.com/1400x1000/?${query}&sig=${signature}`
}
