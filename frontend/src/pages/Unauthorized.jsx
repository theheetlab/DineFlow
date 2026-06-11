import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './ErrorPage.css';

const Unauthorized = () => {
  return (
    <>
      <SEO title="401 - Unauthorized" />
      <div className="error-page">
        <div className="error-container">
          <span className="error-code">401</span>
          <h1>Unauthorized Access</h1>
          <p>You need to log in with admin credentials to access this page.</p>
          <div className="error-actions">
            <Link to="/admin/login" className="btn btn-primary">Login</Link>
            <Link to="/" className="btn btn-secondary">Go Home</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
