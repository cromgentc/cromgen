import { ObjectId } from 'mongodb'
import { getDB } from '../config/db.js'

export async function createApplication(fields) {
  const application = normalizeApplication({
    ...sanitizeApplicationFields(fields),
    createdAt: new Date(),
  })

  const result = await collection().insertOne(application)
  return normalizeApplication({ ...application, _id: result.insertedId })
}

export async function findApplications() {
  const applications = await collection()
    .find({})
    .sort({ createdAt: -1 })
    .toArray()

  return applications.map(normalizeApplication)
}

export async function findApplicationsCreatedBy(userId) {
  const applications = await collection()
    .find({ createdBy: String(userId || '') })
    .sort({ createdAt: -1 })
    .toArray()

  return applications.map(normalizeApplication)
}

export async function findApplicationById(id) {
  if (!ObjectId.isValid(id)) return null
  const application = await collection().findOne({ _id: new ObjectId(id) })
  return application ? normalizeApplication(application) : null
}

export async function updateApplicationById(id, fields) {
  if (!ObjectId.isValid(id)) return null

  const updateFields = sanitizeApplicationFields(fields)
  if (!Object.prototype.hasOwnProperty.call(fields, 'resume')) delete updateFields.resume

  await collection().updateOne(
    { _id: new ObjectId(id) },
    {
      $set: updateFields,
    },
  )

  return findApplicationById(id)
}

export async function deleteApplicationById(id) {
  if (!ObjectId.isValid(id)) return false
  const result = await collection().deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount > 0
}

export async function deleteAllApplications() {
  const result = await collection().deleteMany({})
  return result.deletedCount
}

export function normalizeApplication(application) {
  return {
    id: String(application._id || application.id || '').trim(),
    job: String(application.job || '').trim(),
    title: String(application.title || '').trim(),
    department: String(application.department || '').trim(),
    location: String(application.location || '').trim(),
    candidate: normalizeCandidate(application.candidate || {}),
    resume: normalizeResume(application.resume || {}),
    status: String(application.status || 'Submitted').trim(),
    createdBy: String(application.createdBy || '').trim(),
    createdAt: application.createdAt ? new Date(application.createdAt).toISOString() : new Date().toISOString(),
  }
}

function normalizeCandidate(candidate) {
  return {
    name: String(candidate.name || '').trim(),
    email: String(candidate.email || '').trim().toLowerCase(),
    phone: String(candidate.phone || '').trim(),
    experience: String(candidate.experience || '').trim(),
    portfolio: String(candidate.portfolio || '').trim(),
    noticePeriod: String(candidate.noticePeriod || '').trim(),
    message: String(candidate.message || '').trim(),
  }
}

function normalizeResume(resume) {
  return {
    name: String(resume.name || '').trim(),
    type: String(resume.type || '').trim(),
    data: String(resume.data || '').trim(),
  }
}

function sanitizeApplicationFields(body) {
  return {
    job: String(body.job || '').trim(),
    title: String(body.title || '').trim(),
    department: String(body.department || '').trim(),
    location: String(body.location || '').trim(),
    candidate: normalizeCandidate(body.candidate || {}),
    resume: normalizeResume(body.resume || {}),
    status: String(body.status || 'Submitted').trim(),
    createdBy: String(body.createdBy || '').trim(),
  }
}

function collection() {
  return getDB().collection('applications')
}
