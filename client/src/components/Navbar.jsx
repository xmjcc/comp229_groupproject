// client/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt_token');
  const handleSignout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav style={{padding:'10px', background:'#eee'}}>
      <Link to="/">Home</Link> {' | '}
      <Link to="/surveys">Surveys</Link> {' | '}
      {token ? (
        <>
          <Link to="/profile">My Profile</Link> {' | '}
          <button onClick={handleSignout}>Sign Out</button>
        </>
      ) : (
        <>
          <Link to="/signup">Sign Up</Link> {' | '}
          <Link to="/signin">Sign In</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
