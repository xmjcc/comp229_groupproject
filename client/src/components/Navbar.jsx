import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt_token');
  
  const handleSignout = () => {
    localStorage.removeItem('jwt_token');
    navigate('/');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/surveys">Surveys</Link>
      {token ? (
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={handleSignout}>Sign Out</button>
        </>
      ) : (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
