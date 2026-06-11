import React, { useState, useEffect, useRef } from 'react';
import SEO from '../../components/SEO';
import { menuAPI, uploadAPI } from '../../services/api';
import { formatCurrency, categories } from '../../utils/helpers';
import { useToast } from '../../components/Toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import './Management.css';

const initialForm = {
  name: '', description: '', price: '', category: 'appetizers',
  image: '', isFeatured: false, isBestSeller: false, isAvailable: true,
};

const MenuManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { addToast } = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await menuAPI.getAll();
      setItems(res.data);
    } catch (err) {
      addToast('Failed to load menu items', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await menuAPI.update(editing, form);
        addToast('Menu item updated successfully', 'success');
      } else {
        await menuAPI.create(form);
        addToast('Menu item created successfully', 'success');
      }
      setShowForm(false);
      setEditing(null);
      setForm(initialForm);
      fetchItems();
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Operation failed';
      addToast(msg, 'error');
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image || '',
      isFeatured: item.isFeatured,
      isBestSeller: item.isBestSeller,
      isAvailable: item.isAvailable,
    });
    setEditing(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await menuAPI.delete(id);
      addToast('Menu item deleted', 'success');
      fetchItems();
    } catch (err) {
      addToast('Failed to delete item', 'error');
    }
  };

  if (loading) return <LoadingSpinner text="Loading menu..." />;

  return (
    <>
      <SEO title="Menu Management" />
      <div className="management-header">
        <div>
          <h1>Menu Management</h1>
          <p>Manage your restaurant menu items</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setShowForm(true); setEditing(null); setForm(initialForm); }}>
          Add New Dish
        </button>
      </div>

      {showForm && (
        <form className="management-form" onSubmit={handleSubmit}>
          <h2>{editing ? 'Edit Dish' : 'Add New Dish'}</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Dish Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Price ($)</label>
              <input type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {categories.filter((c) => c.value !== 'all').map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          <div className="form-group">
            <label>Or Upload Image</label>
            <div className="upload-area">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setUploading(true);
                  try {
                    const res = await uploadAPI.uploadImage(file);
                    setForm({ ...form, image: res.data.url });
                    addToast('Image uploaded successfully', 'success');
                  } catch (err) {
                    addToast('Failed to upload image. You can still paste a URL.', 'error');
                  } finally {
                    setUploading(false);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }
                }}
                disabled={uploading}
              />
              {uploading && <span className="uploading-text">Uploading...</span>}
              {form.image && (
                <div className="upload-preview">
                  <img src={form.image} alt="Preview" />
                  <button type="button" onClick={() => setForm({ ...form, image: '' })}>Remove</button>
                </div>
              )}
            </div>
          </div>
          <div className="form-checkboxes">
            <label className="checkbox-label">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
              Featured Dish
            </label>
            <label className="checkbox-label">
              <input type="checkbox" checked={form.isBestSeller} onChange={(e) => setForm({ ...form, isBestSeller: e.target.checked })} />
              Best Seller
            </label>
            <label className="checkbox-label">
              <input type="checkbox" checked={form.isAvailable} onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })} />
              Available
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editing ? 'Update Dish' : 'Create Dish'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setEditing(null); }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="management-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan={7} className="empty-cell">No menu items yet</td></tr>
            ) : items.map((item) => (
              <tr key={item._id}>
                <td data-label="Image">
                  {item.image ? <img src={item.image} alt={item.name} className="table-thumb" /> : '—'}
                </td>
                <td data-label="Name"><strong>{item.name}</strong></td>
                <td data-label="Category"><span className="badge badge-category">{item.category}</span></td>
                <td data-label="Price">{formatCurrency(item.price)}</td>
                <td data-label="Status">
                  <span className={`badge ${item.isAvailable ? 'badge-success' : 'badge-danger'}`}>
                    {item.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td data-label="Featured">{item.isFeatured ? '⭐' : '—'}</td>
                <td data-label="Actions">
                  <div className="table-actions">
                    <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(item)}>Edit</button>
                    <button className="btn btn-sm btn-secondary" style={{ color: '#ef4444' }} onClick={() => handleDelete(item._id)}>Delete</button>
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

export default MenuManagement;
