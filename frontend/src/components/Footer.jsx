import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">D</span>
              <span className="logo-text">DineFlow</span>
            </div>
            <p className="footer-tagline">
              Smart Restaurant Management & Reservation Platform. Experience fine dining reimagined.
            </p>
            <div className="footer-social">
              <a href="#facebook" aria-label="Facebook">FB</a>
              <a href="#instagram" aria-label="Instagram">IG</a>
              <a href="#twitter" aria-label="Twitter">TW</a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/reservation">Reservations</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-links">
            <h4>Hours</h4>
            <p>Monday - Friday</p>
            <p>11:00 AM - 10:00 PM</p>
            <p className="hours-spacer">Saturday - Sunday</p>
            <p>10:00 AM - 11:00 PM</p>
          </div>

          <div className="footer-links">
            <h4>Contact</h4>
            <p>123 Gourmet Street</p>
            <p>New York, NY 10001</p>
            <p className="hours-spacer">+1 (555) 123-4567</p>
            <p>hello@dineflow.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} DineFlow. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/about">Privacy Policy</Link>
            <Link to="/about">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
