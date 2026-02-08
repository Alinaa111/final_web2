import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
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
      await register({ name, email, password });
      navigate('/login'); // redirect to login after register
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Create Account</h2>
        <p>Create your account and start shopping</p>
        
        {error && <p className="error">{error}</p>}
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              id="name"
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter your full name"
              required 
            />
          </div>

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
              placeholder="Enter a password (min 6 characters)"
              required 
            />
            {passwordWarning && (
              <small className="password-warning">{passwordWarning}</small>
            )}
          </div>

          <button type="submit" disabled={password.length < 6}>
            Create Account
          </button>
        </form>

        <div className="register-footer">
          Already have an account? <a href="/login">Login here</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
