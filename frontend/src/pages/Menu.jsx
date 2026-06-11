import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import { menuAPI } from '../services/api';
import { formatCurrency, categories, sortOptions, truncate } from '../utils/helpers';
import { MenuSkeleton } from '../components/Skeleton';
import './Menu.css';

const Menu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const fetchItems = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category !== 'all') params.category = category;
        if (sort) params.sort = sort;
        if (search) params.search = search;

        const res = await menuAPI.getAll(params);
        if (!mountedRef.current) return;
        setItems(res.data);
      } catch (err) {
        if (!mountedRef.current) return;
        if (err.response?.status !== 429) console.error('Failed to load menu:', err);
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    };

    const debounce = setTimeout(fetchItems, 300);
    return () => {
      mountedRef.current = false;
      clearTimeout(debounce);
    };
  }, [category, sort, search]);

  return (
    <>
      <SEO title="Our Menu" description="Explore our carefully curated menu featuring appetizers, main courses, desserts, and more." />

      <section className="page-hero">
        <h1>Our Menu</h1>
        <p>Discover a world of flavors crafted by our expert chefs</p>
      </section>

      <section className="menu-section section">
        <div className="container">
          <div className="menu-controls">
            <div className="menu-search">
              <input
                type="text"
                placeholder="Search dishes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="menu-filters">
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {sortOptions.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <MenuSkeleton />
          ) : items.length === 0 ? (
            <div className="empty-state">
              <h3>No dishes found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="menu-grid">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="menu-item card"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="menu-item-image">
                    <img src={item.image} alt={item.name} loading="lazy" />
                    {item.isBestSeller && <span className="menu-badge best-seller">Best Seller</span>}
                    {!item.isAvailable && <div className="menu-unavailable">Unavailable</div>}
                  </div>
                  <div className="menu-item-body">
                    <div className="menu-item-header">
                      <h3>{item.name}</h3>
                      <span className="menu-item-price">{formatCurrency(item.price)}</span>
                    </div>
                    <p>{truncate(item.description, 120)}</p>
                    <div className="menu-item-footer">
                      <span className="menu-item-category">{item.category}</span>
                      <span className="menu-item-rating">
                        {'★'.repeat(Math.floor(item.rating))}
                        {'☆'.repeat(5 - Math.floor(item.rating))}
                        <span> {item.rating}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>✕</button>
            <div className="modal-image">
              <img src={selectedItem.image} alt={selectedItem.name} />
            </div>
            <div className="modal-body">
              <div className="modal-header">
                <h2>{selectedItem.name}</h2>
                <span className="modal-price">{formatCurrency(selectedItem.price)}</span>
              </div>
              <p className="modal-description">{selectedItem.description}</p>
              <div className="modal-meta">
                <span className="modal-category">{selectedItem.category}</span>
                <span className="modal-rating">
                  {'★'.repeat(Math.floor(selectedItem.rating))}
                  {'☆'.repeat(5 - Math.floor(selectedItem.rating))}
                  <span> {selectedItem.rating}</span>
                </span>
              </div>
              {selectedItem.isAvailable && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedItem(null);
                    window.location.href = '/reservation';
                  }}
                >
                  Reserve This Dish
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
