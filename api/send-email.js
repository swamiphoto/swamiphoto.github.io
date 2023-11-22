const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*"); // Adjust this in production
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization, Origin, Accept");

  // OPTIONS request handling
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.postale.io",
    port: 587,
    secure: false,
    auth: {
      user: "swami@swamiphoto.com",
      pass: "PhqQF5STHpUt",
    },
  });

  try {
    await transporter.sendMail({
      from: "swami@swamiphoto.com",
      to: "swami@swamiphoto.com",
      subject: `Headshot enquiry from ${name}`,
      text: message,
      html: `<p>${message}</p>`,
    });

    res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Error sending email" });
  }
};
