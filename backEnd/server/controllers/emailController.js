const nodemailer = require("nodemailer");
const logger = require("../config/logger");
require("dotenv").config();

exports.sendEmailUtil = async (emailData) => {
  try {
    const { email, subject, message } = emailData;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === "true", // Convert to boolean
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM ?? process.env.EMAIL_HOST,
      to: email,
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    logger.info(`Email successfully sent to: ${email}`);
    return true;
  } catch (error) {
    logger.error(`Error sending email from send email util: ${error.message}`);
    throw error;
  }
};
