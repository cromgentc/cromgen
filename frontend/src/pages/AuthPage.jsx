import { useState } from 'react'
import { AUTH_ENDPOINTS, apiRequest } from '../api/apiEndpoint.js'
import logo from '../assets/cromgen-logo.png'

const authConfig = {
  login: {
    eyebrow: 'Cromgen Portal',
    title: 'Welcome Back',
    copy: 'Login to access your Cromgen Technology dashboard.',
    endpoint: AUTH_ENDPOINTS.adminLogin,
    role: 'admin',
    button: 'Login',
    fields: ['email', 'password'],
    switchLabel: 'Create Account',
    switchHref: '/vendor-register',
    redirectTo: '/admin-dashboard',
  },
  'admin-login': {
    eyebrow: 'Admin Portal',
    title: 'Admin Login',
    copy: 'Secure access for Cromgen Technology administrators to manage settings, policy content, and platform operations.',
    endpoint: AUTH_ENDPOINTS.adminLogin,
    role: 'admin',
    button: 'Login as Admin',
    fields: ['email', 'password'],
    switchLabel: 'Staff login',
    switchHref: '/staff-login',
    redirectTo: '/admin-dashboard',
  },
  'staff-login': {
    eyebrow: 'Staff Portal',
    title: 'Staff Login',
    copy: 'Team access for policy updates, vendor review support, and internal service coordination.',
    endpoint: AUTH_ENDPOINTS.staffLogin,
    role: 'staff',
    button: 'Login as Staff',
    fields: ['email', 'password'],
    switchLabel: 'Admin login',
    switchHref: '/admin-login',
    redirectTo: '/admin-dashboard',
  },
  'vendor-login': {
    eyebrow: 'Vendor Portal',
    title: 'Vendor Login',
    copy: 'Registered vendors can access their Cromgen profile and continue partnership communication.',
    endpoint: AUTH_ENDPOINTS.vendorLogin,
    role: 'vendor',
    button: 'Login as Vendor',
    fields: ['email', 'password'],
    switchLabel: 'Register as vendor',
    switchHref: '/vendor-register',
    redirectTo: '/admin-dashboard',
  },
  'vendor-register': {
    eyebrow: 'Vendor Onboarding',
    title: 'Vendor Register',
    copy: 'Submit company or freelancer details for Cromgen Technology review and partnership activation.',
    endpoint: AUTH_ENDPOINTS.vendorRegister,
    role: 'vendor',
    button: 'Create Vendor Account',
    fields: ['accountType', 'name', 'company', 'email', 'phone', 'serviceCategory', 'portfolio', 'experience', 'password'],
    switchLabel: 'Already registered?',
    switchHref: '/vendor-login',
    redirectTo: '/admin-dashboard',
  },
  'candidate-login': {
    eyebrow: 'Candidate Portal',
    title: 'Candidate Login',
    copy: 'Login to continue your job application with Cromgen Technology.',
    role: 'candidate',
    button: 'Login as Candidate',
    fields: ['email', 'password'],
    switchLabel: 'Create candidate account',
    switchHref: '/candidate-register',
    redirectTo: '/career',
  },
  'candidate-register': {
    eyebrow: 'Candidate Registration',
    title: 'Candidate Register',
    copy: 'Create a candidate profile to apply for open Cromgen Technology roles.',
    role: 'candidate',
    button: 'Create Candidate Account',
    fields: ['name', 'email', 'phone', 'experience', 'password'],
    switchLabel: 'Already registered?',
    switchHref: '/candidate-login',
    redirectTo: '/career',
  },
}

const unifiedLoginRoles = {
  admin: {
    label: 'Admin',
    redirectTo: '/admin-dashboard',
  },
  staff: {
    label: 'Staff',
    redirectTo: '/staff-dashboard',
  },
  user: {
    label: 'User',
    redirectTo: '/user-dashboard',
  },
  vendor: {
    label: 'Vendor',
    redirectTo: '/vendor-dashboard',
  },
}

const fieldLabels = {
  accountType: 'Account Type',
  name: 'Full Name',
  company: 'Company or Freelancer Brand',
  email: 'Email Address',
  phone: 'Phone Number',
  serviceCategory: 'Service Category',
  portfolio: 'Portfolio or Website',
  experience: 'Experience / Team Size',
  password: 'Password',
}

export function AuthPage({ type }) {
  const config = authConfig[type] || authConfig['vendor-login']
  const [formData, setFormData] = useState({})
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const params = new URLSearchParams(window.location.search)
  const redirectTo = params.get('redirect') || config.redirectTo
  const switchHref = params.get('redirect')
    ? `${config.switchHref}?redirect=${encodeURIComponent(params.get('redirect'))}`
    : config.switchHref

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      if (config.role === 'candidate') {
        if (type === 'candidate-register') {
          localStorage.setItem('cromgen_candidate_registered', 'true')
          localStorage.setItem('cromgen_candidate_profile', JSON.stringify(formData))
        }

        if (type === 'candidate-login' && localStorage.getItem('cromgen_candidate_registered') !== 'true') {
          throw new Error('Candidate account not found. Please register first.')
        }

        localStorage.setItem('cromgen_candidate_auth', 'true')
        localStorage.setItem('cromgen_auth_role', 'candidate')
        localStorage.setItem('cromgen_candidate_email', formData.email || '')

        setStatus({
          type: 'success',
          message: `${config.title} successful.`,
        })

        window.location.assign(redirectTo)
        return
      }

      const selectedLoginRole = type === 'login' ? formData.loginRole || 'admin' : config.role
      const loginConfig = type === 'login' ? unifiedLoginRoles[selectedLoginRole] || unifiedLoginRoles.admin : config
      const data = await apiRequest(type === 'login' ? AUTH_ENDPOINTS.unifiedLogin : loginConfig.endpoint, {
        method: 'POST',
        body: JSON.stringify(type === 'login' ? { ...formData, role: selectedLoginRole } : formData),
      })

      if (data.token) {
        localStorage.setItem('cromgen_auth_token', data.token)
        localStorage.setItem('cromgen_auth_role', data.user?.role || (data.vendor ? 'vendor' : selectedLoginRole))
      }
      if (data.user) {
        localStorage.setItem('cromgen_auth_user', JSON.stringify(data.user))
      } else if (data.vendor) {
        localStorage.setItem('cromgen_auth_user', JSON.stringify({ ...data.vendor, role: 'vendor' }))
      }

      setStatus({
        type: 'success',
        message: data.message || `${config.title} successful.`,
      })

      window.location.assign(type === 'login' ? loginConfig.redirectTo : redirectTo)
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to complete request.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (type === 'vendor-register') {
    return (
      <VendorRegisterPage
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        status={status}
        switchHref={switchHref}
      />
    )
  }

  if (type === 'login') {
    return (
      <CromgenLoginPage
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        status={status}
        switchHref={switchHref}
      />
    )
  }

  if (type === 'admin-login') {
    return (
      <AdminLoginPage
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        status={status}
      />
    )
  }

  if (type === 'vendor-login') {
    return (
      <VendorLoginPage
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        status={status}
        switchHref={switchHref}
      />
    )
  }

  return (
    <main className="auth-page pt-32 sm:pt-36 lg:pt-28">
      <section className="auth-shell mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="auth-copy">
          <a href="/" className="auth-logo" aria-label="Cromgen Technology home">
            <img src={logo} alt="Cromgen Technology" />
          </a>
          <p>{config.eyebrow}</p>
          <h1>{config.title}</h1>
          <span>{config.copy}</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <span>Secure Access</span>
            <h2>{config.title}</h2>
          </div>

          <div className="auth-field-grid">
            {config.fields.map((field) => (
              <label key={field}>
                <span>{fieldLabels[field]}</span>
                {field === 'accountType' ? (
                  <select
                    name={field}
                    value={formData[field] || ''}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select account type</option>
                    <option value="company">Company</option>
                    <option value="freelancer">Freelancer</option>
                  </select>
                ) : (
                  <input
                    name={field}
                    type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                    value={formData[field] || ''}
                    onChange={handleChange}
                    required={['name', 'email', 'password'].includes(field)}
                    placeholder={fieldLabels[field]}
                  />
                )}
              </label>
            ))}
          </div>

          {status.message ? (
            <p className={`auth-status ${status.type === 'success' ? 'is-success' : 'is-error'}`}>
              {status.message}
            </p>
          ) : null}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait...' : config.button}
          </button>

          <a href={switchHref} className="auth-switch">
            {config.switchLabel}
          </a>
        </form>
      </section>
    </main>
  )
}

function VendorLoginPage({ formData, handleChange, handleSubmit, isSubmitting, status, switchHref }) {
  const [showPassword, setShowPassword] = useState(false)
  const portalHighlights = [
    ['Partnership Details', 'Keep vendor profile, service category, and onboarding status organized.'],
    ['Project Communication', 'Access Cromgen coordination updates and partnership workflow information.'],
    ['Secure Vendor Access', 'Login through the existing Cromgen vendor authentication flow.'],
  ]

  return (
    <main className="min-h-screen bg-white pt-32 text-[#0f172a] sm:pt-36 lg:pt-28">
      <section className="relative isolate flex min-h-[calc(100vh-7rem)] items-center overflow-hidden px-5 py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_14%,rgba(255,75,45,0.16),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(255,107,74,0.12),transparent_28%),linear-gradient(180deg,#ffffff,#f8fafc)]" />
        <div className="absolute left-8 top-28 -z-10 h-48 w-48 rounded-full bg-[#ff4b2d]/10 blur-3xl" />
        <div className="absolute bottom-10 right-8 -z-10 h-56 w-56 rounded-full bg-[#ff6b4a]/10 blur-3xl" />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-2xl">
            <div className="inline-flex rounded-full border border-[rgba(15,23,42,0.08)] bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ff4b2d] shadow-xl shadow-slate-900/5 backdrop-blur">
              Vendor Portal
            </div>
            <h1 className="mt-7 text-4xl font-black leading-[1.03] text-[#0f172a] sm:text-6xl">
              Vendor Login
            </h1>
            <p className="mt-6 text-base font-semibold leading-8 text-[#475569] sm:text-lg">
              Access your Cromgen Technology vendor dashboard to manage partnership details, projects, communication, and onboarding status.
            </p>
            <div className="mt-9 grid gap-4 sm:grid-cols-3 lg:max-w-3xl">
              {portalHighlights.map(([title, copy]) => (
                <article key={title} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/80 p-5 shadow-xl shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/40 hover:shadow-[#ff4b2d]/10">
                  <h2 className="text-sm font-black text-[#0f172a]">{title}</h2>
                  <p className="mt-3 text-xs font-semibold leading-6 text-[#475569]">{copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[520px]">
            <form onSubmit={handleSubmit} className="rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/85 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-8">
              <div className="text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-xl shadow-slate-900/10 ring-1 ring-[rgba(15,23,42,0.08)]">
                  <img src={logo} alt="Cromgen Technology" className="h-11 w-11 object-contain" />
                </span>
                <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-[#ff4b2d]">Secure Vendor Access</p>
                <h2 className="mt-3 text-3xl font-black text-[#0f172a]">Welcome back</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#475569]">
                  Login with your registered vendor email and password.
                </p>
              </div>

              <div className="mt-8 space-y-5">
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">Email Address</span>
                  <input
                    name="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    placeholder="vendor@example.com"
                    className="min-h-[52px] w-full rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 text-sm font-bold text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#ff4b2d] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,75,45,0.12)]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">Password</span>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password || ''}
                      onChange={handleChange}
                      required
                      autoComplete="current-password"
                      placeholder="Enter password"
                      className="min-h-[52px] w-full rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 pr-14 text-sm font-bold text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#ff4b2d] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,75,45,0.12)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-xl text-[#475569] transition duration-300 hover:bg-[#fff1ed] hover:text-[#ff4b2d]"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <PasswordIcon visible={showPassword} />
                    </button>
                  </div>
                </label>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <a href="mailto:hello@cromgentechnology.com?subject=Vendor%20Password%20Reset" className="text-sm font-black text-[#ff4b2d] transition hover:text-[#ff6b4a]">
                  Forgot Password?
                </a>
                <a href={switchHref} className="text-sm font-black text-[#0f172a] transition hover:text-[#ff4b2d]">
                  Vendor Register
                </a>
              </div>

              {status.message ? (
                <p className={`auth-status ${status.type === 'success' ? 'is-success' : 'is-error'}`}>{status.message}</p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-7 w-full rounded-2xl bg-gradient-to-r from-[#ff4b2d] to-[#ff6b4a] px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/25 transition duration-300 hover:-translate-y-1 hover:shadow-[#ff4b2d]/35 disabled:cursor-wait disabled:opacity-70"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

function PasswordIcon({ visible }) {
  if (visible) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9.4 5.3A9.2 9.2 0 0 1 12 5c5.5 0 9 5.2 9 7 0 1-.9 2.4-2.4 3.7M6.4 6.7C4.3 8.1 3 10.6 3 12c0 1.8 3.5 7 9 7 1.5 0 2.9-.4 4.1-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function CromgenLoginPage({ formData, handleChange, handleSubmit, isSubmitting, status, switchHref }) {
  const [showPassword, setShowPassword] = useState(false)
  const selectedRole = formData.loginRole || 'admin'

  return (
    <main className="min-h-screen bg-white pt-32 text-[#0f172a] sm:pt-36 lg:pt-28">
      <section className="relative isolate flex min-h-[calc(100vh-7rem)] items-center justify-center overflow-hidden px-5 py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_18%,rgba(255,75,45,0.15),transparent_30%),radial-gradient(circle_at_78%_16%,rgba(255,107,74,0.12),transparent_28%),linear-gradient(180deg,#ffffff,#f8fafc)]" />
        <div className="absolute left-1/2 top-24 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-[#ff4b2d]/10 blur-3xl" />

        <form onSubmit={handleSubmit} className="w-full max-w-[500px] rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/86 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 sm:p-8">
          <div className="text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-xl shadow-slate-900/10 ring-1 ring-[rgba(15,23,42,0.08)]">
              <img src={logo} alt="Cromgen Technology" className="h-11 w-11 object-contain" />
            </span>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-[#ff4b2d]">Cromgen Technology</p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-[#0f172a]">Welcome Back</h1>
            <p className="mt-4 text-sm font-semibold leading-7 text-[#475569]">
              Login to access your Cromgen Technology dashboard.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">Login Type</span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {Object.entries(unifiedLoginRoles).map(([role, option]) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleChange({ target: { name: 'loginRole', value: role } })}
                    className={`min-h-[46px] rounded-2xl border px-3 text-xs font-black uppercase tracking-[0.1em] transition ${
                      selectedRole === role
                        ? 'border-[#ff4b2d] bg-[#fff1ed] text-[#ff4b2d] shadow-[0_0_0_4px_rgba(255,75,45,0.10)]'
                        : 'border-[rgba(15,23,42,0.08)] bg-[#f8fafc] text-[#475569] hover:border-[#ff4b2d]/40 hover:bg-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">Email Address</span>
              <input
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder={`${selectedRole}@example.com`}
                className="min-h-[52px] w-full rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 text-sm font-bold text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#ff4b2d] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,75,45,0.12)]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">Password</span>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password || ''}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  placeholder="Enter password"
                  className="min-h-[52px] w-full rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 pr-14 text-sm font-bold text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#ff4b2d] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,75,45,0.12)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-xl text-[#475569] transition duration-300 hover:bg-[#fff1ed] hover:text-[#ff4b2d]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <PasswordIcon visible={showPassword} />
                </button>
              </div>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <a href="mailto:hello@cromgentechnology.com?subject=Password%20Reset" className="text-sm font-black text-[#ff4b2d] transition hover:text-[#ff6b4a]">
              Forgot Password?
            </a>
            <a href={switchHref} className="text-sm font-black text-[#0f172a] transition hover:text-[#ff4b2d]">
              Vendor Register
            </a>
          </div>

          {status.message ? (
            <p className={`auth-status ${status.type === 'success' ? 'is-success' : 'is-error'}`}>{status.message}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-7 w-full rounded-2xl bg-gradient-to-r from-[#ff4b2d] to-[#ff6b4a] px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/25 transition duration-300 hover:-translate-y-1 hover:shadow-[#ff4b2d]/35 disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </section>
    </main>
  )
}

function AdminLoginPage({ formData, handleChange, handleSubmit, isSubmitting, status }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="min-h-screen bg-white pt-32 text-[#0f172a] sm:pt-36 lg:pt-28">
      <section className="relative isolate flex min-h-[calc(100vh-7rem)] items-center justify-center overflow-hidden px-5 py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_16%,rgba(255,75,45,0.14),transparent_30%),radial-gradient(circle_at_76%_20%,rgba(255,107,74,0.12),transparent_28%),linear-gradient(180deg,#ffffff,#f8fafc)]" />
        <div className="absolute left-8 top-28 -z-10 h-52 w-52 rounded-full bg-[#ff4b2d]/10 blur-3xl" />
        <div className="absolute bottom-12 right-10 -z-10 h-56 w-56 rounded-full bg-[#ff6b4a]/10 blur-3xl" />

        <form onSubmit={handleSubmit} className="w-full max-w-[520px] rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 sm:p-8">
          <div className="text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-xl shadow-slate-900/10 ring-1 ring-[rgba(15,23,42,0.08)]">
              <img src={logo} alt="Cromgen Technology" className="h-11 w-11 object-contain" />
            </span>
            <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-[#ff4b2d]/20 bg-[#fff1ed] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#ff4b2d]">
              <AdminShieldIcon />
              Secure Login
            </div>
            <h1 className="mt-5 text-4xl font-black leading-tight text-[#0f172a]">Admin Login</h1>
            <p className="mt-4 text-sm font-semibold leading-7 text-[#475569]">
              Secure access to the Cromgen Technology admin dashboard.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">Email Address</span>
              <input
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="admin@example.com"
                className="min-h-[52px] w-full rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 text-sm font-bold text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#ff4b2d] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,75,45,0.12)]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">Password</span>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password || ''}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  placeholder="Enter password"
                  className="min-h-[52px] w-full rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 pr-14 text-sm font-bold text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#ff4b2d] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,75,45,0.12)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-xl text-[#475569] transition duration-300 hover:bg-[#fff1ed] hover:text-[#ff4b2d]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <PasswordIcon visible={showPassword} />
                </button>
              </div>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <a href="mailto:hello@cromgentechnology.com?subject=Admin%20Password%20Reset" className="text-sm font-black text-[#ff4b2d] transition hover:text-[#ff6b4a]">
              Forgot Password?
            </a>
            <a href="/" className="text-sm font-black text-[#0f172a] transition hover:text-[#ff4b2d]">
              Back to Home
            </a>
          </div>

          {status.message ? (
            <p className={`auth-status ${status.type === 'success' ? 'is-success' : 'is-error'}`}>{status.message}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-7 w-full rounded-2xl bg-gradient-to-r from-[#ff4b2d] to-[#ff6b4a] px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/25 transition duration-300 hover:-translate-y-1 hover:shadow-[#ff4b2d]/35 disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </section>
    </main>
  )
}

function AdminShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 5 6v5c0 4.5 2.9 8.7 7 10 4.1-1.3 7-5.5 7-10V6l-7-3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="m9.5 12 1.7 1.7 3.8-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function VendorRegisterPage({ formData, handleChange, handleSubmit, isSubmitting, status, switchHref }) {
  const benefits = [
    ['Recruitment Partnership', 'Partner with Cromgen for hiring, staffing, candidate sourcing, and workforce support opportunities.'],
    ['Outsourcing Opportunities', 'Collaborate across BPO, IT, digital services, operations, and business process delivery.'],
    ['Project Collaboration', 'Join structured projects with clear scope, communication, documentation, and delivery expectations.'],
    ['Fast Vendor Onboarding', 'Submit your details through a streamlined enterprise registration and review workflow.'],
    ['Transparent Coordination', 'Work with defined communication channels, review steps, and practical partnership updates.'],
    ['Long-Term Business Opportunities', 'Build scalable engagement potential across Cromgen Technology service verticals.'],
  ]
  const workflow = ['Registration Submission', 'Internal Review', 'Verification & Discussion', 'Partnership Activation']
  const trust = [
    'Secure Vendor Management',
    'Dedicated Support Team',
    'Multi-Service Collaboration',
    'Scalable Partnership Opportunities',
    'Fast Communication',
    'Professional Coordination',
  ]

  return (
    <main className="min-h-screen bg-white pt-32 text-[#0f172a] sm:pt-36 lg:pt-28">
      <section className="relative isolate overflow-hidden px-5 py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(255,75,45,0.14),transparent_30%),radial-gradient(circle_at_86%_18%,rgba(255,107,74,0.12),transparent_30%),linear-gradient(180deg,#ffffff,#f8fafc)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
          <div>
            <div className="inline-flex rounded-full border border-[rgba(15,23,42,0.08)] bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ff4b2d] shadow-xl shadow-slate-900/5 backdrop-blur">
              Vendor Partnership Portal
            </div>
            <h1 className="mt-7 text-4xl font-black leading-[1.02] text-[#0f172a] sm:text-6xl lg:text-7xl">
              Vendor Registration
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#475569] sm:text-lg">
              Join Cromgen Technology as a trusted vendor partner for recruitment, outsourcing, IT, digital services, and business operations support.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#vendor-registration-form" className="rounded-2xl bg-gradient-to-r from-[#ff4b2d] to-[#ff6b4a] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/25 transition duration-300 hover:-translate-y-1">
                Register Now
              </a>
              <a href="mailto:hello@cromgentechnology.com" className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/80 px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#0f172a] shadow-xl shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/40 hover:text-[#ff4b2d]">
                Contact Partnership Team
              </a>
            </div>
            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              {['Trusted Vendor Network', 'Pan India Operations', 'Enterprise Partnership Support'].map((item) => (
                <article key={item} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/80 p-5 shadow-xl shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/40">
                  <strong className="text-lg font-black text-[#0f172a]">{item}</strong>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/85 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
            <div className="rounded-3xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#64748b]">Vendor Desk</p>
                  <h2 className="mt-2 text-2xl font-black text-[#0f172a]">Partnership Review</h2>
                </div>
                <span className="rounded-full bg-[#fff1ed] px-3 py-1 text-xs font-black text-[#ff4b2d]">Open</span>
              </div>
              {['Profile Submitted', 'Service Mapped', 'Review Scheduled'].map((item, index) => (
                <div key={item} className="mb-4 rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#475569]">{item}</span>
                    <strong className="text-xl font-black text-[#ff4b2d]">{82 - index * 12}%</strong>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e2e8f0]">
                    <i className="block h-full rounded-full bg-gradient-to-r from-[#ff4b2d] to-[#ff6b4a]" style={{ width: `${82 - index * 12}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Vendor Benefits" title="Partnership opportunities across Cromgen service operations." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {benefits.map(([title, copy], index) => (
              <PremiumCard key={title} index={index} title={title} copy={copy} />
            ))}
          </div>
        </div>
      </section>

      <section id="vendor-registration-form" className="px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionTitle
              eyebrow="Registration Form"
              title="Submit your vendor profile for review."
              copy="Share your company, contact, service category, portfolio, and operational experience. Cromgen will review and coordinate next steps."
            />
          </div>

          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white p-6 shadow-2xl shadow-slate-900/10 sm:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              {[
                ['company', 'Company Name', 'text'],
                ['name', 'Contact Person', 'text'],
                ['phone', 'Mobile Number', 'tel'],
                ['email', 'Email Address', 'email'],
                ['serviceCategory', 'Service Category', 'select'],
                ['location', 'Location', 'text'],
                ['experience', 'Experience', 'text'],
                ['portfolio', 'Website/Portfolio', 'url'],
                ['password', 'Account Password', 'password'],
              ].map(([field, label, inputType]) => (
                <label key={field} className={field === 'password' ? 'md:col-span-2' : ''}>
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">{label}</span>
                  {inputType === 'select' ? (
                    <select
                      name={field}
                      value={formData[field] || ''}
                      onChange={handleChange}
                      required
                      className="h-13 w-full rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 text-sm font-bold text-[#0f172a] outline-none transition focus:border-[#ff4b2d] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,75,45,0.12)]"
                    >
                      <option value="">Select service category</option>
                      <option value="Recruitment">Recruitment</option>
                      <option value="Outsourcing">Outsourcing</option>
                      <option value="IT Services">IT Services</option>
                      <option value="Digital Services">Digital Services</option>
                      <option value="Business Operations">Business Operations</option>
                    </select>
                  ) : (
                    <input
                      name={field}
                      type={inputType}
                      value={formData[field] || ''}
                      onChange={handleChange}
                      required={['company', 'name', 'phone', 'email', 'password'].includes(field)}
                      placeholder={label}
                      className="h-13 w-full rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 text-sm font-bold text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#ff4b2d] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,75,45,0.12)]"
                    />
                  )}
                </label>
              ))}
              <label className="md:col-span-2">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">Message</span>
                <textarea
                  name="message"
                  value={formData.message || ''}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us about your service capability, team strength, preferred locations, and partnership goals."
                  className="w-full resize-none rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 text-sm font-bold text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#ff4b2d] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,75,45,0.12)]"
                />
              </label>
            </div>

            {status.message ? (
              <p className={`auth-status ${status.type === 'success' ? 'is-success' : 'is-error'}`}>{status.message}</p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#ff4b2d] to-[#ff6b4a] px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/25 transition duration-300 hover:-translate-y-1 disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? 'Submitting...' : 'Register Now'}
            </button>

            <a href={switchHref} className="mt-5 flex justify-center text-sm font-black text-[#ff4b2d]">
              Already registered? Vendor Login
            </a>
          </form>
        </div>
      </section>

      <section className="border-y border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Workflow" title="Vendor Onboarding Process" />
          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {workflow.map((step, index) => (
              <article key={step} className="group relative rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-6 shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/50 hover:shadow-[#ff4b2d]/10">
                {index < workflow.length - 1 ? <span className="absolute left-[calc(100%-8px)] top-10 hidden h-px w-8 bg-gradient-to-r from-[#ff4b2d] to-transparent lg:block" /> : null}
                <span className="absolute -top-4 left-6 grid h-10 w-10 place-items-center rounded-2xl bg-[#ff4b2d] text-sm font-black text-white">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-8 text-xl font-black text-[#0f172a]">{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Enterprise Trust" title="Built for secure and scalable vendor partnerships." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trust.map((item, index) => (
              <PremiumCard key={item} index={index} title={item} copy="Professional vendor collaboration with clear communication, review discipline, and enterprise coordination." />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function SectionTitle({ eyebrow, title, copy }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff4b2d]">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-black leading-tight text-[#0f172a] sm:text-5xl">{title}</h2>
      {copy ? <p className="mt-4 text-base font-semibold leading-8 text-[#475569]">{copy}</p> : null}
    </div>
  )
}

function PremiumCard({ index, title, copy }) {
  return (
    <article className="group rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/90 p-6 shadow-xl shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/50 hover:shadow-[#ff4b2d]/10">
      <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#fff1ed] text-sm font-black text-[#ff4b2d] transition duration-300 group-hover:bg-[#ff4b2d] group-hover:text-white">
        {String(index + 1).padStart(2, '0')}
      </div>
      <h3 className="text-xl font-black text-[#0f172a]">{title}</h3>
      <p className="mt-4 text-sm font-semibold leading-7 text-[#475569]">{copy}</p>
    </article>
  )
}
