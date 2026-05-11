import { findPolicies, findPolicyBySlug, updatePolicyBySlug } from '../models/Policy.js'
import { requireRole } from '../middleware/auth.js'
import { json, notFound, readJson } from '../utils/http.js'

const settingsAuth = requireRole(['admin', 'staff'])

export async function listPublicPolicies() {
  return json(200, {
    policies: await findPolicies(),
  })
}

export async function getPublicPolicy(_request, { slug }) {
  return getPolicyBySlug(slug)
}

export async function listSettingPolicies(request) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  return json(200, {
    policies: await findPolicies(),
  })
}

export async function getSettingPolicy(request, { slug }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  return getPolicyBySlug(slug)
}

export async function editSettingPolicy(request, { slug }) {
  const auth = settingsAuth(request)
  if (auth.error) return auth.error

  const body = await readJson(request)
  const policy = await updatePolicyBySlug(slug, body)

  if (!policy) return notFound('Policy page not found')

  return json(200, {
    ok: true,
    message: 'Policy page updated',
    policy,
  })
}

async function getPolicyBySlug(slug) {
  const policy = await findPolicyBySlug(slug)

  if (!policy) return notFound('Policy page not found')

  return json(200, {
    policy,
  })
}
