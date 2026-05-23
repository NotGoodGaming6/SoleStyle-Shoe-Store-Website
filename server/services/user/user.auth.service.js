const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('#models/misc/misc.user.model');
const Otp = require('#models/misc/misc.otp.model');
const { sendMail } = require('#utils/misc/misc.mail');

const JWT_SECRET = process.env.JWT_SECRET;

exports.sendOtpService = async (email) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  const otpCode = crypto.randomInt(100000, 999999).toString();
  await Otp.deleteMany({ email });
  await Otp.create({ email, otp: otpCode });

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
      <h2 style="color: #7c3aed; text-align: center;">SoleStyle Verification</h2>
      <p>Thank you for joining SoleStyle! Use the code below to verify your email address. It will expire in 5 minutes.</p>
      <div style="font-size: 32px; font-weight: bold; text-align: center; padding: 20px; background: #f5f3ff; color: #7c3aed; border-radius: 8px; letter-spacing: 5px;">
        ${otpCode}
      </div>
      <p style="margin-top: 20px; color: #64748b; font-size: 14px;">If you didn't request this code, you can safely ignore this email.</p>
    </div>
  `;

  await sendMail(email, 'Your SoleStyle Verification Code', htmlContent);

  return { message: 'OTP sent successfully' };
};

exports.verifyOtpService = async (email, otp) => {
  const existingOtp = await Otp.findOne({ email, otp });
  if (!existingOtp) throw new Error('Invalid or expired OTP');
  return { message: 'OTP verified successfully' };
};

exports.registerService = async (name, email, password, otp) => {
  const existingOtp = await Otp.findOne({ email, otp });
  if (!existingOtp) throw new Error('Invalid or expired OTP');

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });
  await Otp.deleteOne({ _id: existingOtp._id });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '30d' });

  return {
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token
  };
}

exports.loginService = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('No user found with this email');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Incorrect password');

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '30d' });

  return {
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token
  };
};

exports.forgotPasswordOtpService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('No user found with this email');

  const otpCode = crypto.randomInt(100000, 999999).toString();
  await Otp.deleteMany({ email });
  await Otp.create({ email, otp: otpCode });

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
      <h2 style="color: #ef4444; text-align: center;">SoleStyle Password Reset</h2>
      <p>We received a request to reset your password. Use the code below to proceed. It will expire in 5 minutes.</p>
      <div style="font-size: 32px; font-weight: bold; text-align: center; padding: 20px; background: #fef2f2; color: #ef4444; border-radius: 8px; letter-spacing: 5px;">
        ${otpCode}
      </div>
      <p style="margin-top: 20px; color: #64748b; font-size: 14px;">If you didn't request a password reset, you can safely ignore this email.</p>
    </div>
  `;

  await sendMail(email, 'Your SoleStyle Password Reset Code', htmlContent);

  return { message: 'Password reset OTP sent successfully' };
};

exports.resetPasswordService = async (email, otp, newPassword) => {
  const existingOtp = await Otp.findOne({ email, otp });
  if (!existingOtp) throw new Error('Invalid or expired OTP');

  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  await user.save();
  await Otp.deleteOne({ _id: existingOtp._id });

  return { message: 'Password reset successfully' };
};
