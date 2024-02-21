import React, { useState } from 'react';

const UpdateUser = ({ users }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: '',
  });
  const [userId, setUserId] = useState('');

  const handleChange = (e) => {
    setUserId(e.target.value);
    const user = users.find(user => user._id === e.target.value);
    setUserData({
      username: user.username,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/updateuser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Update User</h2>
      <select value={userId} onChange={handleChange}>
        <option value="">Select a user</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>{user.username}</option>
        ))}
      </select>
      {userId && (
        <form onSubmit={handleUpdateUser}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Avatar URL:</label>
            <input
              type="text"
              name="avatar"
              value={userData.avatar}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Update User</button>
        </form>
      )}
    </div>
  );
};

export default UpdateUser;
