import { ObjectId } from 'mongodb'
import { getDB } from '../config/db.js'

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
