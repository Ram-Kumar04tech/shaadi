import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import Particles from '../components/particles'; // Changed from { Particles }
import { motion } from 'framer-motion';
import { FaGoogle, FaMobileAlt, FaEnvelope } from 'react-icons/fa';
import '../styles/login.css';

const Login = () => {
  console.log("Login component rendering");
  const [loginMethod, setLoginMethod] = useState('mobile'); // 'mobile', 'email', or 'google'
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle tab selection for animated indicator
  useEffect(() => {
    const selector = document.querySelector('.login-method-selector');
    if (selector) {
      selector.setAttribute('data-active', loginMethod);
    }
  }, [loginMethod]);

  const handleMobileLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!showOtpField) {
      // Send OTP logic would go here
      setTimeout(() => {
        setShowOtpField(true);
        setIsLoading(false);
      }, 1000); // Simulate API call
    } else {
      // Verify OTP and login
      console.log('Logging in with mobile:', mobileNumber);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/profile');
      }, 1000); // Simulate API call
    }
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Simulate error for demo
      if (!email || !password) {
        setError('Please enter both email and password');
        return;
      }
      console.log('Logging in with email/password');
      navigate('/profile');
    }, 1000);
  };

  const handleGoogleLogin = () => {
    console.log('Initiating Google login');
    // Google auth implementation would go here
  };

  return (
    <div className="login-page-container">
      <Canvas className="particles-canvas">
        <Particles />
      </Canvas>

      <div className="login-content-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="login-card"
        >
          {/* Decorative floating hearts */}
          <div className="floating-heart"></div>
          <div className="floating-heart"></div>
          <div className="floating-heart"></div>
          <div className="floating-heart"></div>

          <div className="login-header">
            <h1 className="login-title">ShaadiStory.ai</h1>
            <p className="login-subtitle">Your wedding journey begins here</p>
          </div>

          {/* Display error message if any */}
          {error && <div className="error-message">{error}</div>}

          {/* Login Method Selector */}
          <div className="login-method-selector" data-active={loginMethod}>
            <button
              onClick={() => setLoginMethod('mobile')}
              className={`method-tab ${loginMethod === 'mobile' ? 'active' : ''}`}
            >
              <FaMobileAlt /> Mobile
            </button>
            <button
              onClick={() => setLoginMethod('email')}
              className={`method-tab ${loginMethod === 'email' ? 'active' : ''}`}
            >
              <FaEnvelope /> Email
            </button>
            <button
              onClick={() => setLoginMethod('google')}
              className={`method-tab ${loginMethod === 'google' ? 'active' : ''}`}
            >
              <FaGoogle /> Google
            </button>
          </div>

          {/* Mobile Login Form */}
          {loginMethod === 'mobile' && (
            <form onSubmit={handleMobileLogin} className="login-form">
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                  className="form-input"
                  placeholder="+91 9876543210"
                  pattern="[+]{1}[0-9]{11,14}"
                />
              </div>

              {showOtpField && (
                <div className="form-group">
                  <label className="form-label">OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="form-input"
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                  />
                </div>
              )}

              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? 'Please wait...' : (showOtpField ? 'Verify & Login' : 'Send OTP')}
              </button>
            </form>
          )}

          {/* Email Login Form */}
          {loginMethod === 'email' && (
            <form onSubmit={handleEmailLogin} className="login-form">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? 'Please wait...' : 'Login'}
              </button>
            </form>
          )}

          {/* Google Login */}
          {loginMethod === 'google' && (
            <div className="google-login-container">
              <button onClick={handleGoogleLogin} className="google-login-button">
                <FaGoogle className="google-icon" />
                Continue with Google
              </button>
            </div>
          )}

          <div className="signup-link-container">
            <p className="signup-text">
              Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link>
            </p>
          </div>
          
        </motion.div>
      </div>

      {/* Decorative couple illustration */}
      <div className="couple-illustration">
        <img src="/images/couple-illustration.png" alt="" />
      </div>
    </div>
  );
};

export default Login;