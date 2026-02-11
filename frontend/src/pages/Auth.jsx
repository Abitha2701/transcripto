import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';
import voiceImg from '../assets/voice-img.png';

function Auth({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMode(initialMode);
    setError('');
  }, [initialMode]);

  const isSignup = mode === 'signup';

  const handleToggle = (nextMode) => {
    if (nextMode === mode) return;
    setMode(nextMode);
    setError('');
    navigate(nextMode === 'signup' ? '/signup' : '/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isSignup) {
      if (!name || !email || !password || !confirmPassword) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (name.trim().length < 3) {
        setError('Name must be at least 3 characters');
        setLoading(false);
        return;
      }

      if (!email.includes('@')) {
        setError('Please enter a valid email');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post('http://localhost:5000/auth/register', {
          username: name,
          email,
          password,
        });

        if (response.status === 201) {
          const loginResponse = await axios.post('http://localhost:5000/auth/login', {
            email,
            password,
          });

          if (loginResponse.data.token) {
            localStorage.setItem('authToken', loginResponse.data.token);
            localStorage.setItem('userEmail', email);
            navigate('/dashboard');
          }
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }

      return;
    }

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userEmail', email);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const leftStyle = {
    backgroundImage: `linear-gradient(135deg, rgba(19, 25, 54, 0.8), rgba(92, 108, 255, 0.55)), url(${voiceImg})`,
  };

  return (
    <div className="auth-page">
      <div className="auth-layout">
        <section className="auth-left" style={leftStyle}>
          <div className="auth-left-content">
            <h1>Transcribe in seconds</h1>
            <p>Upload audio, get clean text, and keep everything organized in one place.</p>
          </div>
        </section>

        <section className="auth-right">
          <div className="auth-form-wrap">
            <div className="auth-toggle" role="tablist" aria-label="Authentication toggle">
              <button
                type="button"
                className={`auth-toggle-btn ${!isSignup ? 'active' : ''}`}
                onClick={() => handleToggle('login')}
                role="tab"
                aria-selected={!isSignup}
              >
                Login
              </button>
              <button
                type="button"
                className={`auth-toggle-btn ${isSignup ? 'active' : ''}`}
                onClick={() => handleToggle('signup')}
                role="tab"
                aria-selected={isSignup}
              >
                Signup
              </button>
            </div>

            <div className="auth-heading">
              <h2>{isSignup ? 'Create your account' : 'Welcome back'}</h2>
              <p>{isSignup ? 'Start transcribing in minutes.' : 'Login to continue to Transcripto.'}</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              {isSignup && (
                <label className="auth-field">
                  Name
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    disabled={loading}
                  />
                </label>
              )}

              <label className="auth-field">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </label>

              <label className="auth-field">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={loading}
                />
              </label>

              {isSignup && (
                <label className="auth-field">
                  Confirm Password
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    disabled={loading}
                  />
                </label>
              )}

              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? (isSignup ? 'Creating account...' : 'Logging in...') : isSignup ? 'Sign up' : 'Login'}
              </button>
            </form>

            <div className="auth-switch">
              {isSignup ? (
                <span>
                  Already have an account?{' '}
                  <button type="button" onClick={() => handleToggle('login')}>
                    Login
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account?{' '}
                  <button type="button" onClick={() => handleToggle('signup')}>
                    Sign up
                  </button>
                </span>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Auth;
