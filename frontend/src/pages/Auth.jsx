import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock } from 'lucide-react';
import './Auth.css';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData);
      
      // Save token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Dispatch an event to update Navbar immediately
      window.dispatchEvent(new Event('authChange'));
      
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container animate-fade-in">
      <div className="auth-card glass">
        <div className="auth-header text-center">
          <h2>{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
          <p>{isLogin ? 'Sign in to access your dashboard' : 'Join NexusEvents to register for events'}</p>
        </div>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group relative">
              <label>Full Name</label>
              <div className="input-with-icon">
                <User className="input-icon" size={18} />
                <input type="text" name="name" className="form-control pl-40" value={formData.name} onChange={handleChange} required={!isLogin} placeholder="John Doe" />
              </div>
            </div>
          )}
          
          <div className="form-group relative">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={18} />
              <input type="email" name="email" className="form-control pl-40" value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
            </div>
          </div>

          <div className="form-group relative">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock className="input-icon" size={18} />
              <input type="password" name="password" className="form-control pl-40" value={formData.password} onChange={handleChange} required placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" className="btn-primary w-100" disabled={loading}>
            {loading ? <span className="loader"></span> : (isLogin ? 'Sign In' : 'Register')}
          </button>
        </form>

        <div className="auth-footer text-center">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span className="toggle-link" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
              {isLogin ? ' Sign Up' : ' Sign In'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
