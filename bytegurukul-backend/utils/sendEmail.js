const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Transporter Create Karein (Gmail Example)
  // Best practice: Use Environment Variables for email/pass
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER, // Apni .env file mein add karein
      pass: process.env.EMAIL_PASS  // Apni .env file mein add karein
    }
  });

  // 2. Email Options Define Karein
  const mailOptions = {
    from: '"ByteGurukul Support" <noreply@bytegurukul.com>',
    to: options.email,
    subject: options.subject,
    html: options.message // HTML body
  };

  // 3. Send Email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;