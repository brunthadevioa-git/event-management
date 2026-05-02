import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending email
    setTimeout(() => {
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-container animate-fade-in">
      <div className="contact-header text-center">
        <h1>Get in Touch</h1>
        <p>Have questions about hosting an event or need support? We're here to help.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="info-card glass">
            <div className="icon-wrapper"><Mail /></div>
            <div>
              <h3>Email Us</h3>
              <p>support@nexusevents.com</p>
            </div>
          </div>
          <div className="info-card glass">
            <div className="icon-wrapper"><Phone /></div>
            <div>
              <h3>Call Us</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="info-card glass">
            <div className="icon-wrapper"><MapPin /></div>
            <div>
              <h3>Our Office</h3>
              <p>100 Innovation Drive<br/>San Francisco, CA 94105</p>
            </div>
          </div>
        </div>

        <div className="contact-form-container glass">
          {sent ? (
            <div className="success-message text-center animate-fade-in">
              <div className="icon-wrapper" style={{ margin: '0 auto 20px' }}><Send size={32} /></div>
              <h2>Message Sent!</h2>
              <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
              <button className="btn-secondary mt-20" onClick={() => setSent(false)}>Send Another Message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <h2>Send a Message</h2>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required placeholder="Jane Doe" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required placeholder="jane@example.com" />
              </div>
              <div className="form-group">
                <label>Your Message</label>
                <textarea name="message" className="form-control" rows="5" value={formData.message} onChange={handleChange} required placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="btn-primary w-100">
                <Send size={18} /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
