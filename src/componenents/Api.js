import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Api() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Fetch users from PHP backend
  useEffect(() => {
    axios.get('http://localhost/backend/index.php')
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  }, []);

  // Submit user data to PHP backend
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost/backend/index.php', { username, password })
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Users:</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Api;
