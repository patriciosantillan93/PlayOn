const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

exports.sendEmail = async (req, res) => {
  console.log("Received email request");
  // Your email logic here
  const { email, field, date, timeSlot } = req.body;

  if (!email || !field || !date || !timeSlot) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      //service: "Gmail", // Replace with your email provider
      host: process.env.EMAIL_HOST, // Replace with your SMTP server
      port: process.env.EMAIL_PORT, // Typically 587 for TLS or 465 for SSL; check with your server settings
      secure: false, // Set to true if using SSL/TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Booking Confirmation",
      text: `Your booking for ${field} on ${date} at ${timeSlot} is confirmed.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email", error });
  }
};
