import { useEffect, useMemo, useState } from 'react'
import {
  API_ENDPOINT,
  APPLICATION_ENDPOINTS,
  AUTH_ENDPOINTS,
  CONTRACT_ENDPOINTS,
  JOB_ENDPOINTS,
  LEAD_ENDPOINTS,
  POLICY_ENDPOINTS,
  SITE_ENDPOINTS,
  apiRequest,
} from '../api/apiEndpoint.js'
import logo from '../assets/cromgen-logo.png'

const menuItems = [
  ['overview', 'Dashboard', 'overview'],
  ['users', 'Users', 'profile'],
  ['services', 'Services', 'services'],
  ['projects', 'Projects', 'contracts'],
  ['reports', 'Reports', 'overview'],
]

function getStoredAdminUser() {
  try {
    return JSON.parse(localStorage.getItem('cromgen_auth_user') || '{}')
  } catch {
    return {}
  }
}

function getInitials(name = '', email = '') {
  const source = String(name || email || 'Admin').trim()
  const words = source.split(/\s+/).filter(Boolean)
  if (words.length > 1) return `${words[0][0]}${words[1][0]}`.toUpperCase()
  return source.slice(0, 2).toUpperCase()
}

const emptyJobForm = {
  title: '',
  department: '',
  location: '',
  type: 'Full Time',
  experience: '',
  summary: '',
}

const emptyContractForm = {
  title: '',
  recipientName: '',
  recipientEmail: '',
  senderName: 'Cromgen Technology',
  projectStatus: 'active',
  contractBody: '',
  contractFile: { name: '', type: '', data: '' },
}

const projectStatusOptions = [
  ['live', 'Live Project'],
  ['active', 'Active Project'],
  ['inactive', 'Inactive Project'],
  ['closed', 'Closed Project'],
]

function AdminIcon({ name }) {
  const paths = {
    overview: 'M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-5H4v5Zm10 0h6v-5h-6v5Z',
    users: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3 20c.6-4 2.7-6 6-6s5.4 2 6 6H3Zm11.5 0H21c-.4-3.1-2.1-4.7-5-4.8',
    services: 'M4 7h16v4H4V7Zm0 6h7v4H4v-4Zm9 0h7v4h-7v-4Z',
    projects: 'M4 5h7v7H4V5Zm9 0h7v7h-7V5ZM4 14h7v5H4v-5Zm9 0h7v5h-7v-5Z',
    inquiries: 'M4 5h16v12H7l-3 3V5Zm4 4h8M8 13h5',
    reports: 'M5 19V5h14v14H5Zm4-3V9H7v7h2Zm4 0v-5h-2v5h2Zm4 0V7h-2v9h2Z',
    settings: 'M19.4 13.5c.1-.5.1-1 .1-1.5s0-1-.1-1.5l2-1.5-2-3.4-2.4 1a8.2 8.2 0 0 0-2.6-1.5L14 2.5h-4l-.4 2.6A8.2 8.2 0 0 0 7 6.6l-2.4-1-2 3.4 2 1.5c-.1.5-.1 1-.1 1.5s0 1 .1 1.5l-2 1.5 2 3.4 2.4-1a8.2 8.2 0 0 0 2.6 1.5l.4 2.6h4l.4-2.6a8.2 8.2 0 0 0 2.6-1.5l2.4 1 2-3.4-2-1.5ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z',
    sales: 'M4 19V5h16v14H4Zm3-3h3V8H7v8Zm5 0h3v-5h-3v5Zm5 0h1V9h-1v7Z',
    recruiter: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 8c.8-4 3.6-6 8-6s7.2 2 8 6H4Z',
    legal: 'M6 21h12v-2H6v2Zm2-4h8l-1.4-8.2L18 6.5 17 5l-3.1 2.1L13.5 5h-3l-.4 2.1L7 5 6 6.5l3.4 2.3L8 17Z',
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={paths[name] || paths.overview} />
    </svg>
  )
}

export function AdminDashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [adminSearch, setAdminSearch] = useState('')
  const [openAdminGroup, setOpenAdminGroup] = useState('sales')
  const [activeMenu, setActiveMenu] = useState('overview')
  const [activeSettingsTab, setActiveSettingsTab] = useState('brand')
  const [currentAdmin, setCurrentAdmin] = useState(() => getStoredAdminUser())
  const [policies, setPolicies] = useState([])
  const [activeSlug, setActiveSlug] = useState('')
  const [formData, setFormData] = useState(null)
  const [siteSettings, setSiteSettings] = useState(null)
  const [jobForm, setJobForm] = useState(emptyJobForm)
  const [editingJobSlug, setEditingJobSlug] = useState('')
  const [contractForm, setContractForm] = useState(emptyContractForm)
  const [editingContractId, setEditingContractId] = useState('')
  const [postedJobs, setPostedJobs] = useState([])
  const [leads, setLeads] = useState([])
  const [applications, setApplications] = useState([])
  const [selectedLeadIds, setSelectedLeadIds] = useState([])
  const [selectedJobSlugs, setSelectedJobSlugs] = useState([])
  const [selectedApplicationIds, setSelectedApplicationIds] = useState([])
  const [selectedContractIds, setSelectedContractIds] = useState([])
  const [contracts, setContracts] = useState([])
  const [status, setStatus] = useState({ type: '', message: '' })
  const token = localStorage.getItem('cromgen_auth_token')
  const role = localStorage.getItem('cromgen_auth_role')
  const adminName = currentAdmin?.name || currentAdmin?.email || 'Admin'
  const adminInitials = getInitials(currentAdmin?.name, currentAdmin?.email)

  useEffect(() => {
    if (!status.message) return undefined

    const timeoutId = window.setTimeout(() => {
      setStatus({ type: '', message: '' })
    }, 2000)

    return () => window.clearTimeout(timeoutId)
  }, [status.message])

  useEffect(() => {
    if (!token || role !== 'admin') return

    Promise.all([
      loadPolicies(),
      loadSiteSettings(),
      loadCurrentUser(),
      loadLeads(),
      loadApplications(),
      loadContracts(),
      loadJobPosts(),
    ]).catch(() => null)
  }, [token, role])

  useEffect(() => {
    if (!token || role !== 'admin') return undefined

    const intervalId = window.setInterval(() => {
      loadLeads()
      loadApplications()
      loadContracts()
      loadJobPosts()
    }, 15000)

    return () => window.clearInterval(intervalId)
  }, [token, role])

  useEffect(() => {
    if (!activeSlug || !token || role !== 'admin') return

    loadPolicy(activeSlug)
  }, [activeSlug, token, role])

  const activePolicy = useMemo(
    () => policies.find((policy) => policy.slug === activeSlug),
    [activeSlug, policies],
  )

  const searchTerm = adminSearch.trim().toLowerCase()
  const visibleJobs = useMemo(() => {
    if (!searchTerm) return postedJobs
    return postedJobs.filter((job) => [
      job.title,
      job.department,
      job.location,
      job.type,
      job.experience,
    ].some((value) => String(value || '').toLowerCase().includes(searchTerm)))
  }, [postedJobs, searchTerm])

  const visibleContracts = useMemo(() => {
    if (!searchTerm) return contracts
    return contracts.filter((contract) => [
      contract.title,
      contract.recipientName,
      contract.recipientEmail,
      contract.status,
      contract.signatureName,
    ].some((value) => String(value || '').toLowerCase().includes(searchTerm)))
  }, [contracts, searchTerm])

  const visibleLeads = useMemo(() => {
    if (!searchTerm) return leads
    return leads.filter((lead) => [
      lead.name,
      lead.email,
      lead.service,
      lead.query,
    ].some((value) => String(value || '').toLowerCase().includes(searchTerm)))
  }, [leads, searchTerm])

  const visibleApplications = useMemo(() => {
    if (!searchTerm) return applications
    return applications.filter((application) => [
      application.title,
      application.job,
      application.department,
      application.location,
      application.candidate?.name,
      application.candidate?.email,
      application.candidate?.phone,
      application.candidate?.experience,
      application.candidate?.portfolio,
      application.candidate?.noticePeriod,
      application.candidate?.message,
      application.resume?.name,
    ].some((value) => String(value || '').toLowerCase().includes(searchTerm)))
  }, [applications, searchTerm])

  const selectedVisibleLeadIds = visibleLeads.map((lead) => lead.id).filter(Boolean)
  const selectedVisibleJobSlugs = visibleJobs.map((job) => job.slug).filter(Boolean)
  const selectedVisibleApplicationIds = visibleApplications.map((application) => application.id).filter(Boolean)
  const selectedVisibleContractIds = visibleContracts.map((contract) => contract.signingToken || contract.slug).filter(Boolean)
  const areVisibleLeadsSelected = selectedVisibleLeadIds.length > 0 && selectedVisibleLeadIds.every((id) => selectedLeadIds.includes(id))
  const areVisibleJobsSelected = selectedVisibleJobSlugs.length > 0 && selectedVisibleJobSlugs.every((slug) => selectedJobSlugs.includes(slug))
  const areVisibleApplicationsSelected = selectedVisibleApplicationIds.length > 0 && selectedVisibleApplicationIds.every((id) => selectedApplicationIds.includes(id))
  const areVisibleContractsSelected = selectedVisibleContractIds.length > 0 && selectedVisibleContractIds.every((id) => selectedContractIds.includes(id))

  if (!token || role !== 'admin') {
    return (
      <main className="admin-dashboard auth-page">
        <section className="dashboard-locked mx-auto max-w-3xl px-5 py-16 text-center">
          <p>Admin Panel</p>
          <h1>Login required.</h1>
          <span>Please login as admin to access this panel.</span>
          <a href="/admin-login">Admin Login</a>
        </section>
      </main>
    )
  }

  async function loadPolicies() {
    try {
      const data = await apiRequest(POLICY_ENDPOINTS.settingsList)
      setPolicies(data.policies || [])
      setActiveSlug((current) => current || data.policies?.[0]?.slug || '')
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to load policies.',
      })
    }
  }

  async function loadPolicy(slug) {
    try {
      const data = await apiRequest(POLICY_ENDPOINTS.settingsDetail(slug))
      setFormData(data.policy)
      setStatus({ type: '', message: '' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to load policy.',
      })
    }
  }

  async function loadSiteSettings() {
    try {
      const data = await apiRequest(SITE_ENDPOINTS.settingsDetail)
      setSiteSettings(data.settings || null)
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to load site settings.',
      })
    }
  }

  async function loadCurrentUser() {
    try {
      const data = await apiRequest(AUTH_ENDPOINTS.currentUser)
      if (data.user) {
        setCurrentAdmin(data.user)
        localStorage.setItem('cromgen_auth_user', JSON.stringify(data.user))
      }
    } catch {
      setCurrentAdmin(getStoredAdminUser())
    }
  }

  async function loadLeads() {
    try {
      const data = await apiRequest(LEAD_ENDPOINTS.settingsList)
      setLeads(data.leads || [])
      setSelectedLeadIds((current) => current.filter((id) => (data.leads || []).some((lead) => lead.id === id)))
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to load leads.',
      })
    }
  }

  async function loadApplications() {
    try {
      const data = await apiRequest(APPLICATION_ENDPOINTS.settingsList)
      setApplications(data.applications || [])
      setSelectedApplicationIds((current) => current.filter((id) => (data.applications || []).some((application) => application.id === id)))
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to load applied candidates.',
      })
    }
  }

  async function loadContracts() {
    try {
      const data = await apiRequest(CONTRACT_ENDPOINTS.settingsList)
      setContracts(data.contracts || [])
      setSelectedContractIds((current) => current.filter((id) => (data.contracts || []).some((contract) => (contract.signingToken || contract.slug) === id)))
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to load contracts.',
      })
    }
  }

  async function loadJobPosts() {
    try {
      const data = await apiRequest(JOB_ENDPOINTS.settingsList)
      setPostedJobs(data.jobs || [])
      setSelectedJobSlugs((current) => current.filter((slug) => (data.jobs || []).some((job) => job.slug === slug)))
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to load job posts.',
      })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('cromgen_auth_token')
    localStorage.removeItem('cromgen_auth_role')
    localStorage.removeItem('cromgen_auth_user')
    window.location.assign('/admin-login')
  }

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  const handleImageFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setStatus({ type: 'error', message: 'Please select a valid image file.' })
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      updateField('image', String(reader.result || ''))
      setStatus({ type: 'success', message: 'Image selected. Click Save Policy to publish it.' })
    }
    reader.onerror = () => {
      setStatus({ type: 'error', message: 'Unable to read the selected image.' })
    }
    reader.readAsDataURL(file)
  }

  const handleSiteImageChange = (field, event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setStatus({ type: 'error', message: 'Please select a valid image file.' })
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setSiteSettings((current) => ({ ...current, [field]: String(reader.result || '') }))
      setStatus({ type: 'success', message: 'Image selected. Save settings to publish it.' })
    }
    reader.onerror = () => {
      setStatus({ type: 'error', message: 'Unable to read the selected image.' })
    }
    reader.readAsDataURL(file)
  }

  const handleContractFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    if (!allowedTypes.includes(file.type) && !/\.docx$/i.test(file.name)) {
      setStatus({ type: 'error', message: 'Please upload a DOCX contract file.' })
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      updateContractField('contractFile', {
        name: file.name,
        type: file.type || 'application/octet-stream',
        data: String(reader.result || ''),
      })
      setStatus({ type: 'success', message: 'DOCX file attached. Save contract to continue.' })
    }
    reader.onerror = () => {
      setStatus({ type: 'error', message: 'Unable to read the selected contract file.' })
    }
    reader.readAsDataURL(file)
  }

  const updateSiteField = (field, value) => {
    setSiteSettings((current) => ({ ...current, [field]: value }))
  }

  const updateEmailConfigField = (field, value) => {
    setSiteSettings((current) => ({
      ...current,
      emailConfig: {
        ...(current?.emailConfig || {}),
        [field]: value,
      },
    }))
  }

  const updateSocialLink = (index, field, value) => {
    setSiteSettings((current) => ({
      ...current,
      socialLinks: (current.socialLinks || []).map((link, itemIndex) =>
        itemIndex === index ? { ...link, [field]: value } : link,
      ),
    }))
  }

  const addSocialLink = () => {
    setSiteSettings((current) => ({
      ...current,
      socialLinks: [...(current.socialLinks || []), { label: 'Instagram', url: '' }],
    }))
  }

  const removeSocialLink = (index) => {
    setSiteSettings((current) => ({
      ...current,
      socialLinks: (current.socialLinks || []).filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  const updateHighlight = (index, value) => {
    setFormData((current) => ({
      ...current,
      highlights: current.highlights.map((item, itemIndex) => (itemIndex === index ? value : item)),
    }))
  }

  const updateSection = (index, fieldIndex, value) => {
    setFormData((current) => ({
      ...current,
      sections: current.sections.map((section, sectionIndex) =>
        sectionIndex === index
          ? section.map((item, itemIndex) => (itemIndex === fieldIndex ? value : item))
          : section,
      ),
    }))
  }

  const addHighlight = () => {
    setFormData((current) => ({
      ...current,
      highlights: [...(current.highlights || []), 'New highlight'],
    }))
  }

  const addSection = () => {
    setFormData((current) => ({
      ...current,
      sections: [...(current.sections || []), ['NEW SECTION', 'Short policy content.']],
    }))
  }

  const savePolicy = async (event) => {
    event.preventDefault()
    if (!formData?.slug) return

    try {
      const data = await apiRequest(POLICY_ENDPOINTS.settingsDetail(formData.slug), {
        method: 'POST',
        body: JSON.stringify(formData),
      })
      setFormData(data.policy)
      setStatus({ type: 'success', message: 'Policy updated successfully.' })
      await loadPolicies()
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to save policy.',
      })
    }
  }

  const saveSiteSettings = async (event) => {
    event.preventDefault()
    if (!siteSettings) return

    try {
      const data = await apiRequest(SITE_ENDPOINTS.settingsDetail, {
        method: 'POST',
        body: JSON.stringify(siteSettings),
      })
      setSiteSettings(data.settings)
      if (activeSettingsTab === 'email') {
        await loadSiteSettings()
      }
      setStatus({
        type: 'success',
        message:
          activeSettingsTab === 'email'
            ? 'SMTP Email Settings updated successfully.'
            : 'Site settings updated successfully.',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to save site settings.',
      })
    }
  }

  const updateJobField = (field, value) => {
    setJobForm((current) => ({ ...current, [field]: value }))
  }

  const toggleLeadSelection = (id) => {
    if (!id) return
    setSelectedLeadIds((current) => (
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    ))
  }

  const toggleJobSelection = (slug) => {
    if (!slug) return
    setSelectedJobSlugs((current) => (
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]
    ))
  }

  const toggleApplicationSelection = (id) => {
    if (!id) return
    setSelectedApplicationIds((current) => (
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    ))
  }

  const toggleContractSelection = (id) => {
    if (!id) return
    setSelectedContractIds((current) => (
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    ))
  }

  const toggleVisibleLeads = () => {
    setSelectedLeadIds((current) => (
      areVisibleLeadsSelected
        ? current.filter((id) => !selectedVisibleLeadIds.includes(id))
        : [...new Set([...current, ...selectedVisibleLeadIds])]
    ))
  }

  const toggleVisibleJobs = () => {
    setSelectedJobSlugs((current) => (
      areVisibleJobsSelected
        ? current.filter((slug) => !selectedVisibleJobSlugs.includes(slug))
        : [...new Set([...current, ...selectedVisibleJobSlugs])]
    ))
  }

  const toggleVisibleApplications = () => {
    setSelectedApplicationIds((current) => (
      areVisibleApplicationsSelected
        ? current.filter((id) => !selectedVisibleApplicationIds.includes(id))
        : [...new Set([...current, ...selectedVisibleApplicationIds])]
    ))
  }

  const toggleVisibleContracts = () => {
    setSelectedContractIds((current) => (
      areVisibleContractsSelected
        ? current.filter((id) => !selectedVisibleContractIds.includes(id))
        : [...new Set([...current, ...selectedVisibleContractIds])]
    ))
  }

  const downloadCsv = (fileName, rows) => {
    const csv = rows.map((row) => row.map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.click()
    URL.revokeObjectURL(url)
  }

  const downloadLeadsCsv = () => {
    downloadCsv('enquiry-leads.csv', [
      ['Name', 'Email', 'Service', 'Query', 'Submitted'],
      ...visibleLeads.map((lead) => [
        lead.name,
        lead.email,
        lead.service,
        lead.query,
        lead.createdAt ? new Date(lead.createdAt).toLocaleString() : '',
      ]),
    ])
  }

  const downloadProjectsCsv = () => {
    downloadCsv('cromgen-projects.csv', [
      ['Project', 'Client Name', 'Client Email', 'Project Status', 'Contract Status', 'Created', 'Signed'],
      ...visibleContracts.map((contract) => [
        contract.title,
        contract.recipientName,
        contract.recipientEmail,
        contract.projectStatus || 'active',
        contract.status,
        contract.createdAt ? new Date(contract.createdAt).toLocaleString() : '',
        contract.signedAt ? new Date(contract.signedAt).toLocaleString() : '',
      ]),
    ])
  }

  const downloadJobsCsv = () => {
    downloadCsv('job-posts.csv', [
      ['Title', 'Department', 'Location', 'Type', 'Experience', 'Summary', 'Created'],
      ...visibleJobs.map((job) => [
        job.title,
        job.department,
        job.location,
        job.type,
        job.experience,
        job.summary,
        job.createdAt ? new Date(job.createdAt).toLocaleString() : '',
      ]),
    ])
  }

  const downloadApplicationsCsv = () => {
    downloadCsv('applied-candidates.csv', [
      ['Candidate', 'Email', 'Phone', 'Job', 'Department', 'Location', 'Experience', 'Portfolio', 'Notice Period', 'Message', 'Resume', 'Submitted'],
      ...visibleApplications.map((application) => [
        application.candidate?.name,
        application.candidate?.email,
        application.candidate?.phone,
        application.title,
        application.department,
        application.location,
        application.candidate?.experience,
        application.candidate?.portfolio,
        application.candidate?.noticePeriod,
        application.candidate?.message,
        application.resume?.name,
        application.createdAt ? new Date(application.createdAt).toLocaleString() : '',
      ]),
    ])
  }

  const openApplicationResume = (application, mode = 'view') => {
    if (!application?.id || !application.resume?.data) return

    const resumePath = mode === 'download'
      ? APPLICATION_ENDPOINTS.settingsResumeDownload(application.id)
      : APPLICATION_ENDPOINTS.settingsResume(application.id)
    const resumeUrl = new URL(`${API_ENDPOINT}${resumePath}`, window.location.origin)
    const authToken = localStorage.getItem('cromgen_auth_token')
    if (authToken) resumeUrl.searchParams.set('token', authToken)
    window.open(resumeUrl.href, '_blank')
  }

  const updateContractField = (field, value) => {
    setContractForm((current) => ({ ...current, [field]: value }))
  }

  const formatProjectDescription = (format) => {
    const textarea = document.getElementById('project-description-editor')
    const value = contractForm.contractBody || ''
    const start = textarea?.selectionStart ?? value.length
    const end = textarea?.selectionEnd ?? value.length
    const selectedText = value.slice(start, end)
    const fallback = selectedText || 'description text'
    const linePrefix = start === 0 || value[start - 1] === '\n' ? '' : '\n'

    const formats = {
      bold: [`**${fallback}**`, selectedText ? 2 : 2, selectedText ? 2 : fallback.length + 2],
      italic: [`_${fallback}_`, selectedText ? 1 : 1, selectedText ? 1 : fallback.length + 1],
      heading: [`${linePrefix}## ${fallback}`, linePrefix.length + 3, linePrefix.length + 3 + fallback.length],
      numbered: [`${linePrefix}1. ${fallback}`, linePrefix.length + 3, linePrefix.length + 3 + fallback.length],
      bullet: [`${linePrefix}- ${fallback}`, linePrefix.length + 2, linePrefix.length + 2 + fallback.length],
      checklist: [`${linePrefix}- [ ] ${fallback}`, linePrefix.length + 6, linePrefix.length + 6 + fallback.length],
      link: [`[${fallback}](https://example.com)`, 1, 1 + fallback.length],
      clear: [selectedText.replace(/(\*\*|_|^#{1,6}\s|^- \[ \]\s|^- \s|^\d+\.\s|\]\([^)]+\))/gm, '').replace(/^\[/gm, ''), 0, 0],
    }

    const [replacement, selectionStartOffset, selectionEndOffset] = formats[format] || formats.bold
    const nextValue = `${value.slice(0, start)}${replacement}${value.slice(end)}`
    updateContractField('contractBody', nextValue)

    window.setTimeout(() => {
      textarea?.focus()
      const nextStart = start + selectionStartOffset
      const nextEnd = start + selectionEndOffset
      textarea?.setSelectionRange(nextStart, Math.max(nextStart, nextEnd))
    }, 0)
  }

  const sendContract = async (event) => {
    event.preventDefault()

    try {
      const data = await apiRequest(
        editingContractId ? CONTRACT_ENDPOINTS.settingsDetail(editingContractId) : CONTRACT_ENDPOINTS.settingsList,
        {
          method: 'POST',
          body: JSON.stringify(contractForm),
        },
      )
      setContracts((current) => (
        editingContractId
          ? current.map((contract) => (
              (contract.signingToken || contract.slug) === editingContractId ? data.contract : contract
            ))
          : [data.contract, ...current]
      ))
      setContractForm(emptyContractForm)
      setEditingContractId('')
      setActiveMenu('contracts')
      setStatus({
        type: 'success',
        message: data.message,
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to save contract.',
      })
    }
  }

  const editContract = (contract) => {
    const contractId = contract.signingToken || contract.slug
    if (!contractId) return

    setEditingContractId(contractId)
    setContractForm({
      title: contract.title || '',
      recipientName: contract.recipientName || '',
      recipientEmail: contract.recipientEmail || '',
      senderName: contract.senderName || 'Cromgen Technology',
      projectStatus: contract.projectStatus || 'active',
      contractBody: contract.contractBody || '',
      contractFile: contract.contractFile || { name: '', type: '', data: '' },
    })
    setActiveMenu('contract-send')
    setStatus({ type: '', message: '' })
  }

  const downloadContractCopy = async (contract) => {
    const contractId = contract.signingToken || contract.slug
    if (contractId && contract.signedContractFile?.data) {
      window.open(`${API_ENDPOINT}${CONTRACT_ENDPOINTS.publicSignedFile(contractId)}`, '_blank')
      return
    }

    const filePath = contractId ? CONTRACT_ENDPOINTS.publicFile(contractId) : ''
    const fileUrl = filePath ? new URL(`${API_ENDPOINT}${filePath}`, window.location.origin).href : ''
    const isDocx = /wordprocessingml|msword/i.test(contract.contractFile?.type || '') || /\.docx$/i.test(contract.contractFile?.name || '')
    let docxHtml = ''

    if (contractId && isDocx) {
      docxHtml = await fetch(`${API_ENDPOINT}${CONTRACT_ENDPOINTS.publicHtml(contractId)}`)
        .then((response) => (response.ok ? response.text() : ''))
        .catch(() => '')
    }

    const html = createAdminSignedHtml(contract, isDocx ? '' : fileUrl, docxHtml)
    openAdminPdfPrintWindow(html, contract.slug || 'signed-contract')
  }

  const viewContract = (contract) => {
    const contractId = contract.signingToken || contract.slug
    if (!contractId) return
    window.open(`/contract-sign/${contractId}`, '_blank', 'noopener,noreferrer')
  }

  const saveJobPost = async (event) => {
    event.preventDefault()

    try {
      const data = await apiRequest(editingJobSlug ? JOB_ENDPOINTS.settingsDetail(editingJobSlug) : JOB_ENDPOINTS.settingsList, {
        method: 'POST',
        body: JSON.stringify(jobForm),
      })
      setPostedJobs((current) => (
        editingJobSlug
          ? current.map((job) => (job.slug === editingJobSlug ? data.job : job))
          : [data.job, ...current]
      ))
      setJobForm(emptyJobForm)
      setEditingJobSlug('')
      setActiveMenu('career-jobs')
      setStatus({ type: 'success', message: editingJobSlug ? 'Job post updated successfully.' : 'Job post published successfully.' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to publish job post.',
      })
    }
  }

  const deleteJobPost = async (slug) => {
    try {
      await apiRequest(JOB_ENDPOINTS.settingsDelete(slug), { method: 'DELETE' })
      setPostedJobs((current) => current.filter((job) => job.slug !== slug))
      setSelectedJobSlugs((current) => current.filter((item) => item !== slug))
      setStatus({ type: 'success', message: 'Job post deleted.' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to delete job post.',
      })
    }
  }

  const editJobPost = (job) => {
    setEditingJobSlug(job.slug)
    setJobForm({
      title: job.title || '',
      department: job.department || '',
      location: job.location || '',
      type: job.type || 'Full Time',
      experience: job.experience || '',
      summary: job.summary || '',
    })
    setActiveMenu('career-job-form')
    setStatus({ type: '', message: '' })
  }

  const deleteSelectedLeads = async () => {
    if (!selectedLeadIds.length) return

    try {
      await Promise.all(selectedLeadIds.map((id) => apiRequest(LEAD_ENDPOINTS.settingsDelete(id), { method: 'DELETE' })))
      setLeads((current) => current.filter((lead) => !selectedLeadIds.includes(lead.id)))
      setSelectedLeadIds([])
      setStatus({ type: 'success', message: 'Selected leads deleted.' })
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to delete selected leads.' })
    }
  }

  const deleteAllLeads = async () => {
    try {
      await apiRequest(LEAD_ENDPOINTS.settingsDeleteAll, { method: 'DELETE' })
      setLeads([])
      setSelectedLeadIds([])
      setStatus({ type: 'success', message: 'All leads deleted.' })
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to delete all leads.' })
    }
  }

  const deleteLead = async (id) => {
    if (!id) return

    try {
      await apiRequest(LEAD_ENDPOINTS.settingsDelete(id), { method: 'DELETE' })
      setLeads((current) => current.filter((lead) => lead.id !== id))
      setSelectedLeadIds((current) => current.filter((item) => item !== id))
      setStatus({ type: 'success', message: 'Lead deleted.' })
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to delete lead.' })
    }
  }

  const deleteSelectedJobs = async () => {
    if (!selectedJobSlugs.length) return

    try {
      await Promise.all(selectedJobSlugs.map((slug) => apiRequest(JOB_ENDPOINTS.settingsDelete(slug), { method: 'DELETE' })))
      setPostedJobs((current) => current.filter((job) => !selectedJobSlugs.includes(job.slug)))
      setSelectedJobSlugs([])
      setStatus({ type: 'success', message: 'Selected job posts deleted.' })
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to delete selected job posts.' })
    }
  }

  const deleteAllJobs = async () => {
    try {
      await apiRequest(JOB_ENDPOINTS.settingsDeleteAll, { method: 'DELETE' })
      setPostedJobs([])
      setSelectedJobSlugs([])
      setStatus({ type: 'success', message: 'All job posts deleted.' })
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to delete all job posts.' })
    }
  }

  const deleteApplication = async (id) => {
    if (!id) return

    try {
      await apiRequest(APPLICATION_ENDPOINTS.settingsDelete(id), { method: 'DELETE' })
      setApplications((current) => current.filter((application) => application.id !== id))
      setSelectedApplicationIds((current) => current.filter((item) => item !== id))
      setStatus({ type: 'success', message: 'Applied candidate deleted.' })
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to delete applied candidate.' })
    }
  }

  const deleteSelectedApplications = async () => {
    if (!selectedApplicationIds.length) return

    try {
      await Promise.all(selectedApplicationIds.map((id) => apiRequest(APPLICATION_ENDPOINTS.settingsDelete(id), { method: 'DELETE' })))
      setApplications((current) => current.filter((application) => !selectedApplicationIds.includes(application.id)))
      setSelectedApplicationIds([])
      setStatus({ type: 'success', message: 'Selected applied candidates deleted.' })
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to delete selected applied candidates.' })
    }
  }

  const deleteAllApplications = async () => {
    try {
      await apiRequest(APPLICATION_ENDPOINTS.settingsDeleteAll, { method: 'DELETE' })
      setApplications([])
      setSelectedApplicationIds([])
      setStatus({ type: 'success', message: 'All applied candidates deleted.' })
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to delete all applied candidates.' })
    }
  }

  const deleteContract = async (contractId) => {
    if (!contractId) {
      setStatus({ type: 'error', message: 'Contract id is missing. Refresh contracts and try again.' })
      return
    }

    try {
      await apiRequest(CONTRACT_ENDPOINTS.settingsDelete(contractId), { method: 'DELETE' })
      setContracts((current) => current.filter((contract) => (
        (contract.signingToken || contract.slug) !== contractId
      )))
      setSelectedContractIds((current) => current.filter((item) => item !== contractId))
      setStatus({ type: 'success', message: 'Contract deleted.' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to delete contract.',
      })
    }
  }

  const deleteSelectedContracts = async () => {
    if (!selectedContractIds.length) return

    try {
      await Promise.all(selectedContractIds.map((id) => apiRequest(CONTRACT_ENDPOINTS.settingsDelete(id), { method: 'DELETE' })))
      setContracts((current) => current.filter((contract) => !selectedContractIds.includes(contract.signingToken || contract.slug)))
      setSelectedContractIds([])
      setStatus({ type: 'success', message: 'Selected projects deleted.' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to delete selected projects.',
      })
    }
  }

  const deleteAllContracts = async () => {
    try {
      const contractIds = contracts.map((contract) => contract.signingToken || contract.slug).filter(Boolean)
      await Promise.all(contractIds.map((id) => apiRequest(CONTRACT_ENDPOINTS.settingsDelete(id), { method: 'DELETE' })))
      setContracts([])
      setSelectedContractIds([])
      setStatus({ type: 'success', message: 'All projects deleted.' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to delete all projects.',
      })
    }
  }

  return (
    <main className={`admin-dashboard ${isSidebarOpen ? 'is-sidebar-open' : 'is-sidebar-collapsed'}`}>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <img src={siteSettings?.topbarLogo || logo} alt="Cromgen Technology" />
          <span>{adminName}</span>
        </div>

        <nav>
          {menuItems.map(([key, label, target]) => (
            <button
              key={key}
              type="button"
              className={activeMenu === target ? 'is-active' : ''}
              onClick={() => setActiveMenu(target)}
            >
              <span><AdminIcon name={key} /></span>
              <b>{label}</b>
            </button>
          ))}
          <button
            type="button"
            className={activeMenu === 'leads' ? 'is-active' : ''}
            onClick={() => {
              loadLeads()
              setActiveMenu('leads')
            }}
          >
            <span><AdminIcon name="inquiries" /></span>
            <b>Leads / Inquiries</b>
          </button>
          <div className="admin-sidebar-group">
            <button
              type="button"
              className={activeMenu === 'career-jobs' || activeMenu === 'career-job-form' || activeMenu === 'applied-candidates' ? 'is-active' : ''}
              onClick={() => setOpenAdminGroup((current) => (current === 'recruiter' ? '' : 'recruiter'))}
            >
              <span><AdminIcon name="recruiter" /></span>
              <b>Recruiter</b>
              <i>{openAdminGroup === 'recruiter' ? '-' : '+'}</i>
            </button>
            {openAdminGroup === 'recruiter' ? (
              <div>
                <button
                  type="button"
                  className={activeMenu === 'career-jobs' || activeMenu === 'career-job-form' ? 'is-active' : ''}
                  onClick={() => {
                    loadJobPosts()
                    setActiveMenu('career-jobs')
                  }}
                >
                  Job
                </button>
                <button
                  type="button"
                  className={activeMenu === 'applied-candidates' ? 'is-active' : ''}
                  onClick={() => {
                    loadApplications()
                    setActiveMenu('applied-candidates')
                  }}
                >
                  Applied Candidates
                </button>
              </div>
            ) : null}
          </div>
          <div className="admin-sidebar-group">
            <button
              type="button"
              className={activeMenu === 'contract-send' ? 'is-active' : ''}
              onClick={() => setOpenAdminGroup((current) => (current === 'legal' ? '' : 'legal'))}
            >
              <span><AdminIcon name="legal" /></span>
              <b>Legal</b>
              <i>{openAdminGroup === 'legal' ? '-' : '+'}</i>
            </button>
            {openAdminGroup === 'legal' ? (
              <div>
                <button
                  type="button"
                  className={activeMenu === 'contract-send' ? 'is-active' : ''}
                  onClick={() => {
                    loadContracts()
                    setActiveMenu('contracts')
                  }}
                >
                  Contract
                </button>
              </div>
            ) : null}
          </div>
        </nav>
        <div className="admin-sidebar-bottom">
          <button
            type="button"
            className={activeMenu === 'settings' ? 'is-active' : ''}
            onClick={() => setActiveMenu('settings')}
          >
            <span><AdminIcon name="settings" /></span>
            <b>Settings</b>
          </button>
          <button type="button" onClick={handleLogout}>
            <span><AdminIcon name="legal" /></span>
            <b>Logout</b>
          </button>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-menu-button"
              aria-label="Toggle admin menu"
              aria-expanded={isSidebarOpen}
              onClick={() => setIsSidebarOpen((open) => !open)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div className="admin-topbar-title">
              <h1>Cromgen Admin</h1>
            </div>
            <label className="admin-search">
              <input
                type="search"
                value={adminSearch}
                placeholder="Search"
                onChange={(event) => setAdminSearch(event.target.value)}
              />
            </label>
          </div>

          <div className="admin-topbar-actions">
            <button type="button" className="admin-round-action" aria-label="Notifications">
              <span>!</span>
            </button>
            <button type="button" className="admin-theme-toggle" aria-label="Toggle dark mode">
              <span></span>
              <b>Dark</b>
            </button>
            <div className="admin-profile">
              <button type="button" aria-label="Open admin profile" onClick={() => setIsProfileOpen((open) => !open)}>
                <span>{adminInitials}</span>
              </button>
              {isProfileOpen ? (
                <div className="admin-profile-menu">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMenu('profile')
                      setIsProfileOpen(false)
                    }}
                  >
                    Profile
                  </button>
                  <button type="button" onClick={handleLogout}>Logout</button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <div className="admin-content-scroll">
          {activeMenu === 'profile' ? (
            <section className="admin-profile-page">
              <div className="admin-profile-hero">
                <div className="admin-profile-avatar">{adminInitials}</div>
                <div>
                  <span>Admin Profile</span>
                  <h2>{adminName}</h2>
                  <p>{currentAdmin?.email || 'No email available'}</p>
                </div>
              </div>

              <div className="admin-profile-grid">
                {[
                  ['Name', currentAdmin?.name || '-'],
                  ['Email', currentAdmin?.email || '-'],
                  ['Role', currentAdmin?.role || role || '-'],
                  ['Account Status', 'Active'],
                ].map(([label, value]) => (
                  <article key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </article>
                ))}
              </div>
            </section>
          ) : activeMenu === 'career-jobs' ? (
            <section className="admin-policy-editor">
              <div className="admin-editor-head">
                <div>
                  <span>Recruiter</span>
                  <h2>Job Posts</h2>
                </div>
                <div className="admin-editor-actions">
                  <button type="button" onClick={() => setActiveMenu('career-job-form')}>Publish Job</button>
                  <button type="button" onClick={downloadJobsCsv}>Download All</button>
                  <button type="button" onClick={deleteSelectedJobs} disabled={!selectedJobSlugs.length}>Delete Selected</button>
                  <button type="button" onClick={deleteAllJobs} disabled={!postedJobs.length}>Delete All</button>
                </div>
              </div>

              {status.message ? (
                <p className={`auth-status ${status.type === 'success' ? 'is-success' : 'is-error'}`}>
                  {status.message}
                </p>
              ) : null}

              <div className="admin-table-wrap">
                <table className="admin-applications-table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={areVisibleJobsSelected}
                          onChange={toggleVisibleJobs}
                        />
                      </th>
                      <th>Job</th>
                      <th>Department</th>
                      <th>Location</th>
                      <th>Type</th>
                      <th>Experience</th>
                      <th>Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleJobs.length ? visibleJobs.map((job) => (
                      <tr key={job.slug}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedJobSlugs.includes(job.slug)}
                            onChange={() => toggleJobSelection(job.slug)}
                          />
                        </td>
                        <td>{job.title}</td>
                        <td>{job.department}</td>
                        <td>{job.location}</td>
                        <td>{job.type}</td>
                        <td>{job.experience || '-'}</td>
                        <td>{job.createdAt ? new Date(job.createdAt).toLocaleString() : '-'}</td>
                        <td>
                          <a href={`/career/apply/${job.slug}`} target="_blank" rel="noreferrer">Open</a>
                          <button type="button" onClick={() => editJobPost(job)}>Edit</button>
                          <button type="button" onClick={() => deleteJobPost(job.slug)}>Delete</button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="8">No job posts yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          ) : activeMenu === 'career-job-form' ? (
            <section className="admin-career-panel">
              <form className="admin-policy-editor" onSubmit={saveJobPost}>
                <div className="admin-editor-head">
                  <div>
                    <span>Career</span>
                    <h2>{editingJobSlug ? 'Edit Vacancy' : 'Post a Vacancy'}</h2>
                  </div>
                  <div className="admin-editor-actions">
                    {editingJobSlug ? (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingJobSlug('')
                          setJobForm(emptyJobForm)
                          setActiveMenu('career-jobs')
                        }}
                      >
                        Cancel
                      </button>
                    ) : null}
                    <button type="submit">{editingJobSlug ? 'Update Job' : 'Publish Job'}</button>
                  </div>
                </div>

                {status.message ? (
                  <p className={`auth-status ${status.type === 'success' ? 'is-success' : 'is-error'}`}>
                    {status.message}
                  </p>
                ) : null}

                <div className="admin-form-grid">
                  {[
                    ['title', 'Job Title'],
                    ['department', 'Department'],
                    ['location', 'Location'],
                    ['type', 'Job Type'],
                    ['experience', 'Experience'],
                  ].map(([field, label]) => (
                    <label key={field}>
                      <span>{label}</span>
                      <input
                        value={jobForm[field]}
                        onChange={(event) => updateJobField(field, event.target.value)}
                        required={['title', 'department', 'location'].includes(field)}
                      />
                    </label>
                  ))}
                  <label className="admin-wide-field">
                    <span>Job Summary</span>
                    <textarea
                      value={jobForm.summary}
                      onChange={(event) => updateJobField('summary', event.target.value)}
                      required
                    />
                  </label>
                </div>
              </form>

              <div className="admin-policy-editor">
                <div className="admin-editor-head">
                  <div>
                    <span>Published</span>
                    <h2>Posted Jobs</h2>
                  </div>
                </div>
                <div className="admin-job-list">
                  {postedJobs.length ? postedJobs.map((job) => (
                    <article key={job.slug}>
                      <div>
                        <h3>{job.title}</h3>
                        <p>{job.department} / {job.location} / {job.type}</p>
                      </div>
                      <a href={`/career/apply/${job.slug}`}>View</a>
                      <button type="button" onClick={() => deleteJobPost(job.slug)}>Delete</button>
                    </article>
                  )) : <div className="admin-empty-state">No admin job posts yet.</div>}
                </div>
              </div>
            </section>
          ) : activeMenu === 'applied-candidates' ? (
            <section className="admin-policy-editor">
              <div className="admin-editor-head">
                <div>
                  <span>Recruiter</span>
                  <h2>Applied Candidates</h2>
                </div>
                <div className="admin-editor-actions">
                  <button type="button" onClick={downloadApplicationsCsv}>Download All</button>
                  <button type="button" onClick={deleteSelectedApplications} disabled={!selectedApplicationIds.length}>Delete Selected</button>
                  <button type="button" onClick={deleteAllApplications} disabled={!applications.length}>Delete All</button>
                </div>
              </div>

              {status.message ? (
                <p className={`auth-status ${status.type === 'success' ? 'is-success' : 'is-error'}`}>
                  {status.message}
                </p>
              ) : null}

              <div className="admin-table-wrap">
                <table className="admin-applications-table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={areVisibleApplicationsSelected}
                          onChange={toggleVisibleApplications}
                        />
                      </th>
                      <th>Candidate</th>
                      <th>Job</th>
                      <th>Contact</th>
                      <th>Experience</th>
                      <th>Notice</th>
                      <th>Resume</th>
                      <th>Message</th>
                      <th>Submitted</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleApplications.length ? visibleApplications.map((application) => (
                      <tr key={application.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedApplicationIds.includes(application.id)}
                            onChange={() => toggleApplicationSelection(application.id)}
                          />
                        </td>
                        <td>{application.candidate?.name || '-'}</td>
                        <td>{application.title || '-'}<br />{application.department || '-'} / {application.location || '-'}</td>
                        <td>{application.candidate?.email || '-'}<br />{application.candidate?.phone || '-'}</td>
                        <td>{application.candidate?.experience || '-'}</td>
                        <td>{application.candidate?.noticePeriod || '-'}</td>
                        <td>
                          {application.resume?.name ? (
                            <>
                              <span>{application.resume.name}</span>
                              <button type="button" onClick={() => openApplicationResume(application)}>View</button>
                              <button type="button" onClick={() => openApplicationResume(application, 'download')}>Download</button>
                            </>
                          ) : '-'}
                        </td>
                        <td>{application.candidate?.message || '-'}</td>
                        <td>{application.createdAt ? new Date(application.createdAt).toLocaleString() : '-'}</td>
                        <td>
                          <button type="button" onClick={() => deleteApplication(application.id)}>Delete</button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="10">No applied candidates yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          ) : activeMenu === 'contracts' ? (
            <section className="admin-policy-editor">
              <div className="admin-editor-head">
                <div>
                  <span>Projects</span>
                  <h2>Project Management</h2>
                </div>
                <div className="admin-editor-actions">
                  <button type="button" onClick={downloadProjectsCsv}>Download All</button>
                  <button type="button" onClick={deleteSelectedContracts} disabled={!selectedContractIds.length}>Delete Selected</button>
                  <button type="button" onClick={deleteAllContracts} disabled={!contracts.length}>Delete All</button>
                  <button type="button" onClick={() => setActiveMenu('contract-send')}>Add Project</button>
                </div>
              </div>

              {status.message ? (
                <p className={`auth-status ${status.type === 'success' ? 'is-success' : 'is-error'}`}>
                  {status.message}
                </p>
              ) : null}

              <div className="admin-table-wrap">
                <table className="admin-applications-table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={areVisibleContractsSelected}
                          onChange={toggleVisibleContracts}
                        />
                      </th>
                      <th>Project</th>
                      <th>Client</th>
                      <th>Project Status</th>
                      <th>Contract Status</th>
                      <th>Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleContracts.length ? visibleContracts.map((contract) => {
                      const contractId = contract.signingToken || contract.slug
                      const usersStatus = contract.status === 'signed' || contract.signatureData ? 'signed' : 'pending'

                      return (
                        <tr key={contractId}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedContractIds.includes(contractId)}
                              onChange={() => toggleContractSelection(contractId)}
                            />
                          </td>
                          <td>{contract.title}</td>
                          <td>{contract.recipientName}<br />{contract.recipientEmail}</td>
                          <td>
                            <span className={`admin-status-pill is-${contract.projectStatus || 'active'}`}>
                              {projectStatusOptions.find(([value]) => value === (contract.projectStatus || 'active'))?.[1] || 'Active Project'}
                            </span>
                          </td>
                          <td>
                            <span className={`admin-status-pill is-${usersStatus}`}>
                              {usersStatus}
                            </span>
                          </td>
                          <td>{contract.createdAt ? new Date(contract.createdAt).toLocaleString() : '-'}</td>
                          <td>
                            <button type="button" onClick={() => viewContract(contract)}>
                              View
                            </button>
                            {contract.status === 'signed' ? (
                              <button type="button" onClick={() => downloadContractCopy(contract)}>
                                Download
                              </button>
                            ) : null}
                            <button type="button" onClick={() => editContract(contract)}>
                              Edit
                            </button>
                            <button type="button" onClick={() => deleteContract(contractId)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    }) : (
                      <tr>
                        <td colSpan="7">No projects added yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          ) : activeMenu === 'contract-send' ? (
            <section className="admin-career-panel">
              <form className="admin-policy-editor" onSubmit={sendContract}>
                <div className="admin-editor-head">
                  <div>
                    <span>Projects</span>
                    <h2>{editingContractId ? 'Edit Project' : 'Add Project'}</h2>
                  </div>
                  <div className="admin-editor-actions">
                    {editingContractId ? (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingContractId('')
                          setContractForm(emptyContractForm)
                          setActiveMenu('contracts')
                        }}
                      >
                        Cancel
                      </button>
                    ) : null}
                    <button type="submit">{editingContractId ? 'Update Project' : 'Save Project'}</button>
                  </div>
                </div>

                {status.message ? (
                  <p className={`auth-status ${status.type === 'success' ? 'is-success' : 'is-error'}`}>
                    {status.message}
                  </p>
                ) : null}

                <div className="admin-form-grid">
                  {[
                    ['title', 'Project Name', 'Website redesign'],
                    ['recipientName', 'Client Name', 'Client name'],
                    ['recipientEmail', 'Client Email', 'client@example.com'],
                    ['senderName', 'Project Owner', 'Cromgen Technology'],
                  ].map(([field, label, placeholder]) => (
                    <label key={field}>
                      <span>{label}</span>
                      <input
                        type={field === 'recipientEmail' ? 'email' : 'text'}
                        value={contractForm[field]}
                        placeholder={placeholder}
                        onChange={(event) => updateContractField(field, event.target.value)}
                        required={field !== 'senderName'}
                      />
                    </label>
                  ))}
                  <label>
                    <span>Project Status</span>
                    <select
                      value={contractForm.projectStatus}
                      onChange={(event) => updateContractField('projectStatus', event.target.value)}
                    >
                      {projectStatusOptions.map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </label>
                  <label className="admin-wide-field">
                    <span>Description</span>
                    <div className="project-description-toolbar" aria-label="Project description formatting tools">
                      <button type="button" onClick={() => formatProjectDescription('bold')}>B</button>
                      <button type="button" onClick={() => formatProjectDescription('italic')}>I</button>
                      <button type="button" onClick={() => formatProjectDescription('heading')}>H</button>
                      <button type="button" onClick={() => formatProjectDescription('numbered')}>1.</button>
                      <button type="button" onClick={() => formatProjectDescription('bullet')}>List</button>
                      <button type="button" onClick={() => formatProjectDescription('checklist')}>Task</button>
                      <button type="button" onClick={() => formatProjectDescription('link')}>Link</button>
                      <button type="button" onClick={() => formatProjectDescription('clear')}>Clear</button>
                    </div>
                    <textarea
                      id="project-description-editor"
                      value={contractForm.contractBody}
                      placeholder="Type project description, scope, notes, delivery details, or contract summary..."
                      onChange={(event) => updateContractField('contractBody', event.target.value)}
                      rows={8}
                    />
                    <small className="project-description-hint">
                      Supports bold, italic, headings, numbered lists, bullet lists, tasks, and links.
                    </small>
                  </label>
                  {contractForm.contractFile?.name ? (
                    <div className="admin-empty-state admin-wide-field">
                      Attached file: {contractForm.contractFile.name}
                    </div>
                  ) : null}
                </div>
              </form>

            </section>
          ) : activeMenu === 'services' ? (
            <section className="admin-policy-editor">
              <div className="admin-editor-head">
                <div>
                  <span>Services</span>
                  <h2>Service Management</h2>
                </div>
              </div>
              <div className="admin-service-management">
                <div>
                  {['Artificial Intelligence', 'Digital Marketing', 'Call Center', 'IT Services', 'Software Development', 'Telecommunications'].map((item) => (
                    <section key={item}>
                      <strong>{item}</strong>
                      <p>Enterprise service page active</p>
                    </section>
                  ))}
                </div>
              </div>
            </section>
          ) : activeMenu === 'leads' ? (
            <section className="admin-policy-editor">
              <div className="admin-editor-head">
                <div>
                  <span>Leads / Inquiries</span>
                  <h2>Enquiry Queue</h2>
                </div>
                <div className="admin-editor-actions">
                  <button type="button" onClick={downloadLeadsCsv}>Download All</button>
                  <button type="button" onClick={deleteSelectedLeads} disabled={!selectedLeadIds.length}>Delete Selected</button>
                  <button type="button" onClick={deleteAllLeads} disabled={!leads.length}>Delete All</button>
                </div>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-applications-table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={areVisibleLeadsSelected}
                          onChange={toggleVisibleLeads}
                        />
                      </th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Service</th>
                      <th>Query</th>
                      <th>Submitted</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleLeads.length ? visibleLeads.map((lead, index) => (
                      <tr key={`${lead.email}-${lead.createdAt}-${index}`}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedLeadIds.includes(lead.id)}
                            onChange={() => toggleLeadSelection(lead.id)}
                          />
                        </td>
                        <td>{lead.name}</td>
                        <td>{lead.email}</td>
                        <td>{lead.service}</td>
                        <td>{lead.query}</td>
                        <td>{lead.createdAt ? new Date(lead.createdAt).toLocaleString() : '-'}</td>
                        <td>
                          <button type="button" onClick={() => deleteLead(lead.id)}>Delete</button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="7">No leads submitted yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          ) : activeMenu === 'settings' ? (
            <section className="admin-settings">
              <div className="admin-policy-list">
                <h2>Settings</h2>
                <button
                  type="button"
                  className={activeSettingsTab === 'brand' ? 'is-active' : ''}
                  onClick={() => setActiveSettingsTab('brand')}
                >
                  Brand Logos
                </button>
                <button
                  type="button"
                  className={activeSettingsTab === 'social' ? 'is-active' : ''}
                  onClick={() => setActiveSettingsTab('social')}
                >
                  Social
                </button>
                <button
                  type="button"
                  className={activeSettingsTab === 'email' ? 'is-active' : ''}
                  onClick={() => setActiveSettingsTab('email')}
                >
                  Email Configured
                </button>
                <details className="admin-settings-drop" open={activeSettingsTab === 'policy'}>
                  <summary>Policy Pages</summary>
                  <div>
                    {policies.map((policy) => (
                      <button
                        key={policy.slug}
                        type="button"
                        className={activeSettingsTab === 'policy' && policy.slug === activeSlug ? 'is-active' : ''}
                        onClick={() => {
                          setActiveSettingsTab('policy')
                          setActiveSlug(policy.slug)
                        }}
                      >
                        {policy.title}
                      </button>
                    ))}
                  </div>
                </details>
              </div>

              {activeSettingsTab === 'brand' ? (
                <form className="admin-policy-editor" onSubmit={saveSiteSettings}>
                  <div className="admin-editor-head">
                    <div>
                      <span>Brand Assets</span>
                      <h2>Logo & Favicon</h2>
                    </div>
                    <button type="submit" disabled={!siteSettings}>Save Settings</button>
                  </div>

                  {status.message ? (
                    <p className={`auth-status ${status.type === 'success' ? 'is-success' : 'is-error'}`}>
                      {status.message}
                    </p>
                  ) : null}

                  {siteSettings ? (
                    <div className="admin-form-grid">
                      {[
                        ['topbarLogo', 'Top Bar Logo', 'topbarLogoSize'],
                        ['footerLogo', 'Footer Logo', 'footerLogoSize'],
                        ['faviconLogo', 'Favicon Logo', 'faviconLogoSize'],
                      ].map(([imageField, label, sizeField]) => (
                        <div key={imageField} className="admin-brand-row admin-wide-field">
                          <label className="admin-image-upload">
                            <span>{label}</span>
                            <input type="file" accept="image/*" onChange={(event) => handleSiteImageChange(imageField, event)} />
                          </label>
                          <label>
                            <span>Size</span>
                            <input
                              type="number"
                              min="16"
                              max="160"
                              value={siteSettings[sizeField] || ''}
                              onChange={(event) => updateSiteField(sizeField, event.target.value)}
                            />
                          </label>
                          {siteSettings[imageField] ? (
                            <div className="admin-logo-preview">
                              <img
                                src={siteSettings[imageField]}
                                alt={`${label} preview`}
                                style={{
                                  width: Number(siteSettings[sizeField]) || 48,
                                  height: Number(siteSettings[sizeField]) || 48,
                                }}
                              />
                            </div>
                          ) : (
                            <div className="admin-empty-state">Current default logo will show until you upload one.</div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="admin-empty-state">Loading site settings.</div>
                  )}
                </form>
              ) : activeSettingsTab === 'social' ? (
                <form className="admin-policy-editor" onSubmit={saveSiteSettings}>
                  <div className="admin-editor-head">
                    <div>
                      <span>Social</span>
                      <h2>Social Media Links</h2>
                    </div>
                    <div className="admin-editor-actions">
                      <button type="button" onClick={addSocialLink}>Add Link</button>
                      <button type="submit" disabled={!siteSettings}>Save Settings</button>
                    </div>
                  </div>

                  {status.message ? (
                    <p className={`auth-status ${status.type === 'success' ? 'is-success' : 'is-error'}`}>
                      {status.message}
                    </p>
                  ) : null}

                  {siteSettings ? (
                    <div className="admin-social-list">
                      {(siteSettings.socialLinks || []).map((link, index) => (
                        <div key={`${link.label}-${index}`} className="admin-section-row admin-social-row">
                          <input
                            placeholder="LinkedIn"
                            value={link.label || ''}
                            onChange={(event) => updateSocialLink(index, 'label', event.target.value)}
                          />
                          <input
                            placeholder="https://..."
                            value={link.url || ''}
                            onChange={(event) => updateSocialLink(index, 'url', event.target.value)}
                          />
                          <button type="button" onClick={() => removeSocialLink(index)}>Remove</button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="admin-empty-state">Loading social links.</div>
                  )}
                </form>
              ) : activeSettingsTab === 'email' ? (
                <form className="admin-policy-editor" onSubmit={saveSiteSettings}>
                  <div className="admin-editor-head">
                    <div>
                      <span>Email Configured</span>
                      <h2>SMTP Email Settings</h2>
                    </div>
                    <button type="submit" disabled={!siteSettings}>Save Email</button>
                  </div>

                  {status.message ? (
                    <p className={`auth-status ${status.type === 'success' ? 'is-success' : 'is-error'}`}>
                      {status.message}
                    </p>
                  ) : null}

                  {siteSettings ? (
                    <div className="admin-form-grid">
                      {[
                        ['smtpHost', 'SMTP Host', 'smtp.example.com'],
                        ['smtpPort', 'SMTP Port', '465'],
                        ['smtpUser', 'SMTP User', 'name@domain.com'],
                        ['smtpPass', 'SMTP Password', 'SMTP password'],
                        ['mailFrom', 'Mail From', 'name@domain.com'],
                        ['adminEmail', 'Admin Notification Email', 'admin@domain.com'],
                      ].map(([field, label, placeholder]) => (
                        <label key={field}>
                          <span>{label}</span>
                          <input
                            type={field === 'smtpPass' ? 'password' : field === 'smtpPort' ? 'number' : 'text'}
                            value={siteSettings.emailConfig?.[field] || ''}
                            placeholder={placeholder}
                            onChange={(event) => updateEmailConfigField(field, event.target.value)}
                          />
                        </label>
                      ))}
                      <div className="admin-empty-state admin-wide-field">
                        Enter your SMTP provider details. Saved values stay here and can be edited anytime.
                      </div>
                    </div>
                  ) : (
                    <div className="admin-empty-state">Loading email settings.</div>
                  )}
                </form>
              ) : (
              <form className="admin-policy-editor" onSubmit={savePolicy}>
                <div className="admin-editor-head">
                  <div>
                    <span>Settings</span>
                    <h2>{activePolicy?.title || 'Policy Page'}</h2>
                  </div>
                  <button type="submit" disabled={!formData}>Save Policy</button>
                </div>

                {status.message ? (
                  <p className={`auth-status ${status.type === 'success' ? 'is-success' : 'is-error'}`}>
                    {status.message}
                  </p>
                ) : null}

                {formData ? (
                  <>
                    <div className="admin-form-grid">
                      <label>
                        <span>Title</span>
                        <input value={formData.title || ''} onChange={(event) => updateField('title', event.target.value)} />
                      </label>
                      <label>
                        <span>Updated</span>
                        <input value={formData.updated || ''} onChange={(event) => updateField('updated', event.target.value)} />
                      </label>
                      <label className="admin-wide-field admin-image-upload">
                        <span>Upload Image</span>
                        <input type="file" accept="image/*" onChange={handleImageFileChange} />
                      </label>
                      {formData.image ? (
                        <div className="admin-image-preview admin-wide-field">
                          <img src={formData.image} alt={`${formData.title || 'Policy'} preview`} />
                          <div>
                            <span>Preview</span>
                            <strong>This image will appear on the public page after saving.</strong>
                          </div>
                        </div>
                      ) : null}
                      <label className="admin-wide-field">
                        <span>Summary</span>
                        <textarea value={formData.summary || ''} onChange={(event) => updateField('summary', event.target.value)} />
                      </label>
                    </div>

                    <div className="admin-editor-section">
                      <div>
                        <h3>Highlights</h3>
                        <button type="button" onClick={addHighlight}>Add Highlight</button>
                      </div>
                      {(formData.highlights || []).map((highlight, index) => (
                        <input
                          key={`${highlight}-${index}`}
                          value={highlight}
                          onChange={(event) => updateHighlight(index, event.target.value)}
                        />
                      ))}
                    </div>

                    <div className="admin-editor-section">
                      <div>
                        <h3>Policy Content</h3>
                        <button type="button" onClick={addSection}>Add Section</button>
                      </div>
                      {(formData.sections || []).map(([title, copy], index) => (
                        <div key={`${title}-${index}`} className="admin-section-row">
                          <input value={title} onChange={(event) => updateSection(index, 0, event.target.value)} />
                          <textarea value={copy} onChange={(event) => updateSection(index, 1, event.target.value)} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="admin-empty-state">Select a policy page to edit.</div>
                )}
              </form>
              )}
            </section>
          ) : (
            <section className="admin-overview">
              <div className="admin-overview-head">
                <div>
                  <span>Command Center</span>
                  <h2>Enterprise SaaS dashboard</h2>
                  <p>Manage AI, digital marketing, call center, IT, software development, HR consulting, and telecom operations from one control panel.</p>
                </div>
                <button type="button" onClick={() => setActiveMenu('contract-send')}>Add Project</button>
              </div>
              {[
                ['Total Users', `${applications.length + leads.length + 1} profiles`, 'CRM Network'],
                ['Total Leads / Inquiries', `${leads.length} active enquiries`, 'Sales Pipeline'],
                ['Live Projects', `${contracts.filter((contract) => contract.projectStatus === 'live').length} live`, 'Delivery'],
                ['Active Projects', `${contracts.filter((contract) => (contract.projectStatus || 'active') === 'active').length} active`, 'Delivery'],
                ['Inactive Projects', `${contracts.filter((contract) => contract.projectStatus === 'inactive').length} inactive`, 'Delivery'],
                ['Closed Projects', `${contracts.filter((contract) => contract.projectStatus === 'closed').length} closed`, 'Operations'],
                ['Completed Tasks', `${contracts.filter((contract) => contract.status === 'signed').length} completed`, 'Operations'],
                ['Revenue/Reports', '75.5% target', 'Executive View'],
              ].map(([title, copy, meta]) => (
                <article key={title}>
                  <span>{meta}</span>
                  <h2>{title}</h2>
                  <p>{copy}</p>
                </article>
              ))}
              <article className="admin-chart-card">
                <div>
                  <span>Monthly Flow</span>
                  <h2>Service Pipeline</h2>
                </div>
                <div className="admin-bars" aria-label="Monthly activity chart">
                  {[42, 76, 51, 68, 48, 57, 72, 38, 62, 80, 66, 45].map((height, index) => (
                    <span key={index} style={{ '--bar-height': `${height}%` }}></span>
                  ))}
                </div>
              </article>
              <article className="admin-target-card">
                <div>
                  <span>Monthly Target</span>
                  <h2>75.5%</h2>
                  <p>Admin activity is higher than last month. Keep service delivery moving.</p>
                </div>
              </article>
              <article className="admin-dashboard-table">
                <div className="admin-section-title">
                  <div>
                    <span>Leads / Inquiries</span>
                    <h2>Latest requests</h2>
                  </div>
                  <button type="button" onClick={() => setActiveMenu('leads')}>View All</button>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Service</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(visibleLeads.slice(0, 4).length ? visibleLeads.slice(0, 4) : [{ name: 'No inquiry yet', service: '-', id: '' }]).map((lead, index) => (
                      <tr key={`${lead.id || lead.name}-${index}`}>
                        <td>{lead.name}</td>
                        <td>{lead.service || '-'}</td>
                        <td><span className="admin-status-badge is-pending">Pending</span></td>
                        <td>
                          <button type="button" onClick={() => setActiveMenu('leads')}>View</button>
                          <button type="button" onClick={() => setActiveMenu('leads')}>Edit</button>
                          {lead.id ? <button type="button" onClick={() => deleteLead(lead.id)}>Delete</button> : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="admin-pagination-ui">
                  <button type="button">Prev</button>
                  <span>Page 1 of 1</span>
                  <button type="button">Next</button>
                </div>
              </article>
              <article className="admin-service-management">
                <div className="admin-section-title">
                  <div>
                    <span>Services</span>
                    <h2>Service management</h2>
                  </div>
                  <button type="button" onClick={() => setActiveMenu('services')}>Manage</button>
                </div>
                <div>
                  {['Artificial Intelligence', 'Digital Marketing', 'Call Center', 'IT Services', 'Software Development', 'Telecommunications'].map((item) => (
                    <section key={item}>
                      <strong>{item}</strong>
                      <p>Enterprise service page active</p>
                    </section>
                  ))}
                </div>
              </article>
              <article className="admin-project-status">
                <div className="admin-section-title">
                  <div>
                    <span>Projects</span>
                    <h2>Project status overview</h2>
                  </div>
                  <button type="button" onClick={() => setActiveMenu('contracts')}>Open</button>
                </div>
                {[
                  ['Discovery', '32%'],
                  ['In progress', '58%'],
                  ['Review', '44%'],
                  ['Completed', '76%'],
                ].map(([label, width]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <i><b style={{ width }}></b></i>
                    <strong>{width}</strong>
                  </div>
                ))}
              </article>
              <article className="admin-activity-timeline">
                <div className="admin-section-title">
                  <div>
                    <span>Activity</span>
                    <h2>Activity timeline</h2>
                  </div>
                </div>
                {[
                  ['New enquiry captured', `${leads.length} leads in queue`],
                  ['Contracts monitored', `${contracts.length} total agreements`],
                  ['Recruiter pipeline updated', `${applications.length} candidates applied`],
                  ['Service dashboard synced', 'Auto refresh enabled'],
                ].map(([title, copy]) => (
                  <div key={title}>
                    <i></i>
                    <section>
                      <strong>{title}</strong>
                      <p>{copy}</p>
                    </section>
                  </div>
                ))}
              </article>
            </section>
          )}
        </div>
      </section>
    </main>
  )
}

function createAdminSignedHtml(contract, fileUrl = '', docxHtml = '') {
  const placements = contract.signaturePlacements || []
  const printableBody = docxHtml ? extractAdminHtmlBody(docxHtml) : ''
  const placementHtml = placements.map((placement) => `
    <div style="position:absolute;left:${placement.x}%;top:${placement.y}%;transform:translate(-50%,-50%);min-width:140px;text-align:center">
      ${placement.image ? `<img src="${placement.image}" style="max-width:160px;max-height:70px;display:block;margin:auto">` : `<strong style="font-family:'Brush Script MT','Segoe Script',cursive;font-size:24px">${placement.label || ''}</strong>`}
    </div>
  `).join('')

  return `
    <html>
      <head>
        <title>${contract.slug || 'signed-contract'}.pdf</title>
        <style>
          @page { size: A4; margin: 18mm; }
          * { box-sizing: border-box; }
          body { margin: 0; font-family: Arial, sans-serif; line-height: 1.65; color: #101828; }
          h1, h2, h3 { line-height: 1.25; }
          .print-head { margin-bottom: 18px; border-bottom: 1px solid #d0d5dd; padding-bottom: 14px; }
          .print-head h1 { margin: 0 0 8px; font-size: 24px; }
          .print-head p { margin: 2px 0; font-size: 12px; color: #475467; }
          .contract-print-body { position: relative; min-height: 920px; background: #fff; }
          .contract-print-body img { max-width: 100%; height: auto; }
          .contract-print-body table { width: 100%; border-collapse: collapse; }
          .contract-print-body td, .contract-print-body th { border: 1px solid #d0d5dd; padding: 8px; vertical-align: top; }
          .contract-print-overlay { position: absolute; inset: 0; pointer-events: none; }
          .signature-summary { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; break-inside: avoid; margin-top: 28px; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .contract-print-body { min-height: auto; }
          }
        </style>
      </head>
      <body>
        <div class="print-head">
          <h1>${escapeAdminHtmlText(contract.title || 'Signed Contract')}</h1>
          <p><strong>Date:</strong> ${escapeAdminHtmlText(contract.contractDate || '')}</p>
          <p><strong>Timestamp:</strong> ${escapeAdminHtmlText(contract.contractTimestamp || contract.signedAt || '')}</p>
        </div>
        <div class="contract-print-body">
          ${printableBody || (fileUrl ? `<iframe src="${fileUrl}" style="width:100%;height:920px;border:0;background:#fff"></iframe>` : '')}
          <div class="contract-print-overlay">${placementHtml}</div>
        </div>
        <div class="signature-summary">
          <div><h3>1st Party Signature</h3>${contract.companySignatureData ? `<img src="${contract.companySignatureData}" style="max-width:260px">` : ''}<p>${contract.companySignatureName || ''}</p></div>
          <div><h3>2nd Party Signature</h3>${contract.signatureData ? `<img src="${contract.signatureData}" style="max-width:260px">` : ''}<p>${contract.signatureName || ''}</p></div>
        </div>
      </body>
    </html>
  `
}

function extractAdminHtmlBody(value) {
  const html = String(value || '')
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  return bodyMatch ? bodyMatch[1] : html
}

function escapeAdminHtmlText(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function openAdminPdfPrintWindow(html, fileName) {
  const printWindow = window.open('', '_blank', 'width=900,height=1100')
  if (!printWindow) return

  const printableHtml = html.replace('</head>', `<title>${fileName}.pdf</title></head>`)
  printWindow.document.open()
  printWindow.document.write(`<!doctype html>${printableHtml}`)
  printWindow.document.close()

  const printWhenReady = () => {
    printWindow.focus()
    printWindow.print()
  }

  if (printWindow.document.readyState === 'complete') {
    window.setTimeout(printWhenReady, 250)
  } else {
    printWindow.addEventListener('load', () => window.setTimeout(printWhenReady, 250), { once: true })
  }
}
