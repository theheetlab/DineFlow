import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import GlobalSearch from '../../components/GlobalSearch';
import './AdminLayout.css';

const sidebarLinks = [
  { path: '/admin', label: 'Dashboard', icon: '📊' },
  { path: '/admin/menu', label: 'Menu', icon: '🍽️' },
  { path: '/admin/reservations', label: 'Reservations', icon: '📅' },
  { path: '/admin/customers', label: 'Customers', icon: '👥' },
  { path: '/admin/testimonials', label: 'Testimonials', icon: '⭐' },
  { path: '/admin/contacts', label: 'Messages', icon: '✉️' },
  { path: '/admin/activity', label: 'Activity Log', icon: '📋' },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/admin" className="sidebar-logo">
            <span className="logo-icon">D</span>
            <span className="logo-text">DineFlow</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sidebar-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="sidebar-link">
            <span className="sidebar-icon">🏠</span>
            View Website
          </Link>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <span></span><span></span><span></span>
          </button>

          <div className="admin-header-center">
            <GlobalSearch />
          </div>
          <div className="admin-header-right">
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <div className="admin-user">
              <span className="admin-user-name">{admin?.name}</span>
              <button className="btn btn-sm btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default AdminLayout;
