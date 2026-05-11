import { createServer } from 'node:http'
import { connectDB } from './config/db.js'
import { seedPolicies } from './models/Policy.js'
import { seedSiteSettings } from './models/SiteSettings.js'
import { seedSystemUsers } from './models/User.js'
import { routes } from './routes/index.js'
import {
  createSettingWorkforceRecord,
  deleteSettingWorkforceRecord,
  listWorkforceRecords,
  updateSettingWorkforceRecord,
} from './controllers/workforceController.js'
import { loadEnv } from './utils/env.js'
import { notFound, sendJson, setCorsHeaders } from './utils/http.js'

loadEnv()

const preferredPort = Number(process.env.PORT || 5000)

const server = createServer(async (request, response) => {
  setCorsHeaders(response)

  if (request.method === 'OPTIONS') {
    response.writeHead(204)
    response.end()
    return
  }

  const url = new URL(request.url || '/', `http://${request.headers.host}`)
  const match = matchRoute(request.method, url.pathname)

  if (!match) {
    const result = notFound()
    sendJson(response, result.status, result.body)
    return
  }

  try {
    const result = await match.route.handler(request, match.params, url)
    if (result.raw) {
      response.writeHead(result.status, result.headers || {})
      response.end(result.body)
      return
    }
    sendJson(response, result.status, result.body)
  } catch (error) {
    sendJson(response, 500, {
      ok: false,
      message: 'Unexpected backend error',
      detail: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

connectDB()
  .then(async () => {
    await seedPolicies()
    await seedSiteSettings()
    await seedSystemUsers()

    listenOnPreferredPort(preferredPort)
  })
  .catch((error) => {
    console.error('Backend startup failed:', error.message)
    process.exit(1)
  })

function matchRoute(method, pathname) {
  const workforceMatch = pathname.match(/^\/api\/settings\/workforce\/([^/]+)(?:\/([^/]+))?$/)
  if (workforceMatch) {
    const [, type, id] = workforceMatch
    if (method === 'GET' && !id) return { route: { handler: listWorkforceRecords }, params: { type } }
    if (method === 'POST' && !id) return { route: { handler: createSettingWorkforceRecord }, params: { type } }
    if (method === 'POST' && id) return { route: { handler: updateSettingWorkforceRecord }, params: { type, id } }
    if (method === 'DELETE' && id) return { route: { handler: deleteSettingWorkforceRecord }, params: { type, id } }
  }

  for (const route of routes) {
    if (route.method !== method) continue

    if (typeof route.path === 'string' && route.path === pathname) {
      return { route, params: {} }
    }

    if (route.path instanceof RegExp) {
      const match = pathname.match(route.path)
      if (!match) continue

      const params = {}

      route.params?.forEach((name, index) => {
        params[name] = match[index + 1]
      })

      return { route, params }
    }
  }

  return null
}

function listenOnPreferredPort(port) {
  server.once('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Stop the existing backend and restart on http://localhost:${port}`)
      process.exit(1)
    }

    console.error('Backend server failed:', error.message)
    process.exit(1)
  })

  server.listen(port, () => {
    console.log(`Backend API running on http://localhost:${port}`)
  })
}
