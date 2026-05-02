import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Calendar, MapPin, Users, Mail, Clock } from 'lucide-react';
import './ManageEvents.css';

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  
  const [registrationsModal, setRegistrationsModal] = useState({ isOpen: false, event: null, data: [] });
  const [loadingRegistrations, setLoadingRegistrations] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000'
  });

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        date: new Date(event.date).toISOString().split('T')[0],
        location: event.location,
        imageUrl: event.imageUrl
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await axios.put(`http://localhost:5000/api/events/${editingEvent._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/events', formData);
      }
      closeModal();
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert('Failed to save event');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`);
        fetchEvents();
      } catch (err) {
        console.error(err);
        alert('Failed to delete event');
      }
    }
  };

  const viewRegistrations = async (event) => {
    setRegistrationsModal({ isOpen: true, event, data: [] });
    setLoadingRegistrations(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/events/${event._id}/registrations`);
      setRegistrationsModal({ isOpen: true, event, data: response.data });
    } catch (err) {
      console.error(err);
      alert('Failed to load registrations');
    } finally {
      setLoadingRegistrations(false);
    }
  };

  const closeRegistrationsModal = () => {
    setRegistrationsModal({ isOpen: false, event: null, data: [] });
  };

  if (loading) {
    return <div className="loader-container"><div className="loader"></div></div>;
  }

  return (
    <div className="manage-container animate-fade-in">
      <div className="manage-header">
        <div>
          <h1>Manage Events</h1>
          <p>Create, update, and remove events from the platform.</p>
        </div>
        <button className="btn-primary" onClick={() => openModal()}>
          <Plus size={20} /> Create Event
        </button>
      </div>

      <div className="glass table-container">
        <table className="events-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event._id}>
                <td>
                  <div className="table-event-info">
                    <img src={event.imageUrl} alt={event.title} className="table-img" />
                    <div>
                      <strong>{event.title}</strong>
                      <div className="table-desc">{event.description.substring(0, 40)}...</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="table-meta"><Calendar size={14} /> {new Date(event.date).toLocaleDateString()}</span>
                </td>
                <td>
                  <span className="table-meta"><MapPin size={14} /> {event.location}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon view" onClick={() => viewRegistrations(event)} title="View Registrations">
                      <Users size={18} />
                    </button>
                    <button className="btn-icon edit" onClick={() => openModal(event)} title="Edit Event">
                      <Edit2 size={18} />
                    </button>
                    <button className="btn-icon delete" onClick={() => handleDelete(event._id)} title="Delete Event">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan="4" className="empty-state">No events found. Create one!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay animate-fade-in">
          <div className="modal-content glass">
            <div className="modal-header">
              <h2>{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
              <button className="close-btn" onClick={closeModal}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="event-form">
              <div className="form-group">
                <label>Event Title</label>
                <input type="text" name="title" className="form-control" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" className="form-control" rows="3" value={formData.description} onChange={handleInputChange} required></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" name="date" className="form-control" value={formData.date} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" name="location" className="form-control" value={formData.location} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input type="url" name="imageUrl" className="form-control" value={formData.imageUrl} onChange={handleInputChange} required />
                {formData.imageUrl && (
                  <div className="image-preview">
                    <img src={formData.imageUrl} alt="Preview" />
                  </div>
                )}
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary">{editingEvent ? 'Update Event' : 'Create Event'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {registrationsModal.isOpen && (
        <div className="modal-overlay animate-fade-in">
          <div className="modal-content glass" style={{ maxWidth: '800px' }}>
            <div className="modal-header">
              <h2>Registrations: {registrationsModal.event?.title}</h2>
              <button className="close-btn" onClick={closeRegistrationsModal}><X size={24} /></button>
            </div>
            
            <div className="registrations-list">
              {loadingRegistrations ? (
                <div className="loader-container" style={{ padding: '40px 0' }}>
                  <div className="loader"></div>
                </div>
              ) : registrationsModal.data.length === 0 ? (
                <div className="empty-state">No users have registered for this event yet.</div>
              ) : (
                <table className="events-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Registered At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrationsModal.data.map(reg => (
                      <tr key={reg._id}>
                        <td>
                          <div className="table-meta"><Users size={14}/> {reg.name}</div>
                        </td>
                        <td>
                          <div className="table-meta"><Mail size={14}/> {reg.email}</div>
                        </td>
                        <td>
                          <div className="table-meta"><Clock size={14}/> {new Date(reg.registeredAt).toLocaleString()}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={closeRegistrationsModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
