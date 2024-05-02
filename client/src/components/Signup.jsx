import { useState } from 'react';
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
      console.log(username, password);
      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const signedUp = await response.json(); // true or false
      console.log('res', signedUp);
      // some conditional to check if login was successful from backend
      if (signedUp === true) {
        navigate('/');
      } else {
        alert('Username already exists');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label>Username: </label>
          <input type='text' onChange={handleUsername} value={username}></input>
        </div>
        <div>
          <label>Password: </label>
          <input type='password' onChange={handlePassword} value={password}></input>
        </div>
        <button className='btn-primary' type='submit'>
          Signup
        </button>
      </form>
    </div>
  );
}
