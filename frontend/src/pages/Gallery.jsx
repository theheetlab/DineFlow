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
  { src: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'restaurant', title: 'Main Dining Room' },
  { src: 'https://images.pexels.com/photos/827528/pexels-photo-827528.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'restaurant', title: 'Elegant Interior' },
  { src: 'https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'restaurant', title: 'Bar Area' },
  { src: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'food', title: 'Grilled Specialties' },
  { src: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'food', title: 'Fresh Salads' },
  { src: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'food', title: 'Artisan Pizza' },
  { src: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'food', title: 'Dessert Presentation' },
  { src: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'food', title: 'Seafood Platter' },
  { src: 'https://images.pexels.com/photos/265947/pexels-photo-265947.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'events', title: 'Wedding Reception' },
  { src: 'https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'events', title: 'Corporate Event' },
  { src: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'events', title: 'Birthday Celebration' },
  { src: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'restaurant', title: 'Private Dining' },
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
