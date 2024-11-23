import nodemailer from "nodemailer";
import { Cancha } from "@/interfaces/cancha";
import { TimeSlot } from "@/interfaces/reserva";
import { format } from "date-fns";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendBookingConfirmation(
  email: string,
  date: Date,
  timeSlot: TimeSlot,
  field?: Cancha | any
) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Booking Confirmation - ${field.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Booking Confirmation</h2>
        <p>Thank you for booking with SportSpot! Here are your booking details:</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">${field.name}</h3>
          <p><strong>Date:</strong> ${format(date, "MMMM d, yyyy")}</p>
          <p><strong>Time:</strong> ${timeSlot.startTime} - ${
      timeSlot.endTime
    }</p>
          <p><strong>Total Amount:</strong> $${field.hourlyRate}</p>
        </div>
        
        <p style="color: #666;">Please arrive 10 minutes before your scheduled time.</p>
        <p style="color: #666;">For any questions or changes, please contact us.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #888; font-size: 14px;">SportSpot</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
