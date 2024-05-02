import { Outlet, Link } from 'react-router-dom';
import React, { useState } from 'react';

const App = () => {
  const [user, setUser] = useState('');
  return (
    <div className='app'>
      <div>RSVPEngine</div>
      <div>
        <Outlet context={[user, setUser]} />
      </div>
    </div>
  );
};

export default App;
