import { ObjectId } from 'mongodb'
import { getDB } from '../config/db.js'

const defaultOutsourceProjects = [
  {
    title: 'AI Automation Project',
    department: 'Artificial Intelligence',
    location: 'Remote Delivery',
    projectType: 'Outsource',
    experience: 'Business workflow',
    imageKey: 'ai',
    publicSummary:
      'Outsource chatbot, CRM automation, reporting assistant, and internal workflow automation projects to Cromgen delivery teams.',
  },
  {
    title: 'Digital Growth Project',
    department: 'Digital Marketing',
    location: 'Remote / Hybrid',
    projectType: 'Outsource',
    experience: 'Campaign support',
    imageKey: 'software',
    publicSummary:
      'Outsource SEO, paid ads, social media, landing page, content, and monthly performance reporting work for business growth.',
  },
  {
    title: 'Customer Support Project',
    department: 'Call Center',
    location: 'Office / Remote',
    projectType: 'Outsource',
    experience: 'Inbound / Outbound',
    imageKey: 'recruitment',
    publicSummary:
      'Outsource inbound support, outbound calling, lead qualification, appointment setting, helpdesk, and customer follow-up workflows.',
  },
  {
    title: 'Software Development Project',
    department: 'Software Development',
    location: 'Remote Delivery',
    projectType: 'Outsource',
    experience: 'Web / App / Dashboard',
    imageKey: 'software',
    publicSummary:
      'Outsource websites, dashboards, admin panels, portals, CRM tools, integrations, and custom business application development.',
  },
  {
    title: 'HR Recruitment Project',
    department: 'HR Consultant',
    location: 'Remote / Office',
    projectType: 'Outsource',
    experience: 'Hiring pipeline',
    imageKey: 'hr',
    publicSummary:
      'Outsource recruitment, screening, interview coordination, onboarding documentation, workforce planning, and HR process support.',
  },
  {
    title: 'IT & Telecom Project',
    department: 'IT / Telecommunications',
    location: 'Remote / On-site',
    projectType: 'Outsource',
    experience: 'Infrastructure support',
    imageKey: 'it',
    publicSummary:
      'Outsource managed IT, network support, email administration, cloud telephony, IVR setup, PBX, SIP trunking, and monitoring work.',
  },
]

export async function findProjects() {
  const projects = await collection()
    .find({})
    .sort({ createdAt: -1 })
    .toArray()

  return projects.map(normalizeProject)
}

export async function findProjectsCreatedBy(userId) {
  const projects = await collection()
    .find({ createdBy: String(userId || '') })
    .sort({ createdAt: -1 })
    .toArray()

  return projects.map(normalizeProject)
}

export async function findPublicProjects() {
  await ensureDefaultOutsourceProjects()

  const projects = await collection()
    .find({ projectStatus: { $ne: 'closed' } })
    .sort({ createdAt: -1 })
    .toArray()

  return projects.map(normalizePublicProject)
}

export async function findProjectById(id) {
  if (!ObjectId.isValid(id)) return null
  const project = await collection().findOne({ _id: new ObjectId(id) })
  return project ? normalizeProject(project) : null
}

export async function createProject(fields) {
  const now = new Date()
  const project = {
    ...sanitizeProjectFields(fields),
    createdAt: now,
    updatedAt: now,
  }

  const result = await collection().insertOne(project)
  return normalizeProject({ ...project, _id: result.insertedId })
}

export async function updateProjectById(id, fields) {
  if (!ObjectId.isValid(id)) return null

  const sanitizedFields = sanitizeProjectFields(fields)
  await collection().updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...sanitizedFields,
        updatedAt: new Date(),
      },
    },
  )

  return findProjectById(id)
}

export async function deleteProjectById(id) {
  if (!ObjectId.isValid(id)) return false
  const result = await collection().deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount > 0
}

export function normalizeProject(project = {}) {
  return {
    id: String(project._id || project.id || ''),
    title: String(project.title || '').trim(),
    senderName: String(project.senderName || 'Cromgen Technology').trim(),
    projectStatus: String(project.projectStatus || 'active').trim(),
    projectPriority: String(project.projectPriority || 'Medium').trim(),
    startDate: String(project.startDate || '').trim(),
    dueDate: String(project.dueDate || '').trim(),
    budget: String(project.budget || '').trim(),
    googleDocUrl: String(project.googleDocUrl || '').trim(),
    assignedUserEmail: String(project.assignedUserEmail || project.email || '').trim().toLowerCase(),
    contractBody: String(project.contractBody || '').trim(),
    createdBy: String(project.createdBy || '').trim(),
    createdAt: project.createdAt ? new Date(project.createdAt).toISOString() : '',
    updatedAt: project.updatedAt ? new Date(project.updatedAt).toISOString() : '',
  }
}

export function normalizePublicProject(project = {}) {
  const inferredProject = inferPublicProjectMeta(project)

  return {
    id: String(project._id || project.id || ''),
    title: String(project.title || '').trim(),
    department: String(project.department || inferredProject.department).trim(),
    location: String(project.location || inferredProject.location).trim(),
    projectType: String(project.projectType || inferredProject.projectType).trim(),
    experience: String(project.experience || inferredProject.experience).trim(),
    imageKey: String(project.imageKey || inferredProject.imageKey).trim(),
    publicSummary: String(project.publicSummary || project.contractBody || '').trim(),
    projectStatus: String(project.projectStatus || 'active').trim(),
    createdAt: project.createdAt ? new Date(project.createdAt).toISOString() : '',
  }
}

function inferPublicProjectMeta(project = {}) {
  const text = `${project.title || ''} ${project.contractBody || ''}`.toLowerCase()

  if (text.includes('recording') || text.includes('audio')) {
    return {
      department: 'Audio Recording',
      location: 'Remote / Studio',
      projectType: 'Recording Project',
      experience: 'Voice / Data Collection',
      imageKey: 'recruitment',
    }
  }

  if (text.includes('video')) {
    return {
      department: 'Video Collection',
      location: 'Remote / Studio',
      projectType: 'Video Project',
      experience: 'Video Data Collection',
      imageKey: 'software',
    }
  }

  return {
    department: 'Project Management',
    location: 'Cromgen Admin Post',
    projectType: 'Outsource',
    experience: 'Outsource Project',
    imageKey: '',
  }
}

async function ensureDefaultOutsourceProjects() {
  const now = new Date()
  const titles = defaultOutsourceProjects.map((project) => project.title)
  const existingProjects = await collection()
    .find({ title: { $in: titles } }, { projection: { title: 1 } })
    .toArray()
  const existingTitles = new Set(existingProjects.map((project) => String(project.title || '').trim()))
  const missingProjects = defaultOutsourceProjects
    .filter((project) => !existingTitles.has(project.title))
    .map((project) => ({
      ...project,
      senderName: 'Cromgen Technology',
      projectStatus: 'active',
      projectPriority: 'Medium',
      startDate: '',
      dueDate: '',
      budget: '',
      googleDocUrl: '',
      assignedUserEmail: '',
      contractBody: project.publicSummary,
      createdBy: 'system',
      createdAt: now,
      updatedAt: now,
    }))

  if (missingProjects.length) {
    await collection().insertMany(missingProjects)
  }
}

function sanitizeProjectFields(body = {}) {
  const budget = String(body.budget || '')
    .replace(/[^\d.]/g, '')
    .replace(/(\..*)\./g, '$1')

  return {
    title: String(body.title || '').trim(),
    senderName: String(body.senderName || 'Cromgen Technology').trim(),
    projectStatus: String(body.projectStatus || 'active').trim(),
    projectPriority: String(body.projectPriority || 'Medium').trim(),
    startDate: String(body.startDate || '').trim(),
    dueDate: String(body.dueDate || '').trim(),
    budget,
    googleDocUrl: String(body.googleDocUrl || '').trim(),
    assignedUserEmail: String(body.assignedUserEmail || body.email || '').trim().toLowerCase(),
    contractBody: String(body.contractBody || '').trim(),
    createdBy: String(body.createdBy || '').trim(),
  }
}

function collection() {
  return getDB().collection('projects')
}
