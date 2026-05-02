import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import './Home.css';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch events. Make sure backend is running.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="home-container animate-fade-in">
      <header className="hero-section">
        <h1>Discover Amazing <span className="highlight">Experiences</span></h1>
        <p>Join the best events around the world. Register, attend, and expand your horizons with our curated list of events.</p>
      </header>

      <section className="events-section">
        <div className="section-header">
          <h2>Upcoming Events</h2>
          <div className="filter-tags">
            <span className="tag active">All</span>
            <span className="tag">Technology</span>
            <span className="tag">Design</span>
          </div>
        </div>

        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Loading events...</p>
          </div>
        ) : error ? (
          <div className="error-message glass">{error}</div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event._id} className="event-card glass glass-card">
                <div className="event-image">
                  <img src={event.imageUrl} alt={event.title} />
                  <div className="event-date-badge">
                    <span className="month">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="day">{new Date(event.date).getDate()}</span>
                  </div>
                </div>
                <div className="event-content">
                  <h3>{event.title}</h3>
                  <div className="event-meta">
                    <span className="meta-item"><MapPin size={16} /> {event.location}</span>
                    <span className="meta-item"><Calendar size={16} /> {new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <p className="event-description">{event.description.substring(0, 80)}...</p>
                  <div className="event-footer">
                    <Link to={`/event/${event._id}`} className="btn-secondary">
                      Details <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
