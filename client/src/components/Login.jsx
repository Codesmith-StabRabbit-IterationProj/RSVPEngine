import React, { useState } from 'react';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useOutletContext();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/savedEvents/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'applcation/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const loggedIn = await response.json(); // response will be array of objects
      // some conditional to check if login was successful from backend
      if (loggedIn) {
        await setUser(username);
        navigate('/form');
      } else {
        console.log('Username and/or password incorrect');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username: </label>
          <input type='text' onChange={handleUsername} value={username}></input>
        </div>
        <div>
          <label>Password: </label>
          <input type='password' onChange={handlePassword} value={password}></input>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
