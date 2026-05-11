import { getDB } from '../config/db.js'
import { defaultPolicyPages } from '../data/defaultPolicies.js'

export async function seedPolicies() {
  const operations = Object.values(defaultPolicyPages).map((policy) => ({
    updateOne: {
      filter: { slug: policy.slug },
      update: {
        $setOnInsert: {
          ...policy,
          createdAt: new Date(),
        },
        $set: {
          updatedAt: new Date(),
        },
      },
      upsert: true,
    },
  }))

  await collection().bulkWrite(operations)
}

export async function findPolicies() {
  const policies = await collection()
    .find({}, { projection: { _id: 0 } })
    .sort({ title: 1 })
    .toArray()

  return policies.map(normalizePolicy)
}

export async function findPolicyBySlug(slug) {
  const policy = await collection().findOne({ slug }, { projection: { _id: 0 } })
  return policy ? normalizePolicy(policy) : null
}

export async function updatePolicyBySlug(slug, fields) {
  const existing = await collection().findOne({ slug })
  if (!existing) return null

  const policy = normalizePolicy({
    ...existing,
    ...sanitizePolicyFields(fields),
    slug,
  })

  await collection().updateOne(
    { slug },
    {
      $set: {
        ...policy,
        updatedAt: new Date(),
      },
    },
  )

  return policy
}

export function normalizePolicy(policy) {
  return {
    slug: String(policy.slug || '').trim(),
    title: String(policy.title || '').trim(),
    image: String(policy.image || '').trim(),
    summary: String(policy.summary || '').trim(),
    updated: String(policy.updated || '').trim(),
    highlights: Array.isArray(policy.highlights) ? policy.highlights.map(String) : [],
    sections: Array.isArray(policy.sections)
      ? policy.sections.map(([title, copy]) => [String(title || '').toUpperCase(), String(copy || '')])
      : [],
  }
}

function sanitizePolicyFields(body) {
  const fields = {}

  for (const key of ['title', 'image', 'summary', 'updated']) {
    if (typeof body[key] === 'string') {
      fields[key] = body[key].trim()
    }
  }

  if (Array.isArray(body.highlights)) {
    fields.highlights = body.highlights.map(String).filter(Boolean)
  }

  if (Array.isArray(body.sections)) {
    fields.sections = body.sections
      .filter((item) => Array.isArray(item) && item.length >= 2)
      .map(([title, copy]) => [String(title).trim().toUpperCase(), String(copy).trim()])
  }

  return fields
}

function collection() {
  return getDB().collection('policies')
}
