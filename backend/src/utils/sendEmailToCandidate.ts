import { transporterCandidate } from "./transporter";

export const sendJoiningReminderEmailToCandidate = async (candidate: any) => {
  const mailOptions = {
    from: `"Centennial Infotech" ${process.env.BREVO_EMAIL_HR}`,
    to: candidate.email,
    subject: "Internship Joining -- Tomorrow",
    text: `Dear ${candidate.name},

We are pleased to inform you that your internship with Centennial Infotech is scheduled to begin tomorrow, ${new Date(
      candidate.joiningDate
    ).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}.

Please ensure that you are available as per the discussed schedule and have access to a laptop and a stable internet connection. Further instructions regarding your tasks, reporting, and communication process will be shared during your onboarding.

If you have any questions or face any issues before joining, feel free to reach out to us.

We look forward to having you onboard and wish you a successful learning experience with our team.

Best regards,
Pankaj
Human Resource
Centennial Infotech
8146511568
    `,
  };

  await transporterCandidate.sendMail(mailOptions);
};
