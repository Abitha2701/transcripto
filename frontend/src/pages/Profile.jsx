import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');

    if (!token) {
      navigate('/login');
    } else {
      setUserEmail(email || '');
    }
  }, [navigate]);

  const displayName = useMemo(() => {
    if (!userEmail) {
      return 'Transcripto User';
    }
    const localPart = userEmail.split('@')[0];
    return localPart
      .replace(/[._-]+/g, ' ')
      .split(' ')
      .filter(Boolean)
      .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
      .join(' ');
  }, [userEmail]);

  const initials = useMemo(() => {
    const parts = displayName.split(' ').filter(Boolean);
    if (parts.length === 0) {
      return 'TU';
    }
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }, [displayName]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <div className="profile-page">
      <nav className="profile-nav">
        <div className="profile-brand">
          <Link to="/dashboard" className="profile-brand-link">
            Transcripto
          </Link>
          <span>Profile</span>
        </div>
        <div className="profile-actions">
          <Link to="/dashboard" className="profile-link">
            Dashboard
          </Link>
          <button onClick={handleLogout} className="btn btn-secondary btn-sm">
            Logout
          </button>
        </div>
      </nav>

      <main className="profile-content">
        <section className="profile-card">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-identity">
            <h1>{displayName}</h1>
            <p>{userEmail || 'No email available'}</p>
          </div>
          <div className="profile-status">
            <span className="status-pill">Active</span>
            <span className="status-label">Starter plan</span>
          </div>
        </section>

        <section className="profile-grid">
          <article className="profile-panel">
            <h3>Account Details</h3>
            <div className="profile-row">
              <span className="profile-label">Email</span>
              <span className="profile-value">{userEmail || 'Not available'}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Username</span>
              <span className="profile-value">{displayName}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Member since</span>
              <span className="profile-value">February 2026</span>
            </div>
          </article>

          <article className="profile-panel">
            <h3>Preferences</h3>
            <div className="profile-row">
              <span className="profile-label">Default language</span>
              <span className="profile-value">Auto-detect</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Notifications</span>
              <span className="profile-value">Email summaries</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Storage usage</span>
              <span className="profile-value">0 / 10 GB</span>
            </div>
          </article>
        </section>

        <section className="profile-panel profile-cta">
          <h3>Need to update your info?</h3>
          <p>
            Account edits are coming soon. For now, contact support to update your email or
            preferences.
          </p>
          <button className="btn btn-secondary">Contact support</button>
        </section>
      </main>
    </div>
  );
}

export default Profile;
