const nodemailer = require('nodemailer');
require('dotenv').config();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 200, email: 254, message: 5000 };

// nginx doesn't forward client IPs (the app only ever sees 127.0.0.1),
// so throttle globally to protect the Gmail account's send quota.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_SENDS_PER_WINDOW = 5;
let windowStart = 0;
let sendsThisWindow = 0;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '64kb',
    },
  },
};

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getValidatedFields(body) {
  if (!body || typeof body !== 'object') {
    return null;
  }
  const fields = {};
  for (const key of Object.keys(LIMITS)) {
    const value = body[key];
    if (typeof value !== 'string' || !value.trim() || value.length > LIMITS[key]) {
      return null;
    }
    fields[key] = value.trim();
  }
  if (!EMAIL_PATTERN.test(fields.email)) {
    return null;
  }
  return fields;
}

export default async function main(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).redirect('/contact');
  }

  // honeypot: real visitors never see or fill this field
  if (req.body && req.body.website) {
    return res.status(200).send('message delivered');
  }

  const fields = getValidatedFields(req.body);
  if (!fields) {
    return res.status(400).send('invalid submission');
  }

  const now = Date.now();
  if (now - windowStart > WINDOW_MS) {
    windowStart = now;
    sendsThisWindow = 0;
  }
  if (sendsThisWindow >= MAX_SENDS_PER_WINDOW) {
    return res.status(429).send('too many requests');
  }
  sendsThisWindow += 1;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAILER_ACCOUNT,
        pass: process.env.MAILER_PASSWORD,
      },
    });

    const html = `
      <div>
        <p><strong>From:</strong> ${escapeHtml(fields.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
        <p><strong>Message:</strong>${escapeHtml(fields.message)}</p>
      </div>`;

    const text = `New Message
    From: ${fields.name}
    Email: ${fields.email}
    Message: ${fields.message} `;

    const receivers = [process.env.MAILER_RECIPIENT_PRIMARY, process.env.MAILER_RECIPIENT_ALTERNATE];

    // send mail with defined transport object
    await transporter.sendMail({
      from: process.env.MAILER_ACCOUNT,
      replyTo: fields.email,
      to: receivers.join(','), // list of receivers
      subject: 'Message from ' + fields.name + ' <' + fields.email + '>', // Subject line
      text: text, // plain text body
      html: html,
    });

    res.status(200).send('message delivered');
  }
  catch (error) {
    console.error(error);
    res.status(500).send('AN ERROR OCCURED');
  }
}
