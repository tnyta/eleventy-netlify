// netlify/functions/send-contact-email.js
const postmark = require('postmark');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const client = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);
  const { name, email, message } = JSON.parse(event.body);

  try {
    await client.sendEmail({
      "From": "talent.nyota@dcmail.ca",
      "To": "spark01234@icloud.com",
      "Subject": "New Contact Message",
      "TextBody": `Message from ${name} (${email}): ${message}`
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
