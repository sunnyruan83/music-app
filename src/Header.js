import React from 'react';
import logo from './logo.jpg';

const Header = () => {
  return (
    <nav className="header">
     <img
        src={logo}
        alt="LOGO"
        style={{ width: '600px' }}
      />
    </nav>
  );
};

export default Header;
