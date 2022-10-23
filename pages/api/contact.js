const nodemailer = require('nodemailer');
require('dotenv').config();

export default async function main(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).redirect('/contact');
  }

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
        <p><strong>From:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Message:</strong>${req.body.message}</p>
      </div>`;

    const text = `New Message 
    From: ${req.body.name}
    Email: ${req.body.email}
    Message: ${req.body.message} `;

    const receivers = [process.env.MAILER_RECIPIENT_PRIMARY, process.env.MAILER_RECIPIENT_ALTERNATE];

    // send mail with defined transport object
    await transporter.sendMail({
      from: req.body.email, // sender address
      to: receivers.join(','), // list of receivers
      subject: 'Message from ' + req.body.name + ' <' + req.body.email + '>', // Subject line
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
