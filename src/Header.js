import React from "react";
import logo from "./logo.jpg";
import Index from "./index.css";

const Header = () => {
  return (
    <nav className="header">
      <img src={logo} alt="LOGO" style={{ width: "600px" }} />
      <div className="musicwave">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </nav>
  );
};

export default Header;
