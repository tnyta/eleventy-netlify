const postmark = require('postmark');

exports.handler = async (event) => {
  console.log("Received event:", event);  // Logs the entire event object

  if (event.httpMethod !== 'POST') {
    console.log("Error: Method not allowed");
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);
    console.log("Parsed body:", { name, email, message });  // Logs parsed data

    const client = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);
    const emailResponse = await client.sendEmail({
      "From": "talent.nyota@dcmail.ca",
      "To": "spark01234@icloud.com",
      "Cc": "adam.kunz+inft@durhamcollege.ca",
      "Subject": `AUTO: New Contact Message from ${name}`,
      "TextBody": `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    console.log("Email sent response:", emailResponse);  // Logs response from Postmark
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" })
    };
  } catch (error) {
    console.error("Failed to send email:", error);  // Logs detailed errors
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
