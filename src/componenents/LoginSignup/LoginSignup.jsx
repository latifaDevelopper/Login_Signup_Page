import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom';

import emailIcon from '../Assets/mail.png';
import passIcon from '../Assets/pass.png';
import userIcon from '../Assets/user.png';
import { motion, AnimatePresence } from 'framer-motion';

const LoginSignup = () => {
  const navigate = useNavigate();

  const [action, setAction] = useState('Login');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!emailInput || !passwordInput || (action === 'Sign Up' && !nameInput)) {
      setMessage('Please fill in all the required fields.');
      return;
    }

    try {
      let response;
      if (action === 'Login') {
        response = await axios.post('http://localhost:5000/log', {
          email: emailInput,
          password: passwordInput,
        });
      } else {
        response = await axios.post('http://localhost:5000/sig', {
          username: nameInput,
          email: emailInput,
          password: passwordInput,
        });
      }
      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        key={action}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <AnimatePresence mode="wait">
            {action === 'Sign Up' && (
              <motion.div
                className="input"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
              >
                <img src={userIcon} alt="name icon" />
                <input
                  type="text"
                  placeholder="Name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="input">
            <img src={emailIcon} alt="email icon" />
            <input
              type="email"
              placeholder="Email Id"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </div>

          <div className="input">
            <img src={passIcon} alt="password icon" />
            <input
              type="password"
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </div>
          </div>

    {action === 'Login' && (
  <div className="forgot-pass">
    Lost password? <span onClick={() => navigate('/forgot')}>Click Here!</span>
  </div>
)}


        {message && (
          <motion.div
            className="message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </motion.div>
        )}

        <div className="submit-container">
          <motion.div
            className={action === 'Login' ? 'submit gray' : 'submit'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAction('Sign Up')}
          >
            Sign Up
          </motion.div>
          <motion.div
            className={action === 'Sign Up' ? 'submit gray' : 'submit'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAction('Login')}
          >
            Login
          </motion.div>
        </div>

        <motion.div
          className="submit-button"
          onClick={handleSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          {action}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoginSignup;
