import { ObjectId } from 'mongodb'
import { getDB } from '../config/db.js'

export async function createLead(fields) {
  const lead = normalizeLead({
    ...sanitizeLeadFields(fields),
    createdAt: new Date(),
  })

  await collection().insertOne(lead)
  return lead
}

export async function findLeads() {
  const leads = await collection()
    .find({})
    .sort({ createdAt: -1 })
    .toArray()

  return leads.map(normalizeLead)
}

export async function deleteLeadById(id) {
  if (!ObjectId.isValid(id)) return false
  const result = await collection().deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount > 0
}

export async function deleteAllLeads() {
  const result = await collection().deleteMany({})
  return result.deletedCount
}

export function normalizeLead(lead) {
  return {
    id: String(lead._id || lead.id || '').trim(),
    name: String(lead.name || '').trim(),
    email: String(lead.email || '').trim(),
    service: String(lead.service || '').trim(),
    query: String(lead.query || '').trim(),
    createdAt: lead.createdAt ? new Date(lead.createdAt).toISOString() : new Date().toISOString(),
  }
}

function sanitizeLeadFields(body) {
  return {
    name: String(body.name || '').trim(),
    email: String(body.email || '').trim(),
    service: String(body.service || '').trim(),
    query: String(body.query || '').trim(),
  }
}

function collection() {
  return getDB().collection('leads')
}
