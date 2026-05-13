import { requireRole } from '../middleware/auth.js'
import { recordActivityLog } from '../models/WorkforceRecord.js'
import {
  createJobPost,
  deleteAllJobPosts,
  deleteJobPostBySlug,
  findJobPosts,
  findJobPostsCreatedBy,
  updateJobPostBySlug,
} from '../models/JobPost.js'
import { forbidden, json, notFound, readJson, validationError } from '../utils/http.js'

const settingsAuth = requireRole(['admin', 'staff'])

export async function listPublicJobPosts() {
  return json(200, {
    jobs: (await findJobPosts()).map(stripJobOwner),
  })
}

export async function listSettingJobPosts(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  return json(200, {
    jobs: auth.payload?.role === 'staff' ? await findJobPostsCreatedBy(auth.payload.sub) : await findJobPosts(),
  })
}

export async function createSettingJobPost(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const body = await readJson(request)

  if (!body.title || !body.department || !body.location || !body.summary) {
    return validationError('Title, department, location, and summary are required')
  }

  const job = await createJobPost({
    ...body,
    createdBy: auth.payload?.role === 'staff' ? auth.payload.sub : body.createdBy,
  })
  await recordActivityLog({
    actor: auth.payload,
    action: 'Created job post',
    category: 'Content',
    targetType: 'jobs',
    targetName: job.title,
    targetId: job.slug,
  })

  return json(201, {
    ok: true,
    message: 'Job post published',
    job,
  })
}

export async function updateSettingJobPost(request, { slug }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const body = await readJson(request)

  if (!body.title || !body.department || !body.location || !body.summary) {
    return validationError('Title, department, location, and summary are required')
  }

  const existingJobs = auth.payload?.role === 'staff' ? await findJobPostsCreatedBy(auth.payload.sub) : null
  const existingJob = existingJobs?.find((job) => job.slug === slug)
  if (existingJobs && !existingJob) {
    return forbidden('You can only update job posts created by you')
  }

  const job = await updateJobPostBySlug(slug, {
    ...body,
    createdBy: auth.payload?.role === 'staff' ? auth.payload.sub : body.createdBy,
  })
  if (!job) return notFound('Job post not found')
  await recordActivityLog({
    actor: auth.payload,
    action: 'Updated job post',
    category: 'Content',
    targetType: 'jobs',
    targetName: job.title,
    targetId: job.slug || slug,
  })

  return json(200, {
    ok: true,
    message: 'Job post updated',
    job,
  })
}

export async function deleteSettingJobPost(request, { slug }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const existingJobs = auth.payload?.role === 'staff' ? await findJobPostsCreatedBy(auth.payload.sub) : null
  if (existingJobs && !existingJobs.some((job) => job.slug === slug)) {
    return forbidden('You can only delete job posts created by you')
  }

  const deleted = await deleteJobPostBySlug(slug)
  if (!deleted) return notFound('Job post not found')
  await recordActivityLog({
    actor: auth.payload,
    action: 'Deleted job post',
    category: 'Content',
    severity: 'Medium',
    targetType: 'jobs',
    targetId: slug,
  })

  return json(200, {
    ok: true,
    message: 'Job post deleted',
  })
}

export async function deleteAllSettingJobPosts(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error
  if (auth.payload?.role === 'staff') return forbidden('Staff cannot delete all job posts')

  const deletedCount = await deleteAllJobPosts()
  await recordActivityLog({
    actor: auth.payload,
    action: 'Deleted all job posts',
    category: 'Content',
    severity: 'High',
    targetType: 'jobs',
    notes: `Deleted count: ${deletedCount}`,
  })

  return json(200, {
    ok: true,
    message: 'All job posts deleted',
    deletedCount,
  })
}

function stripJobOwner(job) {
  const { createdBy: _createdBy, ...publicJob } = job
  return publicJob
}
