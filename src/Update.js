import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Update = ({ user, setShowModal }) => {
  const [formData, setFormData] = useState({
    username: user.username || '',
    email: user.email || '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      username: user.username || '',
      email: user.email || '',
      password: '',
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(`http://localhost:5000/update/${user.id}`, formData);
      console.log('User updated successfully:', response.data);
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error('There was an error updating the user:', error);
      alert('Failed to update the user. Please try again.');
    } finally {
      setLoading(false);
    }
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
      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        Update
      </button>
    </form>
  );
};

export default Update;
