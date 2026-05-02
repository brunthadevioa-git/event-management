import React from 'react';
import { Users, Award, Shield, Globe } from 'lucide-react';
import './About.css';

export default function About() {
  const stats = [
    { icon: <Users />, count: '10K+', label: 'Active Users' },
    { icon: <Globe />, count: '50+', label: 'Countries' },
    { icon: <Award />, count: '100+', label: 'Premium Events' },
    { icon: <Shield />, count: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="about-container animate-fade-in">
      <div className="about-header text-center">
        <h1 className="gradient-text">Empowering Global Experiences</h1>
        <p>We believe in connecting people through transformative events. NexusEvents is the premier platform for discovering and hosting the world's most innovative gatherings.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card glass glass-card">
            <div className="stat-icon">{stat.icon}</div>
            <h2>{stat.count}</h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mission-section glass">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>Founded in 2026, NexusEvents was built to solve the fragmentation of event discovery. Our goal is to provide a seamless, beautiful, and highly efficient platform where creators can host, and attendees can effortlessly find exactly what they are looking for.</p>
          <ul className="mission-list">
            <li>✨ Premium Glassmorphic Design</li>
            <li>⚡ Lightning Fast Performance</li>
            <li>🔒 Secure Registrations</li>
          </ul>
        </div>
        <div className="mission-image">
          <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000" alt="Team meeting" />
        </div>
      </div>
    </div>
  );
}
