import { getDB } from '../config/db.js'

export async function findNewsPosts() {
  const posts = await collection()
    .find({}, { projection: { _id: 0 } })
    .sort({ createdAt: -1 })
    .toArray()

  return posts.map(normalizeNewsPost)
}

export async function createNewsPost(fields) {
  const post = normalizeNewsPost({
    ...sanitizeNewsPostFields(fields),
    slug: createSlug(fields.title),
    createdAt: new Date(),
  })

  await collection().insertOne(post)
  return post
}

export async function deleteNewsPostBySlug(slug) {
  const result = await collection().deleteOne({ slug })
  return result.deletedCount > 0
}

export function normalizeNewsPost(post) {
  return {
    slug: String(post.slug || '').trim(),
    title: String(post.title || '').trim(),
    category: String(post.category || 'Company Update').trim(),
    summary: String(post.summary || '').trim(),
    image: String(post.image || '').trim(),
    date: String(post.date || 'Company Update').trim(),
    createdAt: post.createdAt ? new Date(post.createdAt).toISOString() : new Date().toISOString(),
  }
}

function sanitizeNewsPostFields(body) {
  return {
    title: String(body.title || '').trim(),
    category: String(body.category || 'Company Update').trim(),
    summary: String(body.summary || '').trim(),
    image: String(body.image || '').trim(),
    date: String(body.date || 'Company Update').trim(),
  }
}

function createSlug(title) {
  const base = String(title || 'news-post')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `${base || 'news-post'}-${Date.now()}`
}

function collection() {
  return getDB().collection('newsPosts')
}
