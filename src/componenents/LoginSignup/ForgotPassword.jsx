import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';
import emailIcon from '../Assets/mail.png';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage('Please enter your email.');
      return;
    }

    try {
      // Example API call (you can adjust the endpoint)
      const response = await axios.post('http://localhost:5000/forgot', { email });
      setMessage(response.data.message || 'Password reset link sent!');
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <motion.div
      className="forgot-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2>Forgot Password</h2>
      <p className="info-text">
        Enter your email below and we’ll send you instructions to reset your password.
      </p>

      <div className="input-field">
        <img src={emailIcon} alt="email icon" />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {message && (
        <motion.div
          className="message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {message}
        </motion.div>
      )}

      <motion.button
        className="reset-btn"
        onClick={handleForgotPassword}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        Send Reset Link
      </motion.button>
    </motion.div>
  );
};

export default ForgotPassword;
