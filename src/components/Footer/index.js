import React from "react";
import {Link} from "react-router-dom";
import './footer.css';

const Footer = () => {
  return (
      <div className="footer">
      <div>CS4550 Final Project by Amy Min, McKelvie Smith, Shreya Mitra, and Bayden Ibrahim</div> 
        <Link to="/privacy">
          Privacy Policy
        </Link>
      </div>
  );
}

export default Footer;