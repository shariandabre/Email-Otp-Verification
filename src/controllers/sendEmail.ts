import { createTransport } from "nodemailer";

export const transporter = createTransport({
  host: process.env.BREVO_HOST,
  port: process.env.BREVO_POST,
  auth: {
    user: process.env.BREVO_LOGIN, // Brevo login
    pass: process.env.BREVO_PASS, // Brevo SMTP password
  },
});
