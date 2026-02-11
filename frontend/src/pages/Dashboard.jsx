import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const [userEmail, setUserEmail] = useState('');
  const [audioError, setAudioError] = useState('');
  const [videoError, setVideoError] = useState('');
  const [audioFileName, setAudioFileName] = useState('');
  const [videoFileName, setVideoFileName] = useState('');
  const navigate = useNavigate();

  const AUDIO_MAX_BYTES = 500 * 1024 * 1024;
  const VIDEO_MAX_BYTES = 2 * 1024 * 1024 * 1024;
  const ALLOWED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/x-wav'];
  const ALLOWED_AUDIO_EXTENSIONS = ['mp3', 'wav'];
  const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime'];
  const ALLOWED_VIDEO_EXTENSIONS = ['mp4', 'mov'];

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');

    if (!token) {
      navigate('/login');
    } else {
      setUserEmail(email);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const validateFile = (file, kind) => {
    if (!file) {
      return '';
    }

    const isAudio = kind === 'audio';
    const maxBytes = isAudio ? AUDIO_MAX_BYTES : VIDEO_MAX_BYTES;
    const allowedTypes = isAudio ? ALLOWED_AUDIO_TYPES : ALLOWED_VIDEO_TYPES;
    const allowedExtensions = isAudio ? ALLOWED_AUDIO_EXTENSIONS : ALLOWED_VIDEO_EXTENSIONS;

    if (file.size > maxBytes) {
      return isAudio ? 'File exceeds 500MB limit.' : 'File exceeds 2GB limit.';
    }

    const fileType = file.type;
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    const isValidType = allowedTypes.includes(fileType) || allowedExtensions.includes(fileExtension);

    if (!isValidType) {
      return isAudio ? 'Unsupported audio format. Use MP3 or WAV.' : 'Unsupported video format. Use MP4 or MOV.';
    }

    return '';
  };

  const handleAudioChange = (event) => {
    const file = event.target.files?.[0];
    const errorMessage = validateFile(file, 'audio');

    if (errorMessage) {
      setAudioError(errorMessage);
      setAudioFileName('');
      event.target.value = '';
      return;
    }

    setAudioError('');
    setAudioFileName(file ? file.name : '');
  };

  const handleVideoChange = (event) => {
    const file = event.target.files?.[0];
    const errorMessage = validateFile(file, 'video');

    if (errorMessage) {
      setVideoError(errorMessage);
      setVideoFileName('');
      event.target.value = '';
      return;
    }

    setVideoError('');
    setVideoFileName(file ? file.name : '');
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-left">
          <h2>Transcripto</h2>
        </div>
        <div className="nav-right">
          <span className="user-email">{userEmail}</span>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
          <button onClick={handleLogout} className="btn btn-secondary btn-sm">
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome to Transcripto Dashboard</h1>
          <p>You are logged in as {userEmail}</p>
        </div>

        <section className="upload-section">
          <div className="upload-header">
            <div>
              <p className="upload-eyebrow">Start a new transcript</p>
              <h2>Upload your audio or video</h2>
              <p className="upload-subtitle">
                Drag a file into the panel or browse your device. We support MP3, WAV, MP4, and MOV.
              </p>
            </div>
            <div className="upload-badges">
              <span className="upload-badge">Secure upload</span>
              <span className="upload-badge">AI-ready</span>
            </div>
          </div>

          <div className="upload-grid">
            <div className="upload-card">
              <div className="upload-card-header">
                <span className="upload-pill">Audio</span>
                <h3>Upload audio files</h3>
                <p>Great for podcasts, interviews, and meetings.</p>
              </div>
              <label className="upload-drop" htmlFor="audio-upload">
                <div className="upload-icon">🎙️</div>
                <div>
                  <strong>Drop audio here</strong>
                  <span>or click to browse</span>
                </div>
              </label>
              <input
                className="upload-input"
                id="audio-upload"
                type="file"
                accept="audio/*"
                onChange={handleAudioChange}
              />
              {audioError ? (
                <p className="upload-feedback upload-error">{audioError}</p>
              ) : (
                audioFileName && <p className="upload-feedback">Selected: {audioFileName}</p>
              )}
              <div className="upload-meta">
                <span>Max size: 500MB</span>
                <span>Auto language detect</span>
              </div>
            </div>

            <div className="upload-card">
              <div className="upload-card-header">
                <span className="upload-pill">Video</span>
                <h3>Upload video files</h3>
                <p>Perfect for webinars, demos, and lectures.</p>
              </div>
              <label className="upload-drop" htmlFor="video-upload">
                <div className="upload-icon">🎬</div>
                <div>
                  <strong>Drop video here</strong>
                  <span>or click to browse</span>
                </div>
              </label>
              <input
                className="upload-input"
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
              />
              {videoError ? (
                <p className="upload-feedback upload-error">{videoError}</p>
              ) : (
                videoFileName && <p className="upload-feedback">Selected: {videoFileName}</p>
              )}
              <div className="upload-meta">
                <span>Max size: 2GB</span>
                <span>Smart noise cleanup</span>
              </div>
            </div>
          </div>
        </section>

        <div className="dashboard-features">
          <div className="feature-card">
            <h3>📁 Upload Files</h3>
            <p>Upload your audio or video files to get started</p>
          </div>
          <div className="feature-card">
            <h3>📝 View Transcripts</h3>
            <p>Access all your transcribed files</p>
          </div>
          <div className="feature-card">
            <h3>⚙️ Settings</h3>
            <p>Manage your account preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
