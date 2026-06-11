import React, { useState, useRef, useEffect } from 'react';
import { searchAPI } from '../services/api';
import './GlobalSearch.css';

const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (val) => {
    setQuery(val);
    if (val.length < 2) {
      setResults(null);
      setOpen(false);
      return;
    }
    try {
      const res = await searchAPI.global({ q: val });
      setResults(res.data);
      setOpen(true);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const totalResults = results
    ? results.customers.length + results.reservations.length + results.menuItems.length + results.testimonials.length
    : 0;

  return (
    <div className="global-search" ref={wrapperRef}>
      <div className="global-search-input">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search customers, reservations, menu..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => results && setOpen(true)}
        />
        {query && (
          <button className="search-clear" onClick={() => { setQuery(''); setResults(null); setOpen(false); }}>
            ✕
          </button>
        )}
      </div>

      {open && results && (
        <div className="global-search-results">
          {totalResults === 0 ? (
            <div className="search-no-results">No results found</div>
          ) : (
            <>
              {results.customers.length > 0 && (
                <div className="search-section">
                  <h4>Customers ({results.customers.length})</h4>
                  {results.customers.map((c) => (
                    <div key={c._id} className="search-item">
                      <span className="search-item-name">{c.name}</span>
                      <span className="search-item-detail">{c.email}</span>
                    </div>
                  ))}
                </div>
              )}
              {results.reservations.length > 0 && (
                <div className="search-section">
                  <h4>Reservations ({results.reservations.length})</h4>
                  {results.reservations.map((r) => (
                    <div key={r._id} className="search-item">
                      <span className="search-item-name">{r.contactName}</span>
                      <span className="search-item-detail">{new Date(r.date).toLocaleDateString()} - {r.status}</span>
                    </div>
                  ))}
                </div>
              )}
              {results.menuItems.length > 0 && (
                <div className="search-section">
                  <h4>Menu Items ({results.menuItems.length})</h4>
                  {results.menuItems.map((m) => (
                    <div key={m._id} className="search-item">
                      <span className="search-item-name">{m.name}</span>
                      <span className="search-item-detail">${m.price} - {m.category}</span>
                    </div>
                  ))}
                </div>
              )}
              {results.testimonials.length > 0 && (
                <div className="search-section">
                  <h4>Testimonials ({results.testimonials.length})</h4>
                  {results.testimonials.map((t) => (
                    <div key={t._id} className="search-item">
                      <span className="search-item-name">{t.name}</span>
                      <span className="search-item-detail">{'★'.repeat(t.rating)}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
