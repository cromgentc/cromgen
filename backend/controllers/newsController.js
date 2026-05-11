import { requireRole } from '../middleware/auth.js'
import { createNewsPost, deleteNewsPostBySlug, findNewsPosts } from '../models/NewsPost.js'
import { json, notFound, readJson, validationError } from '../utils/http.js'

const settingsAuth = requireRole(['admin', 'staff'])

export async function listPublicNewsPosts() {
  return json(200, {
    posts: await findNewsPosts(),
  })
}

export async function listSettingNewsPosts(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  return json(200, {
    posts: await findNewsPosts(),
  })
}

export async function createSettingNewsPost(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const body = await readJson(request)

  if (!body.title || !body.summary) {
    return validationError('Title and summary are required')
  }

  const post = await createNewsPost(body)

  return json(201, {
    ok: true,
    message: 'News post published',
    post,
  })
}

export async function deleteSettingNewsPost(request, { slug }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const deleted = await deleteNewsPostBySlug(slug)
  if (!deleted) return notFound('News post not found')

  return json(200, {
    ok: true,
    message: 'News post deleted',
  })
}
