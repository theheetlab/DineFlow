import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { menuAPI, testimonialAPI } from '../services/api';
import { formatCurrency } from '../utils/helpers';
import './Home.css';

const Home = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const fetchData = async () => {
      try {
        const [menuRes, testimonialRes] = await Promise.all([
          menuAPI.getAll({ featured: 'true' }),
          testimonialAPI.getAll({ active: 'true' }),
        ]);
        if (!mountedRef.current) return;
        setFeaturedItems(menuRes.data.slice(0, 3));
        setTestimonials(testimonialRes.data.slice(0, 4));
      } catch (err) {
        if (!mountedRef.current) return;
        if (err.response?.status !== 429) console.error('Failed to load home data:', err);
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    };
    fetchData();

    return () => { mountedRef.current = false; };
  }, []);

  return (
    <>
      <SEO />

      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">Fine Dining Experience</span>
          <h1 className="hero-title">
            Where Every Meal
            <br />
            <span className="hero-highlight">Tells a Story</span>
          </h1>
          <p className="hero-subtitle">
            Experience exquisite cuisine crafted with passion. From our kitchen to your table,
            every dish is a masterpiece waiting to be discovered.
          </p>
          <div className="hero-actions">
            <Link to="/reservation" className="btn btn-primary btn-lg">
              Reserve a Table
            </Link>
            <Link to="/menu" className="btn btn-secondary btn-lg">
              View Our Menu
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">15+</span>
              <span className="hero-stat-label">Years Experience</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">200+</span>
              <span className="hero-stat-label">Menu Items</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">50K+</span>
              <span className="hero-stat-label">Happy Guests</span>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-dishes section">
        <div className="container">
          <h2 className="section-title">Featured Dishes</h2>
          <p className="section-subtitle">
            Discover our chef's specially curated selection of signature dishes
          </p>
          <div className="featured-grid">
            {featuredItems.map((item) => (
              <div key={item._id} className="featured-card card">
                <div className="featured-card-image">
                  <img src={item.image} alt={item.name} loading="lazy" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                  <span className="featured-badge">Featured</span>
                </div>
                <div className="featured-card-body">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="featured-card-footer">
                    <span className="featured-price">{formatCurrency(item.price)}</span>
                    <Link to="/menu" className="btn btn-primary btn-sm">Order Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="story section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <span className="story-badge">Our Story</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                A Journey of <span className="text-highlight">Flavors</span>
              </h2>
              <p>
                Founded in 2010, DineFlow began as a dream to bring world-class dining to our
                community. Our award-winning chefs combine traditional techniques with modern
                innovation to create unforgettable culinary experiences.
              </p>
              <p>
                Every ingredient is carefully sourced from local farms and global markets,
                ensuring each dish tells its own unique story of flavor and passion.
              </p>
              <Link to="/about" className="btn btn-primary">Learn More</Link>
            </div>
            <div className="story-image">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600"
                alt="Restaurant interior"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="features section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            We are committed to providing an exceptional dining experience
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🍽️</div>
              <h3>Exquisite Cuisine</h3>
              <p>Michelin-star chefs crafting innovative dishes using the finest ingredients</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Elegant Ambiance</h3>
              <p>Perfectly designed space for romantic dinners, business meetings, and celebrations</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍🍳</div>
              <h3>Expert Chefs</h3>
              <p>World-class culinary team dedicated to perfection in every plate</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎉</div>
              <h3>Private Events</h3>
              <p>Exclusive spaces for weddings, corporate events, and special occasions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3>Fresh Ingredients</h3>
              <p>Sustainably sourced local produce and premium imported specialties</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🍷</div>
              <h3>Curated Wine List</h3>
              <p>Extensive selection of fine wines from the world's best vineyards</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials section">
        <div className="container">
          <h2 className="section-title">What Our Guests Say</h2>
          <p className="section-subtitle">
            Real reviews from our valued guests
          </p>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t._id} className="testimonial-card card">
                <div className="testimonial-stars">
                  {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                </div>
                <p className="testimonial-content">"{t.content}"</p>
                <div className="testimonial-author">
                  {t.image && <img src={t.image} alt={t.name} onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />}
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reservation-cta section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready for an Unforgettable Experience?</h2>
            <p>Book your table now and join us for a culinary journey you will never forget.</p>
            <Link to="/reservation" className="btn btn-gold btn-lg">
              Make a Reservation
            </Link>
          </div>
        </div>
      </section>

      <section className="contact-cta section">
        <div className="container">
          <div className="cta-content cta-content-alt">
            <h2>Have Questions?</h2>
            <p>We would love to hear from you. Get in touch with our team.</p>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
