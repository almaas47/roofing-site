import Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const resend = new Resend(process.env.RESEND_API_KEY)

const CONTRACTOR_EMAIL = process.env.CONTRACTOR_EMAIL || 'matthewtgdiamond@gmail.com'
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'

// Cached at the API level after the first request — stable across all form submissions
const SYSTEM_PROMPT = `You are the customer service AI for Peak Ridge Roofing, a licensed and insured roofing contractor serving Salt Lake, Utah, and Tooele counties in Utah.

Your job is to write a warm, professional, and personalized confirmation email body for customers who have just submitted an estimate request through the company website.

Guidelines for every email:
- Address the customer by their first name
- Confirm the specific service they requested
- Set clear expectations: a team member will call them within one business day
- Adapt your tone based on the service type:
    • Roof repair or emergency: acknowledge urgency, reassure them the team responds quickly, mention the 24/7 emergency line (801) 555-0192
    • New roof installation: convey enthusiasm, mention the free estimate process and that all material types are available
    • Gutters & drainage: highlight long-term home protection, mention seamless gutter install
    • Insurance claim: lead with empathy for the stressful situation, emphasize that Peak Ridge handles all insurer paperwork directly so the customer doesn't have to
    • Inspection or other: keep it warm and open-ended, mention the team will assess their specific needs on the call
- If the customer included additional details, briefly acknowledge them to show the message was read
- Close with a confident, reassuring line that reinforces they made a great choice

Tone: professional but warm, like a trusted local contractor — not corporate, not overly casual.

Format rules:
- Output ONLY the email body paragraphs
- Do NOT include a subject line
- Do NOT include a salutation (e.g. "Hi John," — that is added separately)
- Do NOT include a sign-off block (e.g. "Warm regards," — that is added separately)
- Use plain paragraph text. No bullet points, no markdown, no HTML.
- 3–5 short paragraphs maximum`

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
