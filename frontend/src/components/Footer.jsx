import { useEffect, useState } from 'react'
import logo from '../assets/cromgen-logo.png'
import { LEAD_ENDPOINTS, PROJECT_ENDPOINTS, apiRequest } from '../api/apiEndpoint.js'
import { getServiceLink, services } from '../data/services.js'
import { resolveSocialLinks, useSiteSettings } from '../hooks/useSiteSettings.js'

const companyLinks = [
  ['About Cromgen', '/about-cromgen'],
  ['Our Story', '/our-story'],
  ['Leadership', '/leadership'],
  ['Awards & Recognition', '/awards-recognition'],
  ['Certifications', '/certifications'],
  ['News Room', '/news-room'],
  ['Career', '/career'],
]

const policyLinks = [
  ['Privacy Policy', '/privacy-policy'],
  ['Terms of Service', '/terms-of-service'],
  ['Cookie Policy', '/cookie-policy'],
  ['Refund Policy', '/refund-policy'],
  ['Disclaimer', '/disclaimer'],
  ['Sitemap', '/sitemap'],
]

const supportLinks = [
  ['Support Tickets', '/support-tickets'],
  ['Help Center', '/help-center'],
  ['FAQ Management', '/faq-management'],
  ['Contact Requests', '/contact-requests'],
]

const industries = [
  ['Artificial Intelligence (AI)', '/artificial-intelligence'],
  ['Digital Marketing', '/digital-marketing'],
  ['Call Center & BPO Services', '/call-center-service'],
  ['Information Technology (IT)', '/it-services'],
  ['Software Development', '/software-development-services'],
  ['HR Consulting & Recruitment', '/hr-consultant'],
  ['Telecommunications', '/telecommunications'],
]

const footerCapabilityGroups = [
  {
    title: 'AI Solutions',
    items: [
      ['AI Chatbot Development', '/artificial-intelligence/ai-chatbot-development'],
      ['Machine Learning Solutions', '/artificial-intelligence/machine-learning-solutions'],
      ['Natural Language Processing', '/artificial-intelligence/natural-language-processing'],
      ['Computer Vision', '/artificial-intelligence/computer-vision'],
      ['Predictive Analytics', '/artificial-intelligence/predictive-analytics'],
    ],
  },
  {
    title: 'Business Services',
    items: [
      ['Digital Marketing', '/digital-marketing'],
      ['Software Development', '/software-development-services'],
      ['IT Infrastructure', '/it-services'],
    ],
  },
  {
    title: 'Vendor & Career',
    items: [
      ['Vendor Register', '/vendor-register'],
      ['Vendor Login', '/vendor-login'],
      ['Career', '/career'],
    ],
  },
]

function FooterCapabilityIcon({ index }) {
  const paths = [
    'M12 3l8 4v10l-8 4-8-4V7l8-4z',
    'M4 12h5l3-6 3 12 3-6h2',
    'M5 5h14v14H5zM8 9h8M8 13h5',
    'M4 6h16v12H4zM8 10h8M8 14h5',
  ]

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path d={paths[index % paths.length]} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  )
}

export function Footer() {
  const settings = useSiteSettings()
  const footerLogo = settings?.footerLogo || logo
  const footerLogoSize = settings?.footerLogoSize || 52
  const socialLinks = resolveSocialLinks(settings)
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    service: '',
    message: '',
  })
  const [leadStatus, setLeadStatus] = useState({ type: '', message: '' })
  const [footerProjects, setFooterProjects] = useState([])

  const customerServices =
    services.find((service) => service.slug === 'call-center-service')?.services.slice(0, 7) || []

  const digitalServices =
    services.find((service) => service.slug === 'artificial-intelligence')?.services.slice(0, 5) || []

  useEffect(() => {
    let active = true

    apiRequest(PROJECT_ENDPOINTS.publicList)
      .then((response) => {
        if (!active) return
        setFooterProjects((response.projects || []).filter((project) => project.title).slice(0, 6))
      })
      .catch(() => {
        if (active) setFooterProjects([])
      })

    return () => {
      active = false
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLeadStatus({ type: '', message: '' })

    try {
      await apiRequest(LEAD_ENDPOINTS.publicCreate, {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.contact,
          service: formData.service,
          query: formData.message,
        }),
      })
      setFormData({ name: '', contact: '', service: '', message: '' })
      setLeadStatus({ type: 'success', message: 'Enquiry sent successfully.' })
    } catch (error) {
      setLeadStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to send enquiry.',
      })
    }
  }

  return (
    <footer className="w-full overflow-hidden bg-[#061f4d] text-white">
      <div className="relative mx-auto w-full max-w-[1800px] px-5 py-14 sm:px-8 xl:px-12">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#63bc45]/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#ff4b2d]/20 blur-3xl" />

        <div className="footer-main-grid relative grid w-full grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-[1.15fr_1fr_2.3fr_1.6fr] lg:gap-8">
          <div className="footer-brand-panel col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/10 sm:p-6 lg:col-span-1">
            <a href="/" className="flex items-center gap-3">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white">
                <img
                  src={footerLogo}
                  alt="Cromgen Technology"
                  className="object-contain"
                  style={{ width: footerLogoSize, height: footerLogoSize }}
                />
              </span>
              <div>
                <h2 className="text-lg font-black uppercase tracking-[0.12em]">Cromgen</h2>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#63bc45]">
                  Technology
                </p>
              </div>
            </a>

            <p className="mt-5 text-sm font-medium leading-6 text-[#c8d8ff]">
              Delivering recruitment, customer engagement, digital solutions and IT services with
              reliable execution.
            </p>

            <div className="mt-6">
              <FooterTitle>Follow Us</FooterTitle>
              <div className="mt-4 flex gap-3">
                {socialLinks.map(([label, href, icon]) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    title={label}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 p-3 transition hover:border-[#63bc45] hover:bg-[#63bc45]"
                  >
                    <img src={icon} alt="" className="h-full w-full object-contain brightness-0 invert" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-7 rounded-2xl border border-white/10 bg-white/5 p-4 sm:gap-8 sm:p-6">
            <div>
              <FooterTitle>Company</FooterTitle>
              <FooterList>
                {companyLinks.map(([label, href]) => (
                  <FooterLink key={label} href={href}>
                    {label}
                  </FooterLink>
                ))}
              </FooterList>
            </div>

            <div>
              <FooterTitle>Industries</FooterTitle>
              <FooterList>
                {industries.map(([label, href]) => (
                  <FooterLink key={label} href={href}>
                    {label}
                  </FooterLink>
                ))}
              </FooterList>
            </div>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
            <FooterTitle>Services</FooterTitle>

            <div className="mt-5 grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
              <div>
                <h4 className="text-sm font-black uppercase tracking-[0.12em] text-[#d7e4ff]">
                  Customer Engagement
                </h4>
                <FooterList>
                  {customerServices.map((item) => (
                    <FooterLink key={item} href={getServiceLink('call-center-service', item)}>
                      {item}
                    </FooterLink>
                  ))}
                </FooterList>

              </div>

              <div>
                <h4 className="text-sm font-black uppercase tracking-[0.12em] text-[#d7e4ff]">
                  Digital Solutions
                </h4>
                <FooterList>
                  {digitalServices.map((item) => (
                    <FooterLink key={item} href={getServiceLink('artificial-intelligence', item)}>
                      {item}
                    </FooterLink>
                  ))}
                  <FooterLink href="/digital-marketing">Digital Marketing</FooterLink>
                  <FooterLink href="/software-development-services">Software Development</FooterLink>
                  <FooterLink href="/it-services">IT Infrastructure</FooterLink>
                </FooterList>
              </div>

              <div>
                <h4 className="text-sm font-black uppercase tracking-[0.12em] text-[#d7e4ff]">
                  Support
                </h4>
                <FooterList>
                  {supportLinks.map(([label, href]) => (
                    <FooterLink key={label} href={href}>
                      {label}
                    </FooterLink>
                  ))}
                </FooterList>
              </div>

              {footerProjects.length ? (
                <div>
                  <h4 className="text-sm font-black uppercase tracking-[0.12em] text-[#d7e4ff]">
                    Projects
                  </h4>
                  <FooterList>
                    {footerProjects.map((project) => {
                      const href = getProjectHref(project)

                      return (
                        <FooterLink
                          key={project.id || project.title}
                          href={href}
                        >
                          {project.title}
                        </FooterLink>
                      )
                    })}
                  </FooterList>
                </div>
              ) : null}
            </div>
          </div>

          <div className="footer-enquiry-panel col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/10 sm:p-6 lg:col-span-1">
            <FooterTitle>Quick Enquiry</FooterTitle>

            <form onSubmit={handleSubmit} className="mt-5 grid w-full gap-3">
              {leadStatus.message ? (
                <p className={`auth-status ${leadStatus.type === 'success' ? 'is-success' : 'is-error'}`}>
                  {leadStatus.message}
                </p>
              ) : null}
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-sm font-semibold text-white outline-none placeholder:text-[#adc3ef] focus:border-[#63bc45]"
              />

              <input
                type="text"
                name="contact"
                placeholder="Phone or email"
                value={formData.contact}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-sm font-semibold text-white outline-none placeholder:text-[#adc3ef] focus:border-[#63bc45]"
              />

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-sm font-semibold text-white outline-none focus:border-[#63bc45]"
              >
                <option value="" className="text-[#142123]">Select service</option>
                <option value="Artificial Intelligence" className="text-[#142123]">Artificial Intelligence</option>
                <option value="Digital Marketing" className="text-[#142123]">Digital Marketing</option>
                <option value="Call Center" className="text-[#142123]">Call Center</option>
                <option value="IT" className="text-[#142123]">IT</option>
                <option value="Software Development" className="text-[#142123]">Software Development</option>
                <option value="HR Consultant" className="text-[#142123]">HR Consultant</option>
                <option value="Telecommunications" className="text-[#142123]">Telecommunications</option>
              </select>

              <textarea
                name="message"
                placeholder="Write your query..."
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full resize-none rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white outline-none placeholder:text-[#adc3ef] focus:border-[#63bc45]"
              />

              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-[#ff4b2d] text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-[#ff4b2d]/20 transition hover:bg-[#63bc45] hover:shadow-[#63bc45]/20"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </div>

        <div className="relative mt-8 rounded-[1.6rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-5">
          <div className="mb-5">
            <FooterTitle>Capabilities</FooterTitle>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-[#adc3ef]">
              Premium technology, service delivery, onboarding, and career pathways from one enterprise ecosystem.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {footerCapabilityGroups.map((group, groupIndex) => (
              <section key={group.title} className="rounded-2xl border border-white/10 bg-white/8 p-4">
                <h4 className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-white">{group.title}</h4>
                <div className="grid gap-2">
                  {group.items.map(([label, href], itemIndex) => (
                    <a
                      key={label}
                      href={href}
                      className="group flex items-center gap-3 rounded-xl bg-white/8 px-3 py-3 text-[12px] font-extrabold uppercase leading-5 tracking-[0.07em] text-[#eaf1ff] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#ff4b2d] hover:shadow-lg hover:shadow-[#ff4b2d]/10"
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[#ff8a75] transition group-hover:bg-[#fff1ed] group-hover:text-[#ff4b2d]">
                        <FooterCapabilityIcon index={groupIndex + itemIndex} />
                      </span>
                      {label}
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="relative mt-10 grid gap-5 border-t border-white/15 pt-7 text-sm font-semibold text-[#adc3ef] lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p>© 2026 Cromgen Technology. All rights reserved.</p>
          </div>
          <div className="footer-policy-links grid max-w-4xl grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-wrap lg:justify-end">
            {policyLinks.map(([label, href]) => (
              <a key={label} href={href} className="transition hover:text-[#63bc45]">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterTitle({ children }) {
  return (
    <h3 className="inline-block border-b border-[#63bc45] pb-2 text-sm font-black uppercase tracking-[0.14em] text-[#d7e4ff]">
      {children}
    </h3>
  )
}

function FooterList({ children }) {
  return <ul className="mt-4 grid gap-2.5">{children}</ul>
}

function FooterLink({ href, children }) {
  return (
    <li>
      <a
        href={href}
        className="text-sm font-semibold leading-6 text-[#eaf1ff] transition hover:translate-x-1 hover:text-[#63bc45]"
      >
        {children}
      </a>
    </li>
  )
}

function getProjectHref(project = {}) {
  const value = project.id || project.title || 'project'
  return `/contact-requests?project=${encodeURIComponent(value)}`
}
