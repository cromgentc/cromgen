import { requireRole } from '../middleware/auth.js'
import {
  createJobPost,
  deleteAllJobPosts,
  deleteJobPostBySlug,
  findJobPosts,
  updateJobPostBySlug,
} from '../models/JobPost.js'
import { json, notFound, readJson, validationError } from '../utils/http.js'

const settingsAuth = requireRole(['admin', 'staff'])

export async function listPublicJobPosts() {
  return json(200, {
    jobs: await findJobPosts(),
  })
}

export async function listSettingJobPosts(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  return json(200, {
    jobs: await findJobPosts(),
  })
}

export async function createSettingJobPost(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const body = await readJson(request)

  if (!body.title || !body.department || !body.location || !body.summary) {
    return validationError('Title, department, location, and summary are required')
  }

  const job = await createJobPost(body)

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

  const job = await updateJobPostBySlug(slug, body)
  if (!job) return notFound('Job post not found')

  return json(200, {
    ok: true,
    message: 'Job post updated',
    job,
  })
}

export async function deleteSettingJobPost(request, { slug }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const deleted = await deleteJobPostBySlug(slug)
  if (!deleted) return notFound('Job post not found')

  return json(200, {
    ok: true,
    message: 'Job post deleted',
  })
}

export async function deleteAllSettingJobPosts(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const deletedCount = await deleteAllJobPosts()

  return json(200, {
    ok: true,
    message: 'All job posts deleted',
    deletedCount,
  })
}
