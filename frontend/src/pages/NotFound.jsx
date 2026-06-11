import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './ErrorPage.css';

const NotFound = () => {
  return (
    <>
      <SEO title="404 - Page Not Found" />
      <div className="error-page">
        <div className="error-container">
          <span className="error-code">404</span>
          <h1>Page Not Found</h1>
          <p>The page you are looking for does not exist or has been moved.</p>
          <div className="error-actions">
            <Link to="/" className="btn btn-primary">Go Home</Link>
            <Link to="/menu" className="btn btn-secondary">View Menu</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
