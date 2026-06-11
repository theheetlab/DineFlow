import React, { useState, useEffect } from 'react';
import SEO from '../../components/SEO';
import { testimonialAPI } from '../../services/api';
import { useToast } from '../../components/Toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import './Management.css';

const initialForm = { name: '', role: '', content: '', rating: 5, image: '', isActive: true };

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const { addToast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await testimonialAPI.getAll();
      setTestimonials(res.data);
    } catch (err) {
      addToast('Failed to load testimonials', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await testimonialAPI.update(editing, form);
        addToast('Testimonial updated successfully', 'success');
      } else {
        await testimonialAPI.create(form);
        addToast('Testimonial created successfully', 'success');
      }
      setShowForm(false);
      setEditing(null);
      setForm(initialForm);
      fetchTestimonials();
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Operation failed';
      addToast(msg, 'error');
    }
  };

  const handleEdit = (t) => {
    setForm({
      name: t.name, role: t.role, content: t.content,
      rating: t.rating, image: t.image || '', isActive: t.isActive,
    });
    setEditing(t._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await testimonialAPI.delete(id);
      addToast('Testimonial deleted', 'success');
      fetchTestimonials();
    } catch (err) {
      addToast('Failed to delete testimonial', 'error');
    }
  };

  if (loading) return <LoadingSpinner text="Loading testimonials..." />;

  return (
    <>
      <SEO title="Testimonial Management" />

      <div className="management-header">
        <div>
          <h1>Testimonial Management</h1>
          <p>Manage customer testimonials and reviews</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setShowForm(true); setEditing(null); setForm(initialForm); }}>
          Add Testimonial
        </button>
      </div>

      {showForm && (
        <form className="management-form" onSubmit={handleSubmit}>
          <h2>{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Customer Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input type="text" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Customer, Food Critic..." />
            </div>
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={4} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Rating (1-5)</label>
              <select value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          <div className="form-checkboxes">
            <label className="checkbox-label">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
              Active (visible on website)
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'}</button>
            <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</button>
          </div>
        </form>
      )}

      <div className="management-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Content</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.length === 0 ? (
              <tr><td colSpan={6} className="empty-cell">No testimonials yet</td></tr>
            ) : testimonials.map((t) => (
              <tr key={t._id}>
                <td data-label="Name"><strong>{t.name}</strong></td>
                <td data-label="Role">{t.role}</td>
                <td data-label="Content" className="td-content">{t.content.substring(0, 80)}...</td>
                <td data-label="Rating">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</td>
                <td data-label="Status">
                  <span className={`badge ${t.isActive ? 'badge-success' : 'badge-danger'}`}>
                    {t.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td data-label="Actions">
                  <div className="table-actions">
                    <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(t)}>Edit</button>
                    <button className="btn btn-sm btn-secondary" style={{ color: '#ef4444' }} onClick={() => handleDelete(t._id)}>Delete</button>
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

export default TestimonialManagement;
