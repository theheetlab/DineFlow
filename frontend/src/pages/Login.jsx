import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      addToast('Welcome back, Admin!', 'success');
      navigate('/admin');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      addToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Admin Login" />

      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <div className="login-logo">
              <span className="logo-icon">D</span>
            </div>
            <h1>Admin Login</h1>
            <p>Sign in to manage DineFlow</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="admin@dineflow.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="login-hint">
            Demo: admin@dineflow.com / Admin@123
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
