import { Buffer } from 'node:buffer'
import net from 'node:net'
import tls from 'node:tls'
import { getSiteSettings } from '../models/SiteSettings.js'

export async function sendEmail({ to, subject, text, html }) {
  const savedSettings = await getSiteSettings().catch(() => null)
  const emailConfig = savedSettings?.emailConfig || {}
  const host = emailConfig.smtpHost || process.env.SMTP_HOST
  const user = emailConfig.smtpUser || process.env.SMTP_USER
  const rawPass = emailConfig.smtpPass || process.env.SMTP_PASS
  const from = emailConfig.mailFrom || process.env.MAIL_FROM || user
  const port = Number(emailConfig.smtpPort || process.env.SMTP_PORT || 465)
  const pass = /gmail/i.test(host || '') ? String(rawPass || '').replace(/\s+/g, '') : rawPass

  if (!host || !user || !pass || !from) {
    console.warn('Email not sent. Configure SMTP_HOST, SMTP_USER, SMTP_PASS, and MAIL_FROM.')
    console.warn(`Pending email to ${to}: ${subject}`)
    return { sent: false, reason: 'SMTP is not configured' }
  }

  const boundary = `cromgen-${Date.now()}`
  const message = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    '',
    text || stripHtml(html || ''),
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    '',
    html || `<p>${escapeHtml(text || '')}</p>`,
    '',
    `--${boundary}--`,
  ].join('\r\n')

  await sendSmtp({ host, port, user, pass, from, to, message })
  return { sent: true }
}

function sendSmtp({ host, port, user, pass, from, to, message }) {
  return new Promise((resolve, reject) => {
    const useImplicitTls = port === 465
    const socket = useImplicitTls
      ? tls.connect({ host, port, servername: host })
      : net.connect({ host, port })

    socket.once('connect', async () => {
      let activeSocket = socket

      try {
        await readResponse(activeSocket)
        await command(activeSocket, `EHLO ${host}`)

        if (!useImplicitTls) {
          await command(activeSocket, 'STARTTLS', 220)
          activeSocket = tls.connect({ socket: activeSocket, servername: host })
          await onceSecure(activeSocket)
          await command(activeSocket, `EHLO ${host}`)
        }

        await command(activeSocket, 'AUTH LOGIN')
        await command(activeSocket, Buffer.from(user).toString('base64'))
        await command(activeSocket, Buffer.from(pass).toString('base64'))
        await command(activeSocket, `MAIL FROM:<${from}>`)
        await command(activeSocket, `RCPT TO:<${to}>`)
        await command(activeSocket, 'DATA', 354)
        await command(activeSocket, `${message}\r\n.`)
        await command(activeSocket, 'QUIT')
        activeSocket.end()
        resolve()
      } catch (error) {
        activeSocket.destroy()
        reject(error)
      }
    })

    socket.setTimeout(15000, () => {
      socket.destroy()
      reject(new Error('SMTP connection timed out'))
    })

    socket.on('error', reject)
  })
}

function onceSecure(socket) {
  return new Promise((resolve, reject) => {
    socket.once('secureConnect', resolve)
    socket.once('error', reject)
  })
}

function command(socket, line, expectedCode) {
  socket.write(`${line}\r\n`)
  return readResponse(socket, expectedCode)
}

function readResponse(socket, expectedCode) {
  return new Promise((resolve, reject) => {
    let raw = ''

    const onData = (chunk) => {
      raw += chunk.toString('utf8')
      const lines = raw.split(/\r?\n/).filter(Boolean)
      const last = lines.at(-1) || ''

      if (!/^\d{3}\s/.test(last)) return

      socket.off('data', onData)
      const code = Number(last.slice(0, 3))

      if (expectedCode ? code !== expectedCode : code >= 400) {
        reject(new Error(`SMTP error: ${last}`))
        return
      }

      resolve(raw)
    }

    socket.on('data', onData)
  })
}

function stripHtml(value) {
  return String(value).replace(/<[^>]+>/g, ' ')
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}
