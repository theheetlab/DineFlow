import React, { useState } from 'react';
import SEO from '../components/SEO';
import { contactAPI } from '../services/api';
import { useToast } from '../components/Toast';
import './Contact.css';

const Contact = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await contactAPI.send(formData);
      addToast('Message sent successfully! We will get back to you soon.', 'success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to send message';
      addToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Contact Us" description="Get in touch with DineFlow. Find our address, phone number, business hours, and send us a message." />

      <section className="page-hero">
        <h1>Contact Us</h1>
        <p>We would love to hear from you</p>
      </section>

      <section className="contact-section section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>Have a question, feedback, or want to plan a special event? We are here to help.</p>

              <div className="contact-details">
                <div className="contact-detail">
                  <span className="detail-icon">📍</span>
                  <div>
                    <strong>Address</strong>
                    <p>123 Gourmet Street<br />New York, NY 10001</p>
                  </div>
                </div>
                <div className="contact-detail">
                  <span className="detail-icon">📞</span>
                  <div>
                    <strong>Phone</strong>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="contact-detail">
                  <span className="detail-icon">✉️</span>
                  <div>
                    <strong>Email</strong>
                    <p>hello@dineflow.com</p>
                  </div>
                </div>
                <div className="contact-detail">
                  <span className="detail-icon">🕐</span>
                  <div>
                    <strong>Business Hours</strong>
                    <p>Monday - Friday: 11AM - 10PM</p>
                    <p>Saturday - Sunday: 10AM - 11PM</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>Phone (Optional)</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us more about your inquiry..." rows={5} required />
              </div>
              <button type="submit" className="btn btn-primary btn-lg" disabled={submitting} style={{ width: '100%' }}>
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="contact-map">
            <iframe
              title="DineFlow Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.1197639735327!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
