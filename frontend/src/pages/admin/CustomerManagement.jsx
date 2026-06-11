import React, { useState, useEffect } from 'react';
import SEO from '../../components/SEO';
import { customerAPI, exportAPI } from '../../services/api';
import { useToast } from '../../components/Toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import './Management.css';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async (query = '') => {
    try {
      const params = {};
      if (query) params.search = query;
      const res = await customerAPI.getAll(params);
      setCustomers(res.data);
    } catch (err) {
      addToast('Failed to load customers', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    if (val.length > 2 || val.length === 0) {
      fetchCustomers(val);
    }
  };

  const viewCustomer = async (id) => {
    try {
      const res = await customerAPI.getOne(id);
      setSelectedCustomer(res.data);
    } catch (err) {
      addToast('Failed to load customer details', 'error');
    }
  };

  if (loading) return <LoadingSpinner text="Loading customers..." />;

  return (
    <>
      <SEO title="Customer Management" />

      <div className="management-header">
        <div>
          <h1>Customer Management</h1>
          <p>View and manage restaurant customers</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-sm btn-secondary" onClick={async () => {
          try {
            const res = await exportAPI.customers();
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = `customers-${Date.now()}.csv`;
            a.click();
            window.URL.revokeObjectURL(url);
            addToast('Customers exported successfully', 'success');
          } catch (err) {
            addToast('Failed to export customers', 'error');
          }
        }}>Export CSV</button>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
      </div>

      <div className="management-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Total Visits</th>
              <th>Last Visit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr><td colSpan={6} className="empty-cell">No customers found</td></tr>
            ) : customers.map((c) => (
              <tr key={c._id}>
                <td data-label="Name"><strong>{c.name}</strong></td>
                <td data-label="Email">{c.email}</td>
                <td data-label="Phone">{c.phone}</td>
                <td data-label="Total Visits">{c.totalVisits}</td>
                <td data-label="Last Visit">{c.lastVisit ? new Date(c.lastVisit).toLocaleDateString() : '—'}</td>
                <td data-label="Actions">
                  <button className="btn btn-sm btn-secondary" onClick={() => viewCustomer(c._id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCustomer && (
        <div className="modal-overlay" onClick={() => setSelectedCustomer(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <button className="modal-close" onClick={() => setSelectedCustomer(null)}>✕</button>
            <div className="modal-body">
              <h2>{selectedCustomer.customer.name}</h2>
              <div className="customer-details">
                <p><strong>Email:</strong> {selectedCustomer.customer.email}</p>
                <p><strong>Phone:</strong> {selectedCustomer.customer.phone}</p>
                <p><strong>Total Visits:</strong> {selectedCustomer.customer.totalVisits}</p>
                <p><strong>Last Visit:</strong> {selectedCustomer.customer.lastVisit ? new Date(selectedCustomer.customer.lastVisit).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Member Since:</strong> {new Date(selectedCustomer.customer.createdAt).toLocaleDateString()}</p>
              </div>
              <h3 style={{ marginTop: 20, marginBottom: 12 }}>Reservation History</h3>
              {selectedCustomer.reservations.length === 0 ? (
                <p style={{ color: 'var(--text-light)' }}>No reservations yet</p>
              ) : (
                <div className="history-list">
                  {selectedCustomer.reservations.map((r) => (
                    <div key={r._id} className="history-item">
                      <span>{new Date(r.date).toLocaleDateString()} - {r.time}</span>
                      <span className="badge" style={{
                        background: r.status === 'confirmed' ? '#10b981' : r.status === 'pending' ? '#f59e0b' : r.status === 'completed' ? '#3b82f6' : '#ef4444',
                        color: '#fff',
                      }}>{r.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerManagement;
