import { useEffect, useMemo, useState } from 'react'
import { ArtificialIntelligencePage } from './pages/ArtificialIntelligencePage.jsx'
import { AdminDashboard } from './pages/AdminDashboard.jsx'
import { AuthPage } from './pages/AuthPage.jsx'
import { CallCenterServicePage } from './pages/CallCenterServicePage.jsx'
import { DigitalMarketingPage } from './pages/DigitalMarketingPage.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { ContractSigningPage } from './pages/ContractSigningPage.jsx'
import { Footer } from './components/Footer.jsx'
import { FreelancerOnboardingPage } from './pages/drop/FreelancerOnboardingPage.jsx'
import { Header } from './components/Header.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { HrConsultantPage } from './pages/HrConsultantPage.jsx'
import { ItServicesPage } from './pages/ItServicesPage.jsx'
import { OnboardingPage } from './pages/OnboardingPage.jsx'
import { ServiceDetailLandingPage } from './pages/drop/ServiceDetailLandingPage.jsx'
import { SoftwareDevelopmentServicesPage } from './pages/SoftwareDevelopmentServicesPage.jsx'
import { SupportPage } from './pages/SupportPages.jsx'
import { TelecommunicationsPage } from './pages/TelecommunicationsPage.jsx'
import { VendorOnboardingPage } from './pages/drop/VendorOnboardingPage.jsx'
import { MachineLearningSolutionsPage } from './pages/drop/MachineLearningSolutionsPage.jsx'
import { findOnboardingPage, findServiceDetail, services, slugify } from './data/services.js'
import { SITE_ENDPOINTS, apiRequest } from './api/apiEndpoint.js'
import {
  AboutCromgenPage,
  AwardsRecognitionPage,
  CareerPage,
  CareerApplyPage,
  CertificationsPage,
  LeadershipPage,
  NewsRoomPage,
  OurStoryPage,
  PolicyPage,
} from './pages/CompanyPages.jsx'

const servicePages = {
  'artificial-intelligence': ArtificialIntelligencePage,
  'digital-marketing': DigitalMarketingPage,
  'call-center-service': CallCenterServicePage,
  'it-services': ItServicesPage,
  'software-development-services': SoftwareDevelopmentServicesPage,
  'hr-consultant': HrConsultantPage,
  telecommunications: TelecommunicationsPage,
}

const onboardingDropPages = {
  'onboarding/vendor': VendorOnboardingPage,
  'onboarding/freelancer': FreelancerOnboardingPage,
}

const customServiceDetailPages = {
  'artificial-intelligence/machine-learning-solutions': MachineLearningSolutionsPage,
}

const companyPages = {
  'about-cromgen': AboutCromgenPage,
  'our-story': OurStoryPage,
  leadership: LeadershipPage,
  'awards-recognition': AwardsRecognitionPage,
  certifications: CertificationsPage,
  'news-room': NewsRoomPage,
  career: CareerPage,
}

const policyPages = [
  'privacy-policy',
  'terms-of-service',
  'cookie-policy',
  'refund-policy',
  'disclaimer',
  'sitemap',
]

const supportPages = ['support-tickets', 'help-center', 'faq-management', 'contact-requests']

const authPages = ['login', 'admin-login', 'staff-login', 'vendor-login', 'user-register', 'vendor-register', 'candidate-login', 'candidate-register']

const dashboardPages = {
  'admin-dashboard': 'admin',
  'staff-dashboard': 'staff',
  'user-dashboard': 'user',
  'vendor-dashboard': 'vendor',
}

const routeAliases = {
  admin: 'admin-login',
}

const companyTitles = {
  'about-cromgen': 'About Cromgen | Cromgen Technology',
  'our-story': 'Our Story | Cromgen Technology',
  leadership: 'Leadership | Cromgen Technology',
  'awards-recognition': 'Awards & Recognition | Cromgen Technology',
  certifications: 'Certifications | Cromgen Technology',
  'news-room': 'News Room | Cromgen Technology',
  career: 'Career | Cromgen Technology',
}

const policyTitles = {
  'privacy-policy': 'Privacy Policy | Cromgen Technology',
  'terms-of-service': 'Terms of Service | Cromgen Technology',
  'cookie-policy': 'Cookie Policy | Cromgen Technology',
  'refund-policy': 'Refund Policy | Cromgen Technology',
  disclaimer: 'Disclaimer | Cromgen Technology',
  sitemap: 'Sitemap | Cromgen Technology',
}

function getPageTitle(route) {
  if (route === 'home') return 'Cromgen Technology | AI, Marketing, IT, Software, HR & Telecom Services'

  const service = services.find((item) => item.slug === route)
  if (service) return `${service.title} | Cromgen Technology`

  for (const category of services) {
    const serviceName = category.services.find((item) => `${category.slug}/${slugify(item)}` === route)
    if (serviceName) return `${serviceName} | ${category.title} | Cromgen Technology`
  }

  if (route === 'onboarding/vendor') return 'Vendor Onboarding | Cromgen Technology'
  if (route === 'onboarding/freelancer') return 'Freelancer Onboarding | Cromgen Technology'
  if (route === 'login') return 'Login | Cromgen Technology'
  if (route === 'admin-login') return 'Admin Login | Cromgen Technology'
  if (route === 'staff-login') return 'Staff Login | Cromgen Technology'
  if (route === 'vendor-login') return 'Vendor Login | Cromgen Technology'
  if (route === 'user-register') return 'User Register | Cromgen Technology'
  if (route === 'vendor-register') return 'Vendor Register | Cromgen Technology'
  if (route === 'candidate-login') return 'Candidate Login | Cromgen Technology'
  if (route === 'candidate-register') return 'Candidate Register | Cromgen Technology'
  if (route.startsWith('career/apply/')) return 'Apply for Role | Cromgen Technology'
  if (route.startsWith('contract-sign/')) return 'Contract Signing | Cromgen Technology'
  if (route === 'admin-dashboard') return 'Admin Dashboard | Cromgen Technology'
  if (route === 'staff-dashboard') return 'Staff Dashboard | Cromgen Technology'
  if (route === 'user-dashboard') return 'User Dashboard | Cromgen Technology'
  if (route === 'vendor-dashboard') return 'Vendor Dashboard | Cromgen Technology'
  if (supportPages.includes(route)) return `${route.split('-').map((word) => word[0]?.toUpperCase() + word.slice(1)).join(' ')} | Cromgen Technology`

  return companyTitles[route] || policyTitles[route] || 'Cromgen Technology'
}

function getRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '')

  if (hash) {
    const search = window.location.search || ''
    window.history.replaceState({}, '', `/${hash}${search}`)
    return routeAliases[hash] || hash
  }

  const pathname = window.location.pathname.replace(/^\/+/, '').replace(/\/$/, '')
  const route = pathname || 'home'
  return routeAliases[route] || route
}

function App() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const navigate = (path) => {
      window.history.pushState({}, '', path)
      setRoute(getRoute())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleLocationChange = () => setRoute(getRoute())
    const handleDocumentClick = (event) => {
      const link = event.target.closest?.('a[href]')
      if (!link) return

      const href = link.getAttribute('href') || ''
      if (!href.startsWith('/') || href.startsWith('//')) return
      if (link.target || link.hasAttribute('download')) return

      event.preventDefault()
      navigate(href)
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)
    document.addEventListener('click', handleDocumentClick)

    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  useEffect(() => {
    document.title = getPageTitle(route)
  }, [route])

  useEffect(() => {
    apiRequest(SITE_ENDPOINTS.publicDetail)
      .then((data) => {
        const faviconLogo = data.settings?.faviconLogo
        if (!faviconLogo) return

        const icon = document.querySelector("link[rel='icon']") || document.createElement('link')
        icon.setAttribute('rel', 'icon')
        icon.setAttribute('type', 'image/png')
        icon.setAttribute('href', faviconLogo)
        document.head.appendChild(icon)
      })
      .catch(() => {})
  }, [])

  const ActiveServicePage = servicePages[route]
  const ActiveServiceDetailPage = customServiceDetailPages[route]
  const ActiveOnboardingDropPage = onboardingDropPages[route]
  const ActiveCompanyPage = companyPages[route]
  const careerApplySlug = route.startsWith('career/apply/') ? route.replace('career/apply/', '') : ''
  const contractSignToken = route.startsWith('contract-sign/') ? route.replace('contract-sign/', '') : ''
  const dashboardRole = dashboardPages[route]
  const activeOnboardingPage = useMemo(() => findOnboardingPage(route), [route])
  const activeServiceDetail = useMemo(() => findServiceDetail(route), [route])

  if (route === 'admin-dashboard') {
    return <AdminDashboard />
  }

  if (contractSignToken) {
    return <ContractSigningPage token={contractSignToken} />
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f6faf9] text-[#142123]">
      <Header activeRoute={route} />
      {ActiveOnboardingDropPage ? (
        <ActiveOnboardingDropPage />
      ) : activeOnboardingPage ? (
        <OnboardingPage option={activeOnboardingPage} />
      ) : ActiveServiceDetailPage ? (
        <ActiveServiceDetailPage />
      ) : activeServiceDetail ? (
        <ServiceDetailLandingPage detail={activeServiceDetail} />
      ) : ActiveCompanyPage ? (
        <ActiveCompanyPage />
      ) : careerApplySlug ? (
        <CareerApplyPage slug={careerApplySlug} />
  ) : policyPages.includes(route) ? (
        <PolicyPage type={route} />
      ) : supportPages.includes(route) ? (
        <SupportPage type={route} />
      ) : authPages.includes(route) ? (
        <AuthPage type={route} />
      ) : dashboardRole ? (
        <DashboardPage role={dashboardRole} />
      ) : ActiveServicePage ? (
        <ActiveServicePage />
      ) : (
        <HomePage />
      )}
      <Footer />
    </div>
  )
}

export default App
