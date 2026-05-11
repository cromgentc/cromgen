import { MongoClient } from 'mongodb'

let client
let database

export async function connectDB() {
  if (database) return database

  const uri = process.env.MONGO_URI || process.env.MONGODB_URI

  if (!uri) {
    throw new Error('MONGO_URI is missing in backend/.env')
  }

  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: Number(process.env.MONGO_TIMEOUT_MS || 5000),
  })
  await client.connect()

  database = client.db(process.env.MONGO_DB_NAME || 'cromgentechnology')
  await ensureIndexes(database)

  return database
}

export function getDB() {
  if (!database) {
    throw new Error('Database is not connected yet')
  }

  return database
}

async function ensureIndexes(db) {
  await Promise.all([
    db.collection('users').createIndex({ email: 1, role: 1 }, { unique: true }),
    db.collection('vendors').createIndex({ email: 1 }, { unique: true }),
    db.collection('policies').createIndex({ slug: 1 }, { unique: true }),
    db.collection('siteSettings').createIndex({ key: 1 }, { unique: true }),
    db.collection('contracts').createIndex({ signingToken: 1 }, { unique: true }),
    db.collection('contracts').createIndex({ createdAt: -1 }),
    db.collection('jobPosts').createIndex({ slug: 1 }, { unique: true }),
    db.collection('jobPosts').createIndex({ createdAt: -1 }),
    db.collection('newsPosts').createIndex({ slug: 1 }, { unique: true }),
    db.collection('newsPosts').createIndex({ createdAt: -1 }),
    db.collection('leads').createIndex({ createdAt: -1 }),
  ])
}
