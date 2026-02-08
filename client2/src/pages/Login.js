import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordWarning, setPasswordWarning] = useState('');

  const handlePasswordChange = (value) => {
    setPassword(value);
    
    // Show warning if password is less than 6 characters
    if (value.length > 0 && value.length < 6) {
      setPasswordWarning(`Password must be at least 6 characters (${value.length}/6)`);
    } else if (value.length === 0) {
      setPasswordWarning('');
    } else {
      setPasswordWarning('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      await login(email, password);
      navigate('/'); // redirect to home
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p>Sign in to your account</p>
        
        {error && <p className="error">{error}</p>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              id="email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email"
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              value={password} 
              onChange={(e) => handlePasswordChange(e.target.value)} 
              placeholder="Enter your password (min 6 characters)"
              required 
            />
            {passwordWarning && (
              <small className="password-warning">{passwordWarning}</small>
            )}
          </div>

          <button type="submit" disabled={password.length < 6}>
            Sign In
          </button>
        </form>

        <div className="login-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
