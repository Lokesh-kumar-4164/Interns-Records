import nodemailer from "nodemailer";

export const sendJoiningReminderEmailToHR = async (candidate: any) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT == "465",
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.SMTP_KEY,
    },
  } as nodemailer.TransportOptions);

  const mailOptions = {
    from: process.env.BREVO_EMAIL,
    to: process.env.BREVO_EMAIL_HR,
    subject: "Candidate Joining Reminder",
    text: `Reminder Alert 🚨
    
    Candidate Name: ${candidate.name}
    Email: ${candidate.email}
    Joining Date: ${candidate.joiningDate.toDateString()}

    This candidate is scheduled to join tomorrow.
    `,
  };

  await transporter.sendMail(mailOptions);
};
