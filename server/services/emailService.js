const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');

// Email configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'Gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Load email templates
const verifyEmailTemplate = fs.readFileSync(
  path.join(__dirname, '../templates/verifyEmail.hbs'), 
  'utf8'
);
const resetPasswordTemplate = fs.readFileSync(
  path.join(__dirname, '../templates/resetPassword.hbs'), 
  'utf8'
);

// Compile templates
const compiledVerifyEmail = handlebars.compile(verifyEmailTemplate);
const compiledResetPassword = handlebars.compile(resetPasswordTemplate);

module.exports = {
  async sendVerificationEmail(email, token) {
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;
    
    const mailOptions = {
      from: `"WeatherVista" <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject: 'Verify Your Email Address',
      html: compiledVerifyEmail({ verificationUrl })
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Verification email sent to ${email}`);
      return true;
    } catch (error) {
      console.error('Error sending verification email:', error);
      return false;
    }
  },

  async sendPasswordResetEmail(email, token) {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
    
    const mailOptions = {
      from: `"WeatherVista" <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject: 'Password Reset Request',
      html: compiledResetPassword({ resetUrl })
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Password reset email sent to ${email}`);
      return true;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return false;
    }
  }
};