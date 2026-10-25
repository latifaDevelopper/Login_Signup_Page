
import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiMail,
  FiArrowLeft,
  FiArrowRight,
  FiShield,
  FiCheckCircle,
  FiAlertCircle,
  FiZap,
} from 'react-icons/fi';

import './ForgotPassword.css';

const API_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (loading) return;

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setMessage('Please enter your email address.');
      setMessageType('error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setMessage('Please enter a valid email address.');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        `${API_URL}/forgot`,
        { email: cleanEmail },
        { timeout: 15000 }
      );

      setMessage(
        response.data?.message ||
          'If an account exists for this email, reset instructions will be sent.'
      );

      setMessageType('success');
    } catch (error) {
      setMessage(
        error.code === 'ECONNABORTED'
          ? 'The request timed out. Please try again.'
          : error.response?.data?.message ||
            (error.response
              ? 'Unable to process your request. Please try again.'
              : 'Cannot connect to the server. Please try again later.')
      );

      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="forgot-page">
      <div className="forgot-orb forgot-orb-one" />
      <div className="forgot-orb forgot-orb-two" />

      <motion.section
        className="forgot-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="forgot-brand">
          <div className="forgot-brand-icon">
            <FiZap />
          </div>

          <span>
            YOUR<span className="forgot-brand-accent">SPACE</span>
          </span>
        </div>

        <div className="forgot-icon-circle">
          <FiMail />
        </div>

        <span className="forgot-eyebrow">
          <FiShield />
          ACCOUNT RECOVERY
        </span>

        <h1>
          Forgot your <span>password?</span>
        </h1>

        <p className="forgot-description">
          No worries! Enter the email address associated with your account
          and we’ll help you get back in.
        </p>

        <form className="forgot-form" onSubmit={handleForgotPassword}>
          <div className="forgot-field">
            <label htmlFor="forgot-email">Email address</label>

            <div className="forgot-input-wrap">
              <FiMail className="forgot-input-icon" />

              <input
                id="forgot-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage('');
                  setMessageType('');
                }}
                autoComplete="email"
                required
                disabled={loading}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {message && (
              <motion.div
                key={message}
                className={`forgot-message ${messageType}`}
                role={messageType === 'error' ? 'alert' : 'status'}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {messageType === 'success' ? (
                  <FiCheckCircle />
                ) : (
                  <FiAlertCircle />
                )}

                <span>{message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            className="forgot-submit"
            whileHover={{ scale: loading ? 1 : 1.015 }}
            whileTap={{ scale: loading ? 1 : 0.985 }}
            disabled={loading}
          >
            <span>
              {loading ? 'Sending request...' : 'Send reset instructions'}
            </span>

            {!loading && <FiArrowRight />}

            {loading && <span className="forgot-spinner" />}
          </motion.button>
        </form>

        <div className="forgot-divider">
          <span />
          <p>SECURE ACCOUNT RECOVERY</p>
          <span />
        </div>

        <button
          type="button"
          className="forgot-back"
          onClick={() => navigate('/')}
        >
          <FiArrowLeft />
          Back to Login
        </button>
      </motion.section>

      <p className="forgot-copyright">
        © {new Date().getFullYear()} YourSpace. All rights reserved.
      </p>
    </main>
  );
};

export default ForgotPassword;
