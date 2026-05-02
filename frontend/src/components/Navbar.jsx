import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const checkAuth = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener('authChange', checkAuth);
    return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar glass">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <CalendarDays className="logo-icon" size={28} />
          <span>NexusEvents</span>
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="nav-link">Discover</Link>
          <Link to="/manage" className="nav-link">Manage</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/faq" className="nav-link">FAQ</Link>
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontWeight: '500', color: 'var(--primary)' }}>Hi, {user.name.split(' ')[0]}</span>
              <button className="btn-secondary" onClick={handleLogout}>Log Out</button>
            </div>
          ) : (
            <Link to="/auth" className="btn-primary">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
