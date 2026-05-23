const nodemailer = require('nodemailer');

exports.sendMail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_PORT == 465, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"SoleStyle" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    
    return info;
  } catch (error) {
    console.error('--- NODEMAILER ERROR ---');
    console.error(error);
    console.error('------------------------');
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
