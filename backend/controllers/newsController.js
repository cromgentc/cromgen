import { requireRole } from '../middleware/auth.js'
import { createNewsPost, deleteNewsPostBySlug, findNewsPostBySlug, findNewsPosts, updateNewsPostBySlug } from '../models/NewsPost.js'
import { json, notFound, readJson, validationError } from '../utils/http.js'

const settingsAuth = requireRole(['admin', 'staff'])

export async function listPublicNewsPosts() {
  const posts = await findNewsPosts()

  return json(200, {
    ok: true,
    source: 'mongodb',
    count: posts.length,
    posts,
  })
}

export async function getPublicNewsPost(request, { slug }) {
  const post = await findNewsPostBySlug(slug)
  if (!post) return notFound('News post not found')

  return json(200, {
    ok: true,
    source: 'mongodb',
    post,
  })
}

export async function createPublicNewsPost(request) {
  const body = await readJson(request)

  if (!body.title || !body.summary) {
    return validationError('Title and summary are required')
  }

  const post = await createNewsPost(body)

  return json(201, {
    ok: true,
    source: 'mongodb',
    message: 'News post saved to MongoDB',
    post,
  })
}

export async function listSettingNewsPosts(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const posts = await findNewsPosts()

  return json(200, {
    ok: true,
    source: 'mongodb',
    count: posts.length,
    posts,
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

export async function updateSettingNewsPost(request, { slug }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const body = await readJson(request)

  if (!body.title || !body.summary) {
    return validationError('Title and summary are required')
  }

  const post = await updateNewsPostBySlug(slug, body)
  if (!post) return notFound('News post not found')

  return json(200, {
    ok: true,
    message: 'News post updated',
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
