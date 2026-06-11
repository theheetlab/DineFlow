import React, { useState, useEffect } from 'react';
import SEO from '../../components/SEO';
import { reservationAPI, exportAPI } from '../../services/api';
import { formatDate, formatTime, getStatusColor } from '../../utils/helpers';
import { useToast } from '../../components/Toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import './Management.css';

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { addToast } = useToast();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const params = {};
      if (filter !== 'all') params.status = filter;
      const res = await reservationAPI.getAll(params);
      setReservations(res.data);
    } catch (err) {
      addToast('Failed to load reservations', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await reservationAPI.update(id, { status });
      addToast(`Reservation ${status} successfully`, 'success');
      fetchReservations();
    } catch (err) {
      addToast('Failed to update reservation', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this reservation?')) return;
    try {
      await reservationAPI.delete(id);
      addToast('Reservation deleted', 'success');
      fetchReservations();
    } catch (err) {
      addToast('Failed to delete reservation', 'error');
    }
  };

  const handleExport = async () => {
    try {
      const params = {};
      if (filter !== 'all') params.status = filter;
      const res = await exportAPI.reservations(params);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `reservations-${Date.now()}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      addToast('Reservations exported successfully', 'success');
    } catch (err) {
      addToast('Failed to export reservations', 'error');
    }
  };

  if (loading) return <LoadingSpinner text="Loading reservations..." />;

  return (
    <>
      <SEO title="Reservation Management" />

      <div className="management-header">
        <div>
          <h1>Reservation Management</h1>
          <p>Manage all table reservations</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-sm btn-secondary" onClick={handleExport}>Export CSV</button>
          <div className="filter-tabs">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((f) => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? 'active' : ''}`}
              onClick={() => { setFilter(f); setLoading(true); }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
            ))}
          </div>
        </div>
      </div>

      <div className="management-table">
        <table>
          <thead>
            <tr>
              <th>Guest</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr><td colSpan={8} className="empty-cell">No reservations found</td></tr>
            ) : reservations.map((r) => (
              <tr key={r._id}>
                <td data-label="Guest"><strong>{r.contactName}</strong></td>
                <td data-label="Email">{r.contactEmail}</td>
                <td data-label="Phone">{r.contactPhone}</td>
                <td data-label="Date">{formatDate(r.date)}</td>
                <td data-label="Time">{formatTime(r.time)}</td>
                <td data-label="Guests">{r.guests}</td>
                <td data-label="Status">
                  <span className="badge" style={{ background: getStatusColor(r.status), color: '#fff' }}>
                    {r.status}
                  </span>
                </td>
                <td data-label="Actions">
                  <div className="table-actions">
                    {r.status === 'pending' && (
                      <>
                        <button className="btn btn-sm" style={{ background: '#10b981', color: '#fff' }} onClick={() => handleStatus(r._id, 'confirmed')}>Confirm</button>
                        <button className="btn btn-sm" style={{ background: '#ef4444', color: '#fff' }} onClick={() => handleStatus(r._id, 'cancelled')}>Reject</button>
                      </>
                    )}
                    {r.status === 'confirmed' && (
                      <button className="btn btn-sm btn-secondary" onClick={() => handleStatus(r._id, 'completed')}>Complete</button>
                    )}
                    <button className="btn btn-sm btn-secondary" style={{ color: '#ef4444' }} onClick={() => handleDelete(r._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReservationManagement;
