import Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const resend = new Resend(process.env.RESEND_API_KEY)

const CONTRACTOR_EMAIL = process.env.CONTRACTOR_EMAIL || 'matthewtgdiamond@gmail.com'
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Loaded once at startup — cached at the API level after the first request
const SYSTEM_PROMPT = readFileSync(join(__dirname, 'customer-email-prompt.md'), 'utf-8').trim()

async function generateCustomerEmailBody({ name, email, phone, service, message }) {
  const userContent = `New estimate request details:
- Customer name: ${name}
- Email: ${email}
- Phone: ${phone}
- Service requested: ${service}
- Additional details: ${message || 'None provided'}

Write the personalized email body for this customer.`

  const response = await anthropic.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 1024,
    system: [
      {
        type: 'text',
        text: SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' }
      }
    ],
    messages: [
      { role: 'user', content: userContent }
    ]
  })

  const textBlock = response.content.find(b => b.type === 'text')
  const body = textBlock?.text ?? ''

  console.log(`Claude usage — input: ${response.usage.input_tokens}, output: ${response.usage.output_tokens}, cache_read: ${response.usage.cache_read_input_tokens ?? 0}, cache_write: ${response.usage.cache_creation_input_tokens ?? 0}`)

  return body
}

function buildContractorHtml({ name, email, phone, service, message }) {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1c1c1c">
      <div style="background:#1c1917;padding:20px 32px">
        <span style="color:#fb923c;font-size:20px;font-weight:700">Peak Ridge Roofing</span>
        <span style="color:#78716c;font-size:14px;margin-left:12px">New Lead</span>
      </div>
      <div style="padding:32px;background:#fff;border:1px solid #e5e5e5;border-top:none">
        <h2 style="margin:0 0 24px;color:#c2410c;font-size:18px">New Estimate Request</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:10px 0;font-weight:600;width:120px;color:#555;border-bottom:1px solid #f0f0f0">Name</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${name}</td></tr>
          <tr><td style="padding:10px 0;font-weight:600;color:#555;border-bottom:1px solid #f0f0f0">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><a href="mailto:${email}" style="color:#c2410c">${email}</a></td></tr>
          <tr><td style="padding:10px 0;font-weight:600;color:#555;border-bottom:1px solid #f0f0f0">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><a href="tel:${phone}" style="color:#c2410c">${phone}</a></td></tr>
          <tr><td style="padding:10px 0;font-weight:600;color:#555;${message ? 'border-bottom:1px solid #f0f0f0' : ''}">Service</td><td style="padding:10px 0;${message ? 'border-bottom:1px solid #f0f0f0' : ''}">${service}</td></tr>
          ${message ? `<tr><td style="padding:10px 0;font-weight:600;color:#555;vertical-align:top">Message</td><td style="padding:10px 0">${message}</td></tr>` : ''}
        </table>
      </div>
      <div style="padding:16px 32px;background:#f5f5f4;font-size:12px;color:#78716c">
        Submitted via peakridgeroofing.com
      </div>
    </div>
  `
}

function buildCustomerHtml({ name, emailBody }) {
  const paragraphs = emailBody
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => `<p style="margin:0 0 16px;line-height:1.6">${line}</p>`)
    .join('')

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1c1c1c">
      <div style="background:#1c1917;padding:24px 32px">
        <h1 style="color:#fb923c;margin:0;font-size:22px;font-weight:700">Peak Ridge Roofing</h1>
        <p style="color:#78716c;margin:4px 0 0;font-size:13px">Licensed &amp; Insured · Salt Lake County</p>
      </div>
      <div style="padding:32px;background:#fff;border:1px solid #e5e5e5;border-top:none">
        <p style="margin:0 0 16px;line-height:1.6">Hi ${name},</p>
        ${paragraphs}
        <p style="margin:24px 0 0;line-height:1.6">
          Warm regards,<br>
          <strong>The Peak Ridge Roofing Team</strong><br>
          <span style="color:#78716c;font-size:13px">(801) 555-0192 · Mon–Sat 7am–6pm · Emergency line 24/7</span>
        </p>
      </div>
      <div style="padding:16px 32px;background:#f5f5f4;font-size:12px;color:#78716c">
        Peak Ridge Roofing LLC · South Jordan, UT · Utah Contractor #284710 · All rights reserved
      </div>
    </div>
  `
}

export async function processContactForm({ name, email, phone, service, message }) {
  // Generate AI email body first, then send both emails in parallel
  const emailBody = await generateCustomerEmailBody({ name, email, phone, service, message })

  const firstName = name.split(' ')[0]

  await Promise.all([
    // Contractor lead notification
    resend.emails.send({
      from: `Peak Ridge Roofing <${FROM_EMAIL}>`,
      to: CONTRACTOR_EMAIL,
      subject: `New Lead: ${service} — ${name}`,
      html: buildContractorHtml({ name, email, phone, service, message })
    }),

    // AI-generated customer confirmation
    resend.emails.send({
      from: `Peak Ridge Roofing <${FROM_EMAIL}>`,
      to: email,
      subject: `We got your request, ${firstName} — Peak Ridge Roofing`,
      html: buildCustomerHtml({ name: firstName, emailBody })
    })
  ])
}
