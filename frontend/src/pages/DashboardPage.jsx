const dashboardConfig = {
  admin: {
    eyebrow: 'Admin Panel',
    title: 'Admin Dashboard',
    copy: 'Manage policy pages, platform settings, users, vendors, and service content from one control panel.',
    cards: [
      ['Policy Settings', 'Edit privacy, terms, cookie, refund, disclaimer, and sitemap content.'],
      ['User Access', 'Manage admin and staff access for the Cromgen platform.'],
      ['Vendor Review', 'Review vendor and freelancer registrations.'],
      ['Site Controls', 'Control content, service links, and business information.'],
    ],
  },
  staff: {
    eyebrow: 'Staff Panel',
    title: 'Staff Dashboard',
    copy: 'Support internal updates, vendor review workflows, policy content, and service coordination tasks.',
    cards: [
      ['Policy Updates', 'Help maintain legal and website content accuracy.'],
      ['Vendor Support', 'Review submitted vendor or freelancer profiles.'],
      ['Service Notes', 'Coordinate service details and operational updates.'],
      ['Reports', 'Track assigned review and support activity.'],
    ],
  },
  vendor: {
    eyebrow: 'Vendor Portal',
    title: 'Vendor Dashboard',
    copy: 'Track your vendor profile, onboarding status, service category, and partnership communication.',
    cards: [
      ['Profile Status', 'View current vendor review status and submitted details.'],
      ['Service Category', 'Keep your service area and offering information updated.'],
      ['Portfolio', 'Share portfolio, website, experience, and company details.'],
      ['Communication', 'Follow Cromgen updates for vendor onboarding.'],
    ],
  },
}

export function DashboardPage({ role }) {
  const savedRole = localStorage.getItem('cromgen_auth_role')
  const token = localStorage.getItem('cromgen_auth_token')
  const config = dashboardConfig[role] || dashboardConfig.vendor

  if (!token || savedRole !== role) {
    return (
      <main className="dashboard-page pt-32 sm:pt-36 lg:pt-28">
        <section className="dashboard-locked mx-auto max-w-3xl px-5 py-16 text-center">
          <p>{config.eyebrow}</p>
          <h1>Login required.</h1>
          <span>Please login with the correct role to access this dashboard.</span>
          <a href="/login">Go to Login</a>
        </section>
      </main>
    )
  }

  const handleLogout = () => {
    localStorage.removeItem('cromgen_auth_token')
    localStorage.removeItem('cromgen_auth_role')
    window.location.assign('/login')
  }

  return (
    <main className="dashboard-page pt-32 sm:pt-36 lg:pt-28">
      <section className="dashboard-shell mx-auto max-w-7xl px-5 py-14">
        <div className="dashboard-hero">
          <div>
            <p>{config.eyebrow}</p>
            <h1>{config.title}</h1>
            <span>{config.copy}</span>
          </div>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="dashboard-grid">
          {config.cards.map(([title, copy], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{title}</h2>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
