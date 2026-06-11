import React, { useState, useEffect } from 'react';
import SEO from '../../components/SEO';
import { activityAPI } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import './Management.css';

const resourceIcons = {
  reservation: '📅',
  menu: '🍽️',
  customer: '👤',
  testimonial: '⭐',
  contact: '✉️',
  auth: '🔐',
};

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await activityAPI.getAll({ limit: 100 });
      setLogs(res.data);
    } catch (err) {
      console.error('Failed to load activity logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = filter === 'all' ? logs : logs.filter((l) => l.resource === filter);

  if (loading) return <LoadingSpinner text="Loading activity log..." />;

  return (
    <>
      <SEO title="Activity Log" />

      <div className="management-header">
        <div>
          <h1>Activity Log</h1>
          <p>Track all actions performed in the admin panel</p>
        </div>
        <div className="filter-tabs">
          {['all', 'reservation', 'menu', 'customer', 'testimonial', 'contact', 'auth'].map((f) => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : resourceIcons[f] + ' ' + f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="management-table">
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Description</th>
              <th>Resource</th>
              <th>Admin</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} className="empty-cell">No activity recorded yet</td></tr>
            ) : filtered.map((log) => (
              <tr key={log._id}>
                <td data-label="Action">
                  <span className="badge" style={{ background: 'var(--secondary)', color: '#fff' }}>
                    {log.action}
                  </span>
                </td>
                <td data-label="Description" style={{ maxWidth: 400 }}>{log.description}</td>
                <td data-label="Resource">
                  <span className="badge badge-category">
                    {resourceIcons[log.resource]} {log.resource}
                  </span>
                </td>
                <td data-label="Admin">{log.admin?.name || 'System'}</td>
                <td data-label="Date & Time" style={{ whiteSpace: 'nowrap', fontSize: '0.85rem' }}>
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ActivityLog;
