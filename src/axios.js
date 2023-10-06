// src/User.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const User = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    // Add other user properties here
  });

  useEffect(() => {
    // Fetch users from the API
    axios.get(API_URL)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const addUser = () => {
    // Add new user to the API
    axios.post(API_URL, newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({
          name: '',
          email: '',
          // Add other user properties here
        });
      })
      .catch(error => {
        console.error('Error adding user: ', error);
      });
  };

  const deleteUser = (id) => {
    // Delete user from the API
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error('Error deleting user: ', error);
      });
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add User</h2>
      <div>
        <input type="text" name="name" placeholder="Name" value={newUser.name} onChange={handleInputChange} />
        <input type="text" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} />
        {/* Add other input fields for user properties */}
        <button onClick={addUser}>Add User</button>
      </div>
    </div>
  );
};

export default User;
