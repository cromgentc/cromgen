import { useState } from 'react'
import { getServiceLink, services } from '../data/services.js'
import logo from '../assets/cromgen-logo.png'
import { useSiteSettings } from '../hooks/useSiteSettings.js'

export function Header({ activeRoute }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const settings = useSiteSettings()
  const topbarLogo = settings?.topbarLogo || logo
  const topbarLogoSize = Math.min(Number(settings?.topbarLogoSize) || 52, 58)

  const closeMenu = () => setIsMenuOpen(false)
  const isActive = (slug) => activeRoute === slug || activeRoute?.startsWith(slug)

  return (
    <header className="premium-site-header fixed left-0 top-0 z-50 w-full border-b border-[rgba(15,23,42,0.08)] bg-white/82 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:gap-6 xl:px-8">
        
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="premium-header-logo flex shrink-0 items-center gap-3 rounded-2xl px-2 py-1 transition duration-300 hover:-translate-y-0.5" aria-label="Cromgen Technology home" onClick={closeMenu}>
            <img
              src={topbarLogo}
              alt="Cromgen Technology logo"
              className="rounded-xl object-contain shadow-[0_10px_30px_rgba(255,75,45,0.14)]"
              style={{ width: topbarLogoSize, height: topbarLogoSize }}
            />
           
          </a>

          <button
            type="button"
            className="mobile-menu-toggle inline-grid h-11 w-11 place-items-center rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white text-[#0f172a] shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[#ff4b2d]/40 hover:text-[#ff4b2d] lg:hidden"
            aria-label={isMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            <span className={`mobile-menu-line ${isMenuOpen ? 'is-open' : ''}`} />
          </button>
        </div>

        {/* NAV */}
        <nav className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-1.5 text-[11px] font-black uppercase tracking-[0.1em] text-[#475569] lg:flex">
          
          {/* HOME */}
          <a
            href="/"
            className={`premium-nav-link shrink-0 rounded-full px-3.5 py-2.5 transition-all duration-300 ${
              isActive('home')
                ? 'bg-[#fff1ed] text-[#ff4b2d] shadow-[0_10px_24px_rgba(255,75,45,0.14)]'
                : 'hover:-translate-y-0.5 hover:bg-[#fff7f4] hover:text-[#ff4b2d]'
            }`}
          >
            Home
          </a>

          {/* SERVICES */}
          {services.map((service) => (
            <div key={service.slug} className="group">
              
              {/* MAIN LINK */}
              <a
                href={`/${service.slug}`}
                className={`premium-nav-link inline-flex shrink-0 rounded-full px-3.5 py-2.5 transition-all duration-300 ${
                  isActive(service.slug)
                    ? 'bg-[#fff1ed] text-[#ff4b2d] shadow-[0_10px_24px_rgba(255,75,45,0.14)]'
                    : 'hover:-translate-y-0.5 hover:bg-[#fff7f4] hover:text-[#ff4b2d]'
                }`}
              >
                {service.navTitle || service.title}
              </a>

              {/* DROPDOWN */}
              <div className="invisible absolute left-1/2 top-full z-40 w-[min(980px,calc(100vw-2rem))] -translate-x-1/2 translate-y-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-3 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-3 group-focus-within:opacity-100">
                
                <div className="overflow-hidden rounded-[1.4rem] border border-[rgba(15,23,42,0.08)] bg-white/96 shadow-2xl shadow-slate-900/12 backdrop-blur-2xl">
                  <div className="border-b border-[rgba(15,23,42,0.06)] bg-gradient-to-r from-[#fff7f4] to-white px-5 py-4">
                    <strong className="text-sm font-black text-[#0f172a]">{service.navTitle || service.title}</strong>
                    <p className="mt-1 text-xs font-semibold normal-case tracking-normal text-[#64748b]">Explore enterprise service capabilities</p>
                  </div>
                  <div className="grid max-h-[min(420px,calc(100vh-180px))] grid-cols-1 gap-1 overflow-y-auto p-3 sm:grid-cols-2 lg:grid-cols-3">
                    {service.services.map((item, index) => (
                      <a
                        key={item}
                        href={getServiceLink(service.slug, item)}
                        className="group/item flex items-center gap-3 rounded-xl px-4 py-3 text-[12px] font-extrabold uppercase leading-5 tracking-[0.08em] text-[#475569] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#fff1ed] hover:text-[#ff4b2d]"
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[rgba(15,23,42,0.08)] bg-white text-[#ff4b2d] shadow-sm transition duration-200 group-hover/item:border-[#ff4b2d]/30 group-hover/item:bg-[#ff4b2d] group-hover/item:text-white">
                          <ServiceDropdownIcon item={item} index={index} />
                        </span>
                        <span>{item}</span>
                      </a>
                    ))}
                  </div>

                </div>
              </div>

            </div>
          ))}
        </nav>

        <nav
          id="mobile-navigation"
          className={`mobile-navigation grid overflow-hidden text-[12px] font-black uppercase tracking-[0.1em] text-[#475569] transition-all duration-300 lg:hidden ${
            isMenuOpen ? 'max-h-[72vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="grid gap-2 overflow-y-auto rounded-[1.35rem] border border-[rgba(15,23,42,0.08)] bg-white/96 p-3 shadow-2xl shadow-slate-900/12 backdrop-blur-2xl">
            <a
              href="/"
              onClick={closeMenu}
              className={`rounded-xl px-4 py-3 transition-all duration-200 ${
                isActive('home')
                  ? 'bg-[#fff1ed] text-[#ff4b2d] shadow-lg shadow-[#ff4b2d]/10'
                  : 'bg-[#f8fafc] hover:bg-[#fff1ed] hover:text-[#ff4b2d]'
              }`}
            >
              Home
            </a>

            {services.map((service) => (
              <details key={service.slug} className="group/mobile rounded-xl bg-[#f8fafc]">
                <summary
                  className={`flex cursor-pointer list-none items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 ${
                    isActive(service.slug)
                      ? 'bg-[#fff1ed] text-[#ff4b2d] shadow-lg shadow-[#ff4b2d]/10'
                      : 'hover:bg-[#fff1ed] hover:text-[#ff4b2d]'
                  }`}
                >
                  <span>{service.navTitle || service.title}</span>
                  <span className="text-base leading-none transition group-open/mobile:rotate-45">+</span>
                </summary>

                <div className="grid max-h-64 gap-1 overflow-y-auto px-2 pb-2 pt-1">
                  <a
                    href={`/${service.slug}`}
                    onClick={closeMenu}
                    className="rounded-lg bg-white px-3 py-2.5 text-[11px] font-extrabold leading-5 tracking-[0.07em] text-[#0f172a] transition-all duration-200 hover:bg-[#fff1ed] hover:text-[#ff4b2d]"
                  >
                    View {service.navTitle || service.title}
                  </a>
                  {service.services.map((item, index) => (
                    <a
                      key={item}
                      href={getServiceLink(service.slug, item)}
                      onClick={closeMenu}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[11px] font-extrabold leading-5 tracking-[0.07em] text-[#475569] transition-all duration-200 hover:bg-[#fff1ed] hover:text-[#ff4b2d]"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-[#ff4b2d] shadow-sm">
                        <ServiceDropdownIcon item={item} index={index} />
                      </span>
                      <span>{item}</span>
                    </a>
                  ))}
                </div>
              </details>
            ))}
            <a
              href="mailto:hello@cromgentechnology.com"
              onClick={closeMenu}
              className="rounded-xl bg-gradient-to-r from-[#ff4b2d] to-[#ff6b4a] px-4 py-3 text-center text-white shadow-lg shadow-[#ff4b2d]/20 transition hover:-translate-y-0.5"
            >
              Start Project
            </a>
          </div>
        </nav>

      </div>
    </header>
  )
}

function ServiceDropdownIcon({ item, index }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': 'true',
  }
  const text = item.toLowerCase()
  const type = getDropdownIconType(text, index)

  if (type === 'spark') {
    return (
      <svg {...common}>
        <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="m18 15 .8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    )
  }

  if (type === 'bot') {
    return (
      <svg {...common}>
        <path d="M8 8V5m8 3V5M6 9h12v9H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 13h.01M15 13h.01M10 17h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'chart') {
    return (
      <svg {...common}>
        <path d="M4 19V5m0 14h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 15v-4m4 4V8m4 7v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="m8 9 3-3 3 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (type === 'message') {
    return (
      <svg {...common}>
        <path d="M5 6h14v9H9l-4 4V6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'headset') {
    return (
      <svg {...common}>
        <path d="M4 13v-1a8 8 0 0 1 16 0v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M5 13h3v5H6a2 2 0 0 1-2-2v-1a2 2 0 0 1 1-2Zm14 0h-3v5h2a2 2 0 0 0 2-2v-1a2 2 0 0 0-1-2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M16 18c0 1.4-1.6 2-4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'phone') {
    return (
      <svg {...common}>
        <path d="M8 5 5 8c.4 5.6 5.4 10.6 11 11l3-3-3.6-3.6-2 2c-1.8-.8-3.2-2.2-4-4l2-2L8 5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    )
  }

  if (type === 'mail') {
    return (
      <svg {...common}>
        <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    )
  }

  if (type === 'cloud') {
    return (
      <svg {...common}>
        <path d="M7 18h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.2 1.8A3.2 3.2 0 0 0 7 18Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M9 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'shield') {
    return (
      <svg {...common}>
        <path d="M12 3 5 6v5c0 4.5 2.9 8.7 7 10 4.1-1.3 7-5.5 7-10V6l-7-3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="m9.5 12 1.7 1.7 3.8-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (type === 'code') {
    return (
      <svg {...common}>
        <path d="m9 8-4 4 4 4m6-8 4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m13 6-2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'database') {
    return (
      <svg {...common}>
        <path d="M5 7c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3Z" stroke="currentColor" strokeWidth="2" />
        <path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }

  if (type === 'paint') {
    return (
      <svg {...common}>
        <path d="M12 3a9 9 0 0 0 0 18h1.5a2 2 0 0 0 1-3.7 1.5 1.5 0 0 1 .7-2.8H17a4 4 0 0 0 4-4A7.5 7.5 0 0 0 12 3Z" stroke="currentColor" strokeWidth="2" />
        <path d="M7.5 11h.01M9 7.5h.01M14 7.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'users') {
    return (
      <svg {...common}>
        <path d="M16 19c0-2.2-1.8-4-4-4s-4 1.8-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" />
        <path d="M4 18c0-1.7 1.3-3 3-3m10 0c1.7 0 3 1.3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'calendar') {
    return (
      <svg {...common}>
        <path d="M7 4v3m10-3v3M5 8h14v11H5V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 12h3m3 0h2M8 16h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'telecom') {
    return (
      <svg {...common}>
        <path d="M7 5h10v14H7V5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M10 17h4M9 8h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18.5 7.5c1.7 2.8 1.7 6.2 0 9M5.5 7.5c-1.7 2.8-1.7 6.2 0 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'settings') {
    return (
      <svg {...common}>
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" />
        <path d="M19 12a7.7 7.7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a7 7 0 0 0-1.7-1L14.5 3h-5l-.3 3.1a7 7 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.5a7.7 7.7 0 0 0 0 2l-2 1.5 2 3.4 2.4-1a7 7 0 0 0 1.7 1l.3 3.1h5l.3-3.1a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function getDropdownIconType(text, index) {
  if (text.includes('chatbot') || text.includes('chat')) return 'bot'
  if (text.includes('machine') || text.includes('generative') || text.includes('ai ') || text.includes('voice')) return 'spark'
  if (text.includes('analytics') || text.includes('report') || text.includes('seo') || text.includes('scoring')) return 'chart'
  if (text.includes('nlp') || text.includes('natural') || text.includes('content') || text.includes('email') || text.includes('whatsapp')) return 'message'
  if (text.includes('calling') || text.includes('call') || text.includes('telemarketing') || text.includes('phone') || text.includes('pbx') || text.includes('voip') || text.includes('sip') || text.includes('ivr')) return 'phone'
  if (text.includes('support') || text.includes('helpdesk') || text.includes('customer')) return 'headset'
  if (text.includes('cloud') || text.includes('workspace') || text.includes('microsoft')) return 'cloud'
  if (text.includes('security') || text.includes('firewall') || text.includes('vpn') || text.includes('backup') || text.includes('compliance') || text.includes('verification')) return 'shield'
  if (text.includes('development') || text.includes('api') || text.includes('frontend') || text.includes('backend') || text.includes('devops') || text.includes('software')) return 'code'
  if (text.includes('database') || text.includes('data') || text.includes('asset') || text.includes('crm') || text.includes('erp')) return 'database'
  if (text.includes('design') || text.includes('branding') || text.includes('creative') || text.includes('video')) return 'paint'
  if (text.includes('recruit') || text.includes('talent') || text.includes('employee') || text.includes('workforce') || text.includes('training')) return 'users'
  if (text.includes('appointment') || text.includes('interview') || text.includes('payroll') || text.includes('onboarding')) return 'calendar'
  if (text.includes('telecom') || text.includes('routing') || text.includes('trunk') || text.includes('recording') || text.includes('number')) return 'telecom'

  const fallback = ['spark', 'chart', 'message', 'headset', 'cloud', 'shield', 'code', 'database', 'paint', 'users', 'calendar', 'telecom', 'settings']
  return fallback[index % fallback.length]
}
