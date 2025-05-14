import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import Particles from '../components/particles';
import { motion } from 'framer-motion';
import { FaGoogle, FaMobileAlt, FaEnvelope, FaUser, FaLock, FaCalendarAlt } from 'react-icons/fa';
import '../styles/signup.css';

const SignUp = () => {
  const [signupMethod, setSignupMethod] = useState('mobile'); // 'mobile', 'email', or 'google'
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const selector = document.querySelector('.signup-method-selector');
    if (selector) {
      selector.setAttribute('data-active', signupMethod);
    }
  }, [signupMethod]);

  const handleMobileSignup = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!fullName || !mobileNumber || !dateOfBirth || !gender) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    const mobilePattern = /^\+?[0-9]{10,14}$/;
    if (!mobilePattern.test(mobileNumber)) {
      setError('Please enter a valid mobile number');
      setIsLoading(false);
      return;
    }

    if (!showOtpField) {
      setTimeout(() => {
        setShowOtpField(true);
        setIsLoading(false);
        setError('');
      }, 1000);
    } else {
      if (!otp || otp.length !== 6) {
        setError('Please enter a valid 6-digit OTP');
        setIsLoading(false);
        return;
      }
      setTimeout(() => {
        setIsLoading(false);
        setError('');
        navigate('/profile');
      }, 1000);
    }
  };

  const handleEmailSignup = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!fullName || !email || !password || !confirmPassword || !dateOfBirth || !gender) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      navigate('/profile');
    }, 1000);
  };

  const handleGoogleSignup = () => {
    // Google auth implementation would go here
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/profile');
    }, 1000);
  };

  return (
    <div className="signup-page-container">
      <Canvas className="particles-canvas">
        <Particles />
      </Canvas>
      <div className="signup-content-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="signup-card"
        >
          <div className="signup-method-selector">
            <button
              className={signupMethod === 'mobile' ? 'active' : ''}
              onClick={() => setSignupMethod('mobile')}
            >
              <FaMobileAlt /> Mobile
            </button>
            <button
              className={signupMethod === 'email' ? 'active' : ''}
              onClick={() => setSignupMethod('email')}
            >
              <FaEnvelope /> Email
            </button>
            <button
              className={signupMethod === 'google' ? 'active' : ''}
              onClick={() => setSignupMethod('google')}
            >
              <FaGoogle /> Google
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          {/* Mobile Signup */}
          {signupMethod === 'mobile' && (
            <form className="signup-form" onSubmit={handleMobileSignup}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <div className="input-with-icon">
                  <FaMobileAlt className="input-icon" />
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="e.g. +919876543210"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
              {showOtpField && (
                <div className="form-group">
                  <label className="form-label">OTP</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="form-row">
                <div className="form-group half-width">
                  <label className="form-label">Date of Birth</label>
                  <div className="input-with-icon">
                    <FaCalendarAlt className="input-icon" />
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="form-group half-width">
                  <label className="form-label">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="form-input"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? 'Please wait...' : showOtpField ? 'Verify OTP' : 'Send OTP'}
              </button>
            </form>
          )}

          {/* Email Signup */}
          {signupMethod === 'email' && (
            <form className="signup-form" onSubmit={handleEmailSignup}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <div className="input-with-icon">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-with-icon">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="input-with-icon">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group half-width">
                  <label className="form-label">Date of Birth</label>
                  <div className="input-with-icon">
                    <FaCalendarAlt className="input-icon" />
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="form-group half-width">
                  <label className="form-label">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="form-input"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? 'Please wait...' : 'Create Account'}
              </button>
            </form>
          )}

          {/* Google Signup */}
          {signupMethod === 'google' && (
            <div className="google-signup-container">
              <p className="google-info-text">
                Create an account quickly using your Google account. We'll only access your basic profile information.
              </p>
              <button onClick={handleGoogleSignup} className="google-signup-button" disabled={isLoading}>
                <FaGoogle className="google-icon" />
                {isLoading ? 'Please wait...' : 'Continue with Google'}
              </button>
            </div>
          )}

          <div className="login-link-container">
            <p className="login-text">
              Already have an account?{' '}
              <Link to="/login" className="login-link">
                Log in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;