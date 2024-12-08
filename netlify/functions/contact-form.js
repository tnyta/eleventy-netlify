require('dotenv').config();
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, phone, email, subject, message } = data;

    const toEmail = process.env.TO_EMAIL; 
    const adamEmail = process.env.ADAM_EMAIL; 
    const prefixedSubject = `[Auto] ${subject}`;

    const emailContent = `
      Name: ${name}
      Phone: ${phone}
      Email: ${email}

      Message:
      ${message}
    `;

    const msg = {
      to: [toEmail, adamEmail],
      from: 'no-reply@yourdomain.com', // Make sure this domain is verified in SendGrid
      subject: prefixedSubject,
      text: emailContent
    };

    await sendgrid.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
};
