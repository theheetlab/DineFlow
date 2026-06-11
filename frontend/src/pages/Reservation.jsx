import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { reservationAPI, availabilityAPI } from '../services/api';
import { timeSlots, guestOptions, getTodayString } from '../utils/helpers';
import { useToast } from '../components/Toast';
import './Reservation.css';

const Reservation = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    specialRequests: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [availableSlots, setAvailableSlots] = useState([]);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [availabilityConfig, setAvailabilityConfig] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.date) errs.date = 'Date is required';
    if (!formData.time) errs.time = 'Time is required';
    if (!formData.contactName) errs.contactName = 'Name is required';
    if (!formData.contactEmail) errs.contactEmail = 'Email is required';
    if (!formData.contactPhone) errs.contactPhone = 'Phone is required';
    if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      errs.contactEmail = 'Invalid email';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  useEffect(() => {
    if (formData.date) {
      const fetchAvailability = async () => {
        setCheckingAvailability(true);
        try {
          const res = await availabilityAPI.check({ date: formData.date });
          setAvailableSlots(res.data.slots);
          setAvailabilityConfig(res.data.config);
          if (formData.time) {
            const slot = res.data.slots.find((s) => s.time === formData.time);
            if (slot && !slot.isAvailable) {
              setFormData((prev) => ({ ...prev, time: '' }));
              addToast('Selected time slot is no longer available', 'info');
            }
          }
        } catch (err) {
          console.error('Failed to check availability:', err);
        } finally {
          setCheckingAvailability(false);
        }
      };
      fetchAvailability();
    }
  }, [formData.date]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await reservationAPI.create(formData);
      addToast('Reservation submitted successfully! We will confirm shortly.', 'success');
      setFormData({
        date: '',
        time: '',
        guests: 2,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        specialRequests: '',
      });
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to submit reservation';
      addToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Make a Reservation" description="Book your table at DineFlow. Choose your date, time, and party size for an unforgettable dining experience." />

      <section className="page-hero">
        <h1>Make a Reservation</h1>
        <p>Book your table for an unforgettable dining experience</p>
      </section>

      <section className="reservation-section section">
        <div className="container">
          <div className="reservation-grid">
            <div className="reservation-info">
              <h2>Book Your Experience</h2>
              <p>
                Join us for a culinary journey that will delight your senses.
                Whether it is a romantic dinner, family celebration, or business meeting,
                we have the perfect table waiting for you.
              </p>
              <div className="reservation-details">
                <div className="reservation-detail">
                  <span className="detail-icon">🕐</span>
                  <div>
                    <strong>Hours</strong>
                    <p>Mon-Fri: 11AM - 10PM</p>
                    <p>Sat-Sun: 10AM - 11PM</p>
                  </div>
                </div>
                <div className="reservation-detail">
                  <span className="detail-icon">📍</span>
                  <div>
                    <strong>Location</strong>
                    <p>123 Gourmet Street</p>
                    <p>New York, NY 10001</p>
                  </div>
                </div>
                <div className="reservation-detail">
                  <span className="detail-icon">📞</span>
                  <div>
                    <strong>Contact</strong>
                    <p>+1 (555) 123-4567</p>
                    <p>hello@dineflow.com</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="reservation-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={getTodayString()}
                    className={errors.date ? 'error' : ''}
                  />
                  {errors.date && <span className="form-error">{errors.date}</span>}
                </div>
                <div className="form-group">
                  <label>Time {checkingAvailability && <span className="checking-badge">Checking...</span>}</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={errors.time ? 'error' : ''}
                    disabled={!formData.date || checkingAvailability}
                  >
                    <option value="">
                      {!formData.date ? 'Select a date first' : checkingAvailability ? 'Checking availability...' : 'Select time'}
                    </option>
                    {(availableSlots.length > 0 ? availableSlots : timeSlots.map((t) => ({ time: t, isAvailable: true }))).map((slot) => (
                      <option key={slot.time} value={slot.time} disabled={!slot.isAvailable}>
                        {new Date(`2000-01-01T${slot.time}`).toLocaleTimeString('en-US', {
                          hour: 'numeric', minute: '2-digit',
                        })}
                        {slot.isAvailable !== undefined && ` (${slot.available} seats available)`}
                      </option>
                    ))}
                  </select>
                  {availabilityConfig && (
                    <span className="form-hint">Max {availabilityConfig.maxGuestsPerReservation} guests per reservation</span>
                  )}
                  {errors.time && <span className="form-error">{errors.time}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Number of Guests</label>
                <select name="guests" value={formData.guests} onChange={handleChange}>
                  {guestOptions.map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={errors.contactName ? 'error' : ''}
                  />
                  {errors.contactName && <span className="form-error">{errors.contactName}</span>}
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={errors.contactEmail ? 'error' : ''}
                  />
                  {errors.contactEmail && <span className="form-error">{errors.contactEmail}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className={errors.contactPhone ? 'error' : ''}
                />
                {errors.contactPhone && <span className="form-error">{errors.contactPhone}</span>}
              </div>

              <div className="form-group">
                <label>Special Requests (Optional)</label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Allergies, celebrations, seating preferences..."
                  rows={4}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={submitting} style={{ width: '100%' }}>
                {submitting ? 'Submitting...' : 'Confirm Reservation'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reservation;
