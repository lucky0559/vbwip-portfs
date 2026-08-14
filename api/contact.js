/* global process */

import nodemailer from 'nodemailer'
import { buildContactEmail } from './contact-email.js'

const defaultRecipient = process.env.CONTACT_RECIPIENT || 'benipayovanessa@gmail.com'

function jsonBody(body) {
  if (!body) return {}
  if (typeof body === 'object') return body

  try {
    return JSON.parse(body)
  } catch {
    return null
  }
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function parseBoolean(value, fallback) {
  if (value === undefined || value === null || value === '') return fallback
  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase())
}

function smtpErrorMessage(error) {
  if (error?.code === 'EAUTH') {
    return 'SMTP authentication failed. Check SMTP_USER and SMTP_PASS.'
  }

  if (error?.code === 'ENOTFOUND') {
    return 'The SMTP host could not be found. Check SMTP_HOST.'
  }

  if (['ECONNECTION', 'ESOCKET', 'ETIMEDOUT'].includes(error?.code)) {
    return 'The SMTP server could not be reached. Check SMTP_HOST, SMTP_PORT, and SMTP_SECURE.'
  }

  return 'The message could not be sent. Check the SMTP configuration and try again.'
}

export function createContactHandler(env = process.env) {
  const configuredRecipient = env.CONTACT_RECIPIENT || defaultRecipient
  const smtpHost = String(env.SMTP_HOST || '').trim()
  const smtpPort = Number(env.SMTP_PORT || 587)
  const smtpUser = String(env.SMTP_USER || '').trim()
  const smtpPass = String(env.SMTP_PASS || '')
  const mailFrom = String(env.MAIL_FROM || smtpUser).trim()
  const smtpConfigured = Boolean(
    smtpHost &&
    Number.isInteger(smtpPort) &&
    smtpPort > 0 &&
    smtpUser &&
    smtpPass &&
    mailFrom,
  )
  const transporter = smtpConfigured
    ? nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: parseBoolean(env.SMTP_SECURE, smtpPort === 465),
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
      })
    : null

  return async function handler(req, res) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return res.status(405).json({ error: 'Method not allowed.' })
    }

    if (!transporter) {
      return res.status(500).json({
        error: 'Email service is not configured. Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and MAIL_FROM.',
      })
    }

    const body = jsonBody(req.body)
    if (!body) {
      return res.status(400).json({ error: 'Invalid request body.' })
    }

    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const message = String(body.message || '').trim()
    const website = String(body.website || '').trim()

    if (website) {
      return res.status(200).json({ ok: true })
    }

    if (!name || name.length > 120) {
      return res.status(400).json({ error: 'Please provide your name.' })
    }

    if (!validEmail(email) || email.length > 254) {
      return res.status(400).json({ error: 'Please provide a valid email address.' })
    }

    if (!message || message.length > 5000) {
      return res.status(400).json({ error: 'Please add a message under 5,000 characters.' })
    }

    const safeName = name.replace(/[\r\n]+/g, ' ')
    const emailContent = buildContactEmail({
      name: safeName,
      email,
      message,
      receivedAt: new Intl.DateTimeFormat('en-PH', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Manila',
      }).format(new Date()),
    })
    try {
      await transporter.sendMail({
        from: mailFrom,
        to: configuredRecipient,
        replyTo: email,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      })
    } catch (error) {
      console.error('SMTP contact delivery failed', {
        code: error?.code,
        responseCode: error?.responseCode,
        message: error?.message,
      })
      return res.status(502).json({ error: smtpErrorMessage(error) })
    }

    return res.status(200).json({ ok: true })
  }
}

export default createContactHandler()
