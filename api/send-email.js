// api/send-email.js
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  const { name, email, message } = req.body; // Adjust these fields based on your form

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure with your SMTP server details
    host: "smtp.postale.io",
    port: 587,
    secure: false,
    auth: {
      user: "swami@swamiphoto.com", // Your email
      pass: "PhqQF5STHpUt", // Your password
    },
  });

  try {
    await transporter.sendMail({
      from: "swami@swamiphoto.com", // Sender address
      to: "swami@swamiphoto.com", // Replace with recipient email
      subject: `New message from ${name}`,
      text: message, // Plain text body
      html: `<p>${message}</p>`, // HTML body
    });

    res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Error sending email" });
  }
};
