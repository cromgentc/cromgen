import { getDB } from '../config/db.js'

export const serviceSampleCategories = [
  'Artificial Intelligence',
  'Digital Marketing',
  'Call Center',
  'IT',
  'Software Development',
  'HR Consultant',
  'Telecommunications',
]

const defaultServiceSamples = [
  {
    category: 'Artificial Intelligence',
    title: 'Machine Learning Lead Scoring Sample',
    summary: 'A sample AI output showing lead score, churn risk, sales forecast, and recommended next actions.',
    content: [
      'Model summary:',
      '- Lead score: 87/100',
      '- Churn risk: 18%',
      '- Sales forecast: +24% next 30 days',
      '- Fraud signal: Low',
      '',
      'Recommended actions:',
      '- Prioritize this lead for sales follow-up within 24 hours.',
      '- Use recommendation engine output for bundled service offers.',
      '- Track conversion outcome to improve model quality.',
    ].join('\n'),
    status: 'Published',
  },
  {
    category: 'Digital Marketing',
    title: 'Campaign Performance Sample',
    summary: 'A sample marketing report covering channel performance, lead quality, conversion rate, and optimization actions.',
    content: [
      'Campaign summary:',
      '- Best channel: Google Ads',
      '- Lead quality score: 82/100',
      '- Conversion rate: 6.4%',
      '- Recommended action: Shift budget toward high-intent keywords.',
    ].join('\n'),
    status: 'Published',
  },
  {
    category: 'Call Center',
    title: 'Customer Support QA Sample',
    summary: 'A sample call center report with SLA performance, call quality, escalation trends, and improvement actions.',
    content: [
      'Support summary:',
      '- SLA adherence: 94%',
      '- First call resolution: 78%',
      '- Escalation risk: Medium',
      '- Recommended action: Add targeted coaching for recurring billing questions.',
    ].join('\n'),
    status: 'Published',
  },
  {
    category: 'IT',
    title: 'Infrastructure Health Sample',
    summary: 'A sample IT operations report showing uptime, security observations, device status, and remediation priorities.',
    content: [
      'IT operations summary:',
      '- Uptime: 99.7%',
      '- Patch compliance: 91%',
      '- Backup status: Healthy',
      '- Recommended action: Prioritize endpoint patching for high-risk devices.',
    ].join('\n'),
    status: 'Published',
  },
  {
    category: 'Software Development',
    title: 'Product Delivery Sample',
    summary: 'A sample software delivery brief covering sprint progress, release risks, QA status, and next milestones.',
    content: [
      'Delivery summary:',
      '- Sprint completion: 86%',
      '- QA pass rate: 92%',
      '- Release risk: Low',
      '- Recommended action: Complete regression testing before deployment approval.',
    ].join('\n'),
    status: 'Published',
  },
  {
    category: 'HR Consultant',
    title: 'Recruitment Progress Sample',
    summary: 'A sample HR report showing candidate health, screening progress, interview status, and recruitment actions.',
    content: [
      'Hiring summary:',
      '- Qualified candidates: 34',
      '- Interview conversion: 41%',
      '- Offer readiness: 6 candidates',
      '- Recommended action: Shortlist top candidates for final stakeholder review.',
    ].join('\n'),
    status: 'Published',
  },
  {
    category: 'Telecommunications',
    title: 'Telecom Readiness Sample',
    summary: 'A sample telecom report covering VoIP readiness, call routing quality, SIP trunk status, and support actions.',
    content: [
      'Telecom summary:',
      '- Call routing readiness: 96%',
      '- SIP trunk status: Healthy',
      '- Latency risk: Low',
      '- Recommended action: Validate routing rules before peak call volume.',
    ].join('\n'),
    status: 'Published',
  },
]

export async function seedServiceSamples() {
  const count = await collection().countDocuments()
  if (count > 0) return

  await collection().insertMany(defaultServiceSamples.map((sample) => normalizeServiceSample({
    ...sample,
    slug: createSlug(sample.title),
    createdAt: new Date(),
  })))
}

export async function findServiceSamples({ publishedOnly = false } = {}) {
  const query = publishedOnly ? { status: 'Published' } : {}
  const samples = await collection()
    .find(query)
    .sort({ category: 1, createdAt: -1 })
    .toArray()

  return samples.map(normalizeServiceSample)
}

export async function createServiceSample(fields) {
  const sample = normalizeServiceSample({
    ...sanitizeServiceSampleFields(fields),
    slug: createSlug(fields.title),
    createdAt: new Date(),
  })

  await collection().insertOne(sample)
  return sample
}

export async function updateServiceSampleBySlug(slug, fields) {
  const existing = await collection().findOne({ slug })
  if (!existing) return null

  const sample = normalizeServiceSample({
    ...existing,
    ...sanitizeServiceSampleFields(fields),
    slug,
  })

  await collection().updateOne({ slug }, { $set: sample })
  return sample
}

export async function deleteServiceSampleBySlug(slug) {
  const result = await collection().deleteOne({ slug })
  return result.deletedCount > 0
}

export function normalizeServiceSample(sample) {
  return {
    slug: String(sample.slug || '').trim(),
    category: String(sample.category || '').trim(),
    title: String(sample.title || '').trim(),
    summary: String(sample.summary || '').trim(),
    content: String(sample.content || '').trim(),
    status: String(sample.status || 'Published').trim(),
    createdAt: sample.createdAt ? new Date(sample.createdAt).toISOString() : new Date().toISOString(),
  }
}

function sanitizeServiceSampleFields(body) {
  return {
    category: String(body.category || '').trim(),
    title: String(body.title || '').trim(),
    summary: String(body.summary || '').trim(),
    content: String(body.content || '').trim(),
    status: String(body.status || 'Published').trim(),
  }
}

function createSlug(title) {
  const base = String(title || 'service-sample')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `${base || 'service-sample'}-${Date.now()}`
}

function collection() {
  return getDB().collection('serviceSamples')
}
