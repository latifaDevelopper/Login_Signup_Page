
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
  FiZap,
} from 'react-icons/fi';

import './LoginSignup.css';

const API_URL = 'http://localhost:5000';

const LoginSignup = () => {
  const navigate = useNavigate();

  const [action, setAction] = useState('Login');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const switchAction = (nextAction) => {
    setAction(nextAction);
    setMessage('');
    setMessageType('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const email = emailInput.trim();
    const username = nameInput.trim();

    if (
      !email ||
      !passwordInput ||
      (action === 'Sign Up' && !username)
    ) {
      setMessage('Please fill in all required fields.');
      setMessageType('error');
      return;
    }

    if (action === 'Sign Up' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Please enter a valid email address.');
      setMessageType('error');
      return;
    }

    if (action === 'Sign Up' && passwordInput.length < 8) {
      setMessage('Your password must contain at least 8 characters.');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const endpoint = action === 'Login' ? '/log' : '/sig';

      const payload =
        action === 'Login'
          ? {
              email,
              password: passwordInput,
            }
          : {
              username,
              email,
              password: passwordInput,
            };

      const response = await axios.post(
        `${API_URL}${endpoint}`,
        payload,
        { timeout: 15000 }
      );

      setMessage(
        response.data?.message ||
          (action === 'Login'
            ? 'Login successful!'
            : 'Account created successfully!')
      );

      setMessageType('success');
    } catch (error) {
      const errorMessage =
        error.code === 'ECONNABORTED'
          ? 'The request timed out. Please try again.'
          : error.response?.data?.message ||
            (error.response
              ? 'Unable to complete your request.'
              : 'Cannot connect to the server. Please try again later.');

      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-orb auth-orb-one" />
      <div className="auth-orb auth-orb-two" />

      <motion.section
        className="auth-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <FiZap />
          </div>
          <span>YOUR<span className="brand-accent">SPACE</span></span>
        </div>

        <div className="auth-heading">
          <span className="auth-eyebrow">
            <FiShield /> SECURE ACCESS
          </span>

          <h1>
            {action === 'Login' ? (
              <>Welcome <span>back.</span></>
            ) : (
              <>Create your <span>account.</span></>
            )}
          </h1>

          <p>
            {action === 'Login'
              ? 'Sign in to continue your journey.'
              : 'Join us and get started in a few simple steps.'}
          </p>
        </div>

        <div className="auth-tabs">
          <button
            type="button"
            className={action === 'Login' ? 'auth-tab active' : 'auth-tab'}
            onClick={() => switchAction('Login')}
            aria-pressed={action === 'Login'}
          >
            Login
          </button>

          <button
            type="button"
            className={action === 'Sign Up' ? 'auth-tab active' : 'auth-tab'}
            onClick={() => switchAction('Sign Up')}
            aria-pressed={action === 'Sign Up'}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {action === 'Sign Up' && (
              <motion.div
                key="name-field"
                className="auth-field"
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <label htmlFor="auth-name">Full name</label>
                <div className="auth-input-wrap">
                  <FiUser className="auth-input-icon" />
                  <input
                    id="auth-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    autoComplete="name"
                    required
                    disabled={loading}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="auth-field">
            <label htmlFor="auth-email">Email address</label>
            <div className="auth-input-wrap">
              <FiMail className="auth-input-icon" />
              <input
                id="auth-email"
                type="email"
                placeholder="you@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                autoComplete="email"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="auth-password">Password</label>
            <div className="auth-input-wrap">
              <FiLock className="auth-input-icon" />
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                placeholder={
                  action === 'Sign Up'
                    ? 'At least 8 characters'
                    : 'Enter your password'
                }
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoComplete={
                  action === 'Login' ? 'current-password' : 'new-password'
                }
                minLength={action === 'Sign Up' ? 8 : undefined}
                required
                disabled={loading}
              />

              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {action === 'Login' && (
            <div className="auth-forgot-row">
              <button
                type="button"
                className="auth-text-button"
                onClick={() => navigate('/forgot')}
              >
                Forgot password?
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {message && (
              <motion.div
                key={message}
                className={`auth-message ${messageType}`}
                role="status"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            className="auth-submit"
            whileHover={{ scale: loading ? 1 : 1.015 }}
            whileTap={{ scale: loading ? 1 : 0.985 }}
            disabled={loading}
          >
            <span>
              {loading
                ? 'Please wait...'
                : action === 'Login'
                  ? 'Sign in'
                  : 'Create account'}
            </span>

            {!loading && <FiArrowRight />}
            {loading && <span className="auth-spinner" />}
          </motion.button>
        </form>

        <div className="auth-divider">
          <span />
          <p>YOUR SPACE, YOUR JOURNEY</p>
          <span />
        </div>

        <p className="auth-footer">
          {action === 'Login'
            ? "Don't have an account? "
            : 'Already have an account? '}

          <button
            type="button"
            onClick={() =>
              switchAction(action === 'Login' ? 'Sign Up' : 'Login')
            }
          >
            {action === 'Login' ? 'Create one' : 'Sign in'}
          </button>
        </p>
      </motion.section>

      <p className="auth-copyright">
        © {new Date().getFullYear()} YourSpace. All rights reserved.
      </p>
    </main>
  );
};

export default LoginSignup;
