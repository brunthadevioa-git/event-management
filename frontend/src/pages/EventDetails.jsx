import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, MapPin, ArrowLeft, CheckCircle2 } from 'lucide-react';
import './EventDetails.css';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Registration Form State
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(null);
  
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({ name: parsedUser.name, email: parsedUser.email });
    }
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch event details.');
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    try {
      await axios.post(`http://localhost:5000/api/events/${id}/register`, formData);
      setSuccess(true);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-loader">
        <div className="loader"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container animate-fade-in">
        <div className="error-message glass">
          <p>{error || 'Event not found'}</p>
          <Link to="/" className="btn-secondary" style={{marginTop: '15px'}}>Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="event-details-container animate-fade-in">
      <Link to="/" className="back-link">
        <ArrowLeft size={20} /> Back to Events
      </Link>
      
      <div className="details-grid">
        <div className="event-info glass">
          <div className="event-header-img">
            <img src={event.imageUrl} alt={event.title} />
          </div>
          <div className="info-content">
            <h1>{event.title}</h1>
            <div className="meta-info">
              <div className="meta-box glass">
                <Calendar className="meta-icon" />
                <div>
                  <span className="meta-label">Date</span>
                  <span className="meta-value">{new Date(event.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="meta-box glass">
                <MapPin className="meta-icon" />
                <div>
                  <span className="meta-label">Location</span>
                  <span className="meta-value">{event.location}</span>
                </div>
              </div>
            </div>
            
            <div className="description-section">
              <h3>About this Event</h3>
              <p>{event.description}</p>
            </div>
          </div>
        </div>

        <div className="registration-section">
          <div className="glass registration-card sticky">
            {success ? (
              <div className="success-state animate-fade-in">
                <CheckCircle2 size={64} color="var(--accent)" className="success-icon" />
                <h3>Registration Successful!</h3>
                <p>You have successfully registered for {event.title}. We've sent a confirmation to {formData.email}.</p>
                <button className="btn-primary" onClick={() => setSuccess(false)}>Register Another</button>
              </div>
            ) : (
              <>
                <h2>Reserve Your Spot</h2>
                <p className="reg-subtitle">Fill in your details below to register for this event.</p>
                
                {formError && <div className="form-error">{formError}</div>}
                
                {!user ? (
                  <div className="login-prompt text-center" style={{ padding: '20px 0' }}>
                    <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>You must be logged into your account to register for events.</p>
                    <button className="btn-primary w-100" onClick={() => navigate('/auth')}>
                      Sign In to Register
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="form-control" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                        readOnly={!!user}
                        style={{ opacity: user ? 0.7 : 1 }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="form-control" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        readOnly={!!user}
                        style={{ opacity: user ? 0.7 : 1 }}
                      />
                    </div>
                    <button type="submit" className="btn-primary w-100" disabled={submitting}>
                      {submitting ? <span className="loader"></span> : 'Complete Registration'}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
