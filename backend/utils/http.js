export function json(status, body) {
  return { status, body }
}

export function validationError(message) {
  return json(400, { ok: false, message })
}

export function unauthorized(message = 'Unauthorized') {
  return json(401, { ok: false, message })
}

export function forbidden(message = 'You do not have permission for this action') {
  return json(403, { ok: false, message })
}

export function notFound(message = 'Requested route is unavailable. Please restart the backend server if this was just updated.') {
  return json(404, { ok: false, message })
}

export function sendJson(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(body, null, 2))
}

export function setCorsHeaders(response) {
  response.setHeader('Access-Control-Allow-Origin', process.env.APP_ORIGIN || '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}

export function readJson(request) {
  return new Promise((resolve, reject) => {
    let raw = ''

    request.on('data', (chunk) => {
      raw += chunk
    })

    request.on('end', () => {
      if (!raw) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(raw))
      } catch (error) {
        reject(error)
      }
    })

    request.on('error', reject)
  })
}
