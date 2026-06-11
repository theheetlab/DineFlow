import React, { useState, useEffect } from 'react';
import SEO from '../../components/SEO';
import { contactAPI, exportAPI } from '../../services/api';
import { useToast } from '../../components/Toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import './Management.css';

const statusOptions = ['all', 'unread', 'read', 'replied', 'archived'];
const statusColors = {
  unread: '#f59e0b',
  read: '#3b82f6',
  replied: '#10b981',
  archived: '#6b7280',
};

const ContactManagement = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const res = await contactAPI.getAll(params);
      setMessages(res.data);
    } catch (err) {
      addToast('Failed to load messages', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await contactAPI.updateStatus(id, status);
      addToast(`Message marked as ${status}`, 'success');
      fetchMessages();
    } catch (err) {
      addToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await contactAPI.delete(id);
      addToast('Message deleted', 'success');
      if (selectedMessage?._id === id) setSelectedMessage(null);
      fetchMessages();
    } catch (err) {
      addToast('Failed to delete message', 'error');
    }
  };

  const handleExport = async () => {
    try {
      const res = await exportAPI.contacts();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `contacts-${Date.now()}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      addToast('Contacts exported successfully', 'success');
    } catch (err) {
      addToast('Failed to export contacts', 'error');
    }
  };

  if (loading) return <LoadingSpinner text="Loading messages..." />;

  const getCountByStatus = (status) => messages.filter((m) => m.status === status).length;

  return (
    <>
      <SEO title="Contact Messages" />

      <div className="management-header">
        <div>
          <h1>Contact Messages</h1>
          <p>{messages.filter((m) => m.status === 'unread').length} unread messages</p>
        </div>
        <button className="btn btn-secondary" onClick={handleExport}>
          Export CSV
        </button>
      </div>

      <div className="filter-tabs" style={{ marginBottom: 20 }}>
        {statusOptions.map((s) => (
          <button
            key={s}
            className={`filter-tab ${filter === s ? 'active' : ''}`}
            onClick={() => { setFilter(s); setLoading(true); }}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
            {s !== 'all' && ` (${getCountByStatus(s)})`}
          </button>
        ))}
      </div>

      <div className="management-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 ? (
              <tr><td colSpan={6} className="empty-cell">No messages found</td></tr>
            ) : messages.map((m) => (
              <tr key={m._id}>
                <td data-label="Name" style={{ fontWeight: m.status === 'unread' ? 'bold' : 'normal' }}>{m.name}</td>
                <td data-label="Email">{m.email}</td>
                <td data-label="Subject">{m.subject}</td>
                <td data-label="Date">{new Date(m.createdAt).toLocaleDateString()}</td>
                <td data-label="Status">
                  <span className="badge" style={{ background: statusColors[m.status] || '#888', color: '#fff' }}>
                    {m.status}
                  </span>
                </td>
                <td data-label="Actions">
                  <div className="table-actions">
                    <button className="btn btn-sm btn-secondary" onClick={() => setSelectedMessage(m)}>View</button>
                    {m.status === 'unread' && (
                      <button className="btn btn-sm btn-secondary" onClick={() => handleStatus(m._id, 'read')}>Mark Read</button>
                    )}
                    {m.status === 'read' && (
                      <button className="btn btn-sm btn-secondary" onClick={() => handleStatus(m._id, 'replied')}>Mark Replied</button>
                    )}
                    {m.status !== 'archived' && (
                      <button className="btn btn-sm btn-secondary" onClick={() => handleStatus(m._id, 'archived')}>Archive</button>
                    )}
                    <button className="btn btn-sm btn-secondary" style={{ color: '#ef4444' }} onClick={() => handleDelete(m._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMessage && (
        <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <button className="modal-close" onClick={() => setSelectedMessage(null)}>✕</button>
            <div className="modal-body">
              <h2>{selectedMessage.subject}</h2>
              <div className="customer-details">
                <p><strong>From:</strong> {selectedMessage.name}</p>
                <p><strong>Email:</strong> {selectedMessage.email}</p>
                {selectedMessage.phone && <p><strong>Phone:</strong> {selectedMessage.phone}</p>}
                <p><strong>Status:</strong> <span className="badge" style={{ background: statusColors[selectedMessage.status], color: '#fff' }}>{selectedMessage.status}</span></p>
                <p><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</p>
              </div>
              <div className="message-content" style={{ marginTop: 20, padding: 16, background: 'var(--bg-secondary)', borderRadius: 8, lineHeight: 1.8 }}>
                {selectedMessage.message}
              </div>
              <div className="form-actions" style={{ marginTop: 20 }}>
                {selectedMessage.status === 'unread' && (
                  <button className="btn btn-primary" onClick={() => { handleStatus(selectedMessage._id, 'read'); setSelectedMessage({ ...selectedMessage, status: 'read' }); }}>
                    Mark as Read
                  </button>
                )}
                {selectedMessage.status === 'read' && (
                  <button className="btn btn-primary" onClick={() => { handleStatus(selectedMessage._id, 'replied'); setSelectedMessage({ ...selectedMessage, status: 'replied' }); }}>
                    Mark as Replied
                  </button>
                )}
                <button className="btn btn-secondary" onClick={() => setSelectedMessage(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactManagement;
