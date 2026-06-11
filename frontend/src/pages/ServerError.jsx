import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './ErrorPage.css';

const ServerError = () => {
  return (
    <>
      <SEO title="500 - Server Error" />
      <div className="error-page">
        <div className="error-container">
          <span className="error-code">500</span>
          <h1>Server Error</h1>
          <p>Something went wrong on our end. Please try again later.</p>
          <div className="error-actions">
            <Link to="/" className="btn btn-primary">Go Home</Link>
            <Link to="/contact" className="btn btn-secondary">Contact Support</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServerError;
