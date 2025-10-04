import axios from 'axios';
import React, { useState } from 'react';

const Create = ({ setShowModal }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/create', formData)
      .then(response => {
        console.log('User created successfully:', response.data);
        setSuccessMessage('User created successfully!'); // Set success message
        setFormData({ username: '', email: '', password: '' }); // Reset form
        setShowModal(false); // Close the modal
      })
      .catch(error => {
        console.error('There was an error creating the user:', error);
        alert('Failed to create the user. Please try again.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Submit</button>
      {successMessage && <div className="text-center mt-2 text-success">{successMessage}</div>}
    </form>
  );
};

export default Create;
