import { requireRole } from '../middleware/auth.js'
import { createWorkforceRecord, recordActivityLog } from '../models/WorkforceRecord.js'
import {
  createProject,
  deleteProjectById,
  findProjectById,
  findPublicProjectById,
  findPublicProjects,
  findProjects,
  findProjectsCreatedBy,
  updateProjectById,
} from '../models/Project.js'
import { forbidden, json, notFound, readJson, validationError } from '../utils/http.js'

const settingsAuth = requireRole(['admin', 'staff'])
const projectApplyAuth = requireRole(['admin', 'staff', 'user', 'vendor'])

export async function listPublicProjects() {
  return json(200, {
    ok: true,
    projects: await findPublicProjects(),
  })
}

export async function applyPublicProject(request, { id }) {
  const auth = projectApplyAuth(request)
  if (auth.error) return auth.error

  const project = await findPublicProjectById(id)
  if (!project) return notFound('Project not found')

  const body = await readJson(request).catch(() => ({}))
  const applicantName = String(body.applicantName || auth.payload?.email || auth.payload?.sub || 'Applicant').trim()
  const applicantEmail = String(body.applicantEmail || auth.payload?.email || '').trim().toLowerCase()
  const applicantRole = String(auth.payload?.role || '').trim().toLowerCase()
  const task = await createWorkforceRecord('tasks', {
    name: `Apply - ${project.title}`,
    project: project.title,
    assignee: applicantEmail || applicantName,
    priority: project.projectPriority || 'Medium',
    status: 'Open',
    deadline: project.dueDate || '',
    notes: [
      `Applied from Outsource Project page.`,
      `Applicant role: ${applicantRole || 'user'}.`,
      applicantName ? `Applicant: ${applicantName}.` : '',
      applicantEmail ? `Email: ${applicantEmail}.` : '',
    ].filter(Boolean).join(' '),
    createdBy: auth.payload?.sub || '',
    applicantRole,
    applicantEmail,
    sourceProjectId: project.id,
  })

  return json(201, {
    ok: true,
    message: 'Project application added to Task Management',
    task,
  })
}

export async function listSettingProjects(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  return json(200, {
    ok: true,
    projects: auth.payload?.role === 'staff' ? await findProjectsCreatedBy(auth.payload.sub) : await findProjects(),
  })
}

export async function createSettingProject(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const body = await readJson(request)
  if (!body.title) return validationError('Project name is required')

  const project = await createProject({
    ...body,
    createdBy: auth.payload?.role === 'staff' ? auth.payload.sub : body.createdBy,
  })
  await recordActivityLog({
    actor: auth.payload,
    action: 'Created project',
    category: 'Admin',
    targetType: 'projects',
    targetName: project.title,
    targetId: project.id,
  })

  return json(201, {
    ok: true,
    message: 'Project created successfully',
    project,
  })
}

export async function updateSettingProject(request, { id }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const body = await readJson(request)
  if (!body.title) return validationError('Project name is required')

  if (auth.payload?.role === 'staff') {
    const project = await findProjectById(id)
    if (!project || project.createdBy !== auth.payload.sub) {
      return forbidden('You can only update projects created by you')
    }
  }

  const project = await updateProjectById(id, {
    ...body,
    createdBy: auth.payload?.role === 'staff' ? auth.payload.sub : body.createdBy,
  })
  if (!project) return notFound('Project not found')
  await recordActivityLog({
    actor: auth.payload,
    action: 'Updated project',
    category: 'Admin',
    targetType: 'projects',
    targetName: project.title,
    targetId: project.id || id,
  })

  return json(200, {
    ok: true,
    message: 'Project updated successfully',
    project,
  })
}

export async function deleteSettingProject(request, { id }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  if (auth.payload?.role === 'staff') {
    const project = await findProjectById(id)
    if (!project || project.createdBy !== auth.payload.sub) {
      return forbidden('You can only delete projects created by you')
    }
  }

  const existing = await findProjectById(id)
  const deleted = await deleteProjectById(id)
  if (!deleted) return notFound('Project not found')
  await recordActivityLog({
    actor: auth.payload,
    action: 'Deleted project',
    category: 'Admin',
    severity: 'Medium',
    targetType: 'projects',
    targetName: existing?.title || '',
    targetId: id,
  })

  return json(200, {
    ok: true,
    message: 'Project deleted successfully',
  })
}
