import { getDB } from '../config/db.js'

export async function findJobPosts() {
  const jobs = await collection()
    .find({}, { projection: { _id: 0 } })
    .sort({ createdAt: -1 })
    .toArray()

  return jobs.map(normalizeJobPost)
}

export async function createJobPost(fields) {
  const job = normalizeJobPost({
    ...sanitizeJobPostFields(fields),
    slug: createSlug(fields.title),
    image: '',
    responsibilities: ['Review role requirements', 'Coordinate with Cromgen teams', 'Deliver assigned responsibilities'],
    createdAt: new Date(),
  })

  await collection().insertOne(job)
  return job
}

export async function deleteJobPostBySlug(slug) {
  const result = await collection().deleteOne({ slug })
  return result.deletedCount > 0
}

export async function deleteAllJobPosts() {
  const result = await collection().deleteMany({})
  return result.deletedCount
}

export async function updateJobPostBySlug(slug, fields) {
  const existing = await collection().findOne({ slug })
  if (!existing) return null

  const job = normalizeJobPost({
    ...existing,
    ...sanitizeJobPostFields(fields),
    slug,
  })

  await collection().updateOne({ slug }, { $set: job })
  return job
}

export function normalizeJobPost(job) {
  return {
    slug: String(job.slug || '').trim(),
    title: String(job.title || '').trim(),
    department: String(job.department || '').trim(),
    location: String(job.location || '').trim(),
    type: String(job.type || 'Full Time').trim(),
    experience: String(job.experience || '').trim(),
    summary: String(job.summary || '').trim(),
    image: String(job.image || '').trim(),
    responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.map(String) : [],
    createdAt: job.createdAt ? new Date(job.createdAt).toISOString() : new Date().toISOString(),
  }
}

function sanitizeJobPostFields(body) {
  return {
    title: String(body.title || '').trim(),
    department: String(body.department || '').trim(),
    location: String(body.location || '').trim(),
    type: String(body.type || 'Full Time').trim(),
    experience: String(body.experience || '').trim(),
    summary: String(body.summary || '').trim(),
  }
}

function createSlug(title) {
  const base = String(title || 'job')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `${base || 'job'}-${Date.now()}`
}

function collection() {
  return getDB().collection('jobPosts')
}
