import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'applcation/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const signedUp = await response.json(); // response will be array of objects
      // some conditional to check if login was successful from backend
      if (signedUp) {
        navigate('/login');
      } else {
        alert('Error signing up account');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Sign Up Page</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label>Username: </label>
          <input type='text' onChange={handleUsername} value={username}></input>
        </div>
        <div>
          <label>Password: </label>
          <input type='password' onChange={handlePassword} value={password}></input>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
}
