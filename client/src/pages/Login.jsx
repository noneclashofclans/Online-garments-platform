import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Login.css'
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate()
  const BASE_LINK = "http://localhost:5000";

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handle_login_submit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      alert('Fill up all details');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_LINK}/api/auth/login`,
        {
          username: formData.username,
          password: formData.password
        }
      );

      const data = response.data;

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/dresses');

    } catch (error) {

      setLoading(false);

      if (error.response) {
        alert(error.response.data.message || 'Invalid username or password');
      } else {
        alert('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className='login-page'>
        <div className='login-card'>
          <span className='login-kicker'>Member access</span>
          <h2>Welcome back</h2>
          <p>Sign in to pick up where you left off.</p>

          <form className='login-form' onSubmit={handle_login_submit}>
            <label htmlFor='username'>Username</label>
            <input
              id='username'
              name='username'
              type='text'
              autoComplete='username'
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder='Username'
            />

            <label htmlFor='password'>Password</label>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder='Enter your password'
            />

            <button className='login-btn' type='submit' disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className='login-link'>New here? <span onClick={() => navigate('/register')}>Create account</span></p>
        </div>
      </div>
    </>
  )
}

export default Login