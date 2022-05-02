import React from "react";
import { Link } from "react-router-dom";
import './style.css';

const Footer = () => {
  return (
        <div className="fixed-bottom footer-height p-2 w-100 text-center bg-primary d-flex justify-content-center">
                <div className="fake-height"></div>
                <p className="text-warning mb-0 d-none d-md-inline">
                    CS4550 Final Project by Amy Min, McKelvie Smith, Shreya Mitra, and Bayden Ibrahim
                </p>
                <Link to="/privacy"
                        className="ps-md-5 text-warning float-end">
                    Privacy Policy
                </Link>
        </div>
  );
}

export default Footer;