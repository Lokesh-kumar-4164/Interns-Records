import { transporterHR } from "./transporter";

export const sendJoiningReminderEmailToHR = async (candidate: any) => {
  
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

  await transporterHR.sendMail(mailOptions);
  console.log("HR mail sent");
};
