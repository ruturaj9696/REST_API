import React, { useState, useEffect } from 'react';
import UpdateUser from './UpdateUser';

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    avatar: '',
  });

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/allusers');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleNewUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handlePostUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/postoneuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      console.log(data);
      // Refresh the list of users after posting a new user
      const updatedUsers = [...users, data.user];
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div>
        <h1>All Users</h1>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.username} - {user.email}
            </li>
          ))}
        </ul>

        <h2>Add New User</h2>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={newUser.username}
          onChange={handleNewUserChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={newUser.email}
          onChange={handleNewUserChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={newUser.password}
          onChange={handleNewUserChange}
        />
        <input
          type="text"
          placeholder="Avatar URL"
          name="avatar"
          value={newUser.avatar}
          onChange={handleNewUserChange}
        />
        <button onClick={handlePostUser}>Add User</button>
      </div>
      
      <UpdateUser users={users} />
    </>
  );
};

export default App;
