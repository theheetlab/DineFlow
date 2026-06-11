import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 40, text = 'Loading...' }) => {
  return (
    <div className="spinner-container">
      <div className="spinner" style={{ width: size, height: size }}></div>
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
