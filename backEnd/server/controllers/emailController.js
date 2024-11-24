const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

// OAuth2 client setup
/*
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

exports.sendEmail = async (req, res) => {
  const { email, field, date, timeSlot } = req.body;

  if (!email || !field || !date || !timeSlot) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Booking Confirmation",
      text: `Your booking for ${field} on ${date} at ${timeSlot} is confirmed.`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
*/
exports.sendEmail = async (req, res) => {
  console.log("Received email request");
  // Your email logic here
  const { email, field, date, timeSlot } = req.body;

  if (!email || !field || !date || !timeSlot) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Replace with your email provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
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
