import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Welcome.css';

function Welcome() {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-header">
          <h1 className="welcome-title">Transcripto</h1>
          <p className="welcome-subtitle">Transform Your Audio Into Text</p>
        </div>
        
        <p className="welcome-description">
          Transcripto is your go-to solution for converting audio and video files into accurate text transcripts. 
          Perfect for interviews, meetings, lectures, and more.
        </p>

        <div className="welcome-features">
          <div className="feature">
            <h3>⚡ Fast Processing</h3>
            <p>Get your transcripts in minutes, not hours</p>
          </div>
          <div className="feature">
            <h3>🎯 Accurate</h3>
            <p>Advanced AI technology for high accuracy</p>
          </div>
          <div className="feature">
            <h3>🔒 Secure</h3>
            <p>Your files are encrypted and private</p>
          </div>
        </div>

        <div className="welcome-buttons">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/signup" className="btn btn-secondary">
            Sign Up Free
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
