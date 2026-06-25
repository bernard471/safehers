import nodemailer from "nodemailer";

const smtpUser = process.env.EMAIL_USER;
const smtpPass = process.env.EMAIL_PASS;

const transporter = smtpUser && smtpPass
  ? nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })
  : null;

export const sendEmail = async ({
  from,
  to,
  subject,
  html,
  text,
}: {
  from?: string;
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
}) => {
  const fromAddress = from || smtpUser || "hello@safehers.africa";
  
  if (!transporter) {
    console.log(`[mail] SMTP not configured. Skipped sending email to ${to}: ${subject}`);
    return { data: null, error: new Error("SMTP not configured") };
  }

  try {
    const info = await transporter.sendMail({
      from: fromAddress.includes("<") ? fromAddress : `"SafeHer Foundation" <${fromAddress}>`,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject,
      text,
      html,
    });
    console.log(`[mail] Email sent to ${to}: ${info.messageId}`);
    return { data: { id: info.messageId }, error: null };
  } catch (err: any) {
    console.error(`[mail] Failed to send email to ${to}:`, err);
    return { data: null, error: err };
  }
};

export class Resend {
  constructor(apiKey?: string) {}
  emails = {
    send: async (options: {
      from: string;
      to: string | string[];
      subject: string;
      html?: string;
      text?: string;
    }) => {
      return sendEmail(options);
    }
  };
}
