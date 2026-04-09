import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors({ origin: true }));
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const htmlBody = `
    <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; background: #0D0500; color: #FDF3E3; padding: 32px; border-radius: 16px; border: 1px solid #C47C3040;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #F9C11A; font-size: 28px; margin: 0;">🌍 Culinarax</h1>
        <p style="color: rgba(253,243,227,0.5); font-size: 12px; margin: 4px 0 0;">World Food Universe</p>
      </div>
      <div style="background: rgba(253,243,227,0.04); border: 1px solid rgba(253,243,227,0.08); border-radius: 12px; padding: 24px; margin-bottom: 20px;">
        <h2 style="color: #F47B20; font-size: 18px; margin: 0 0 16px;">New Contact Message</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: rgba(253,243,227,0.5); width: 80px; font-size: 13px;">From:</td>
              <td style="padding: 8px 0; color: #FDF3E3; font-weight: bold; font-size: 14px;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: rgba(253,243,227,0.5); font-size: 13px;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #F9C11A; text-decoration: none;">${email}</a></td></tr>
          ${subject ? `<tr><td style="padding: 8px 0; color: rgba(253,243,227,0.5); font-size: 13px;">Subject:</td>
              <td style="padding: 8px 0; color: #FDF3E3; font-size: 14px;">${subject}</td></tr>` : ''}
        </table>
      </div>
      <div style="background: rgba(253,243,227,0.04); border: 1px solid rgba(253,243,227,0.08); border-radius: 12px; padding: 24px;">
        <h3 style="color: #F47B20; font-size: 14px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 2px;">Message</h3>
        <p style="color: rgba(253,243,227,0.8); line-height: 1.7; margin: 0; font-size: 15px;">${message.replace(/\n/g, '<br>')}</p>
      </div>
      <p style="text-align: center; color: rgba(253,243,227,0.2); font-size: 11px; margin: 24px 0 0;">Sent from Culinarax Food Universe</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Culinarax Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Culinarax] ${subject || `Message from ${name}`}`,
      html: htmlBody,
    });
    return res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error.message);
    return res.status(500).json({ success: false, error: 'Failed to send email. Please try again.' });
  }
});

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`✅ Email server running on http://localhost:${PORT}`);
});
