const nodemailer = require("nodemailer");
const logger = require("../config/logger");
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
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === "true", 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false, // Ignore self-signed certificate errors
      },        
    });

    console.log({
      EMAIL_HOST: process.env.EMAIL_HOST,
      EMAIL_PORT: process.env.EMAIL_PORT,
      EMAIL_SECURE: process.env.EMAIL_SECURE,
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASSWORD ? "Exists" : "Not Set",
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Booking Confirmation",
        text: `Your booking for ${field} on ${date} at ${timeSlot} is confirmed.`,
    };

    await transporter.sendMail(mailOptions);

    return true; 

  } catch (error) {
    logger.error(`Error sending email from send email: ${error.message}`);
    throw error; 
  }
};

exports.sendEmailUtil = async (emailData) => {
  try {
      const { email, field, date, timeSlot } = emailData;

      if (!email || !field || !date || !timeSlot) {
          throw new Error("Missing required email fields");
      }

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
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Booking Confirmation",
          text: `Your booking for ${field} on ${date} at ${timeSlot} is confirmed.`,
      };

      await transporter.sendMail(mailOptions);

      logger.info(`Email successfully sent to: ${email}`);
      return true;
  } catch (error) {
      logger.error(`Error sending email from send email util: ${error.message}`);
      throw error; 
  }
};
