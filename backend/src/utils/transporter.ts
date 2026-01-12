import nodemailer from "nodemailer";

export const transporterHR = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: { user: process.env.BREVO_USER, pass: process.env.SMTP_KEY },
});

export const transporterCandidate = nodemailer.createTransport({
  host: process.env.SMTP_HOST_HR,
  port: 587,
  secure: false,
  auth: { user: process.env.BREVO_USER_HR, pass: process.env.SMTP_KEY_HR },
});
