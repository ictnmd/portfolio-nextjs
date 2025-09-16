import { NextRequest, NextResponse } from 'next/server';
import { personalInfo } from '@/data/personalInfo';

export const runtime = 'nodejs';

// Initialize SMTP transporter only if SMTP is configured
const getSmtpTransporter = async () => {
  const { default: nodemailer } = await import('nodemailer');
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secureEnv = process.env.SMTP_SECURE;
  const secure = secureEnv ? secureEnv === 'true' || secureEnv === '1' : undefined;

  if (!host || !port || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: Boolean(secure ?? (port === 465)),
    auth: { user, pass }
  });
};

interface ContactFormData {
  fullname: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { fullname, email, message } = body;

    // Validate required fields
    if (!fullname || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if SMTP is configured
    const transporter = await getSmtpTransporter();
    if (!transporter) {
      return NextResponse.json(
        { error: 'SMTP not configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Ensure a sender is configured
    const fromEmail = process.env.SMTP_FROM_EMAIL;
    const fromName = process.env.SMTP_FROM_NAME || 'Portfolio Contact Form';
    if (!fromEmail) {
      return NextResponse.json(
        { error: 'Email sender not configured. Please set SMTP_FROM_EMAIL.' },
        { status: 500 }
      );
    }

    const toEmail = process.env.SMTP_TO_EMAIL || personalInfo.email;

    const subject = `New Contact Form Submission from ${fullname}`;
    const text = `
New contact form submission:

Name: ${fullname}
Email: ${email}
Message: ${message}

---
Sent from your portfolio contact form.
    `;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Contact Form Submission</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style=\"margin: 10px 0;\"><strong>Name:</strong> ${fullname}</p>
          <p style=\"margin: 10px 0;\"><strong>Email:</strong> <a href=\"mailto:${email}\">${email}</a></p>
          <p style=\"margin: 10px 0;\"><strong>Message:</strong></p>
          <div style=\"background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;\">${message.replace(/\n/g, '<br>')}</div>
        </div>
        <hr style=\"border: none; border-top: 1px solid #eee; margin: 20px 0;\">
        <p style=\"color: #666; font-size: 12px;\">This message was sent from your portfolio contact form.</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: { address: fromEmail, name: fromName },
      to: [{ address: toEmail, name: personalInfo.name }],
      replyTo: { address: email, name: fullname },
      subject,
      text,
      html
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        messageId: info.messageId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to send email. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
