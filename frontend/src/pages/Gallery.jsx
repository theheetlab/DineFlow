import React, { useState } from 'react';
import SEO from '../components/SEO';
import './Gallery.css';

const galleryCategories = [
  { value: 'all', label: 'All' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'food', label: 'Food' },
  { value: 'events', label: 'Events' },
];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600', category: 'restaurant', title: 'Main Dining Room' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600', category: 'restaurant', title: 'Elegant Interior' },
  { src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=600', category: 'restaurant', title: 'Bar Area' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600', category: 'food', title: 'Grilled Specialties' },
  { src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600', category: 'food', title: 'Fresh Salads' },
  { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600', category: 'food', title: 'Artisan Pizza' },
  { src: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600', category: 'food', title: 'Dessert Presentation' },
  { src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600', category: 'food', title: 'Seafood Platter' },
  { src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600', category: 'events', title: 'Wedding Reception' },
  { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600', category: 'events', title: 'Corporate Event' },
  { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600', category: 'events', title: 'Birthday Celebration' },
  { src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600', category: 'restaurant', title: 'Private Dining' },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filtered = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <>
      <SEO title="Gallery" description="Explore our restaurant gallery featuring beautiful interiors, exquisite dishes, and memorable events." />

      <section className="page-hero">
        <h1>Our Gallery</h1>
        <p>A visual journey through the DineFlow experience</p>
      </section>

      <section className="gallery-section section">
        <div className="container">
          <div className="gallery-filters">
            {galleryCategories.map((cat) => (
              <button
                key={cat.value}
                className={`gallery-filter ${activeCategory === cat.value ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filtered.map((img, index) => (
              <div
                key={index}
                className="gallery-item"
                onClick={() => setSelectedImage(img)}
              >
                <img src={img.src} alt={img.title} loading="lazy" />
                <div className="gallery-overlay">
                  <span>{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImage(null)}>✕</button>
            <img src={selectedImage.src} alt={selectedImage.title} />
            <div className="gallery-modal-info">
              <h3>{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
