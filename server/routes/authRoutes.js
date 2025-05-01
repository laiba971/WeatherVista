const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const emailService = require('../services/emailService');

// ==========================
// Auth Routes
// ==========================

// User registration
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);

// Email verification
router.get('/verify-email/:token', authController.verifyEmail);

// Forgot password - sends reset email
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const result = await authController.forgotPassword(email);

  if (result.success && result.token) {
    await emailService.sendPasswordResetEmail(email, result.token);
  }

  res.json({ message: 'If an account exists, a reset email has been sent' });
});

// Password reset
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
