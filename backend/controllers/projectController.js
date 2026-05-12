import { requireRole } from '../middleware/auth.js'
import {
  createProject,
  deleteProjectById,
  findProjectById,
  findProjects,
  findProjectsCreatedBy,
  updateProjectById,
} from '../models/Project.js'
import { forbidden, json, notFound, readJson, validationError } from '../utils/http.js'

const settingsAuth = requireRole(['admin', 'staff'])

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

  const deleted = await deleteProjectById(id)
  if (!deleted) return notFound('Project not found')

  return json(200, {
    ok: true,
    message: 'Project deleted successfully',
  })
}
