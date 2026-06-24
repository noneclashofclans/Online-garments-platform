import React, { useState } from 'react' // Added useState
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
import './Register.css'

const Register = () => {
  const navigate = useNavigate();
  const BASE_LINK = "http://localhost:5000";
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      await axios.post(`${BASE_LINK}/api/auth/register`, formData);
      alert('Registration successful! Please login.');

      navigate('/login');
    
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Error: ' + (error.response?.data?.message || 'Something went wrong'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className='register-page'>
        <div className='register-card'>
          <h2>Create Account</h2>

          <form className='register-form' onSubmit={handleRegister}>
            <label htmlFor='name'>Full Name</label>
            <input 
              id='name' 
              type='text' 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder='Enter your full name' 
              required
            />

            <label htmlFor='email'>Email</label>
            <input 
              id='email' 
              type='email' 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder='name@example.com' 
              required
            />

            <label htmlFor='password'>Password</label>
            <input 
              id='password' 
              type='password' 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder='Create a password' 
              required
            />

            <button className='register-btn' type='submit' disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className='register-link'>Already have an account? <span onClick={() => navigate('/login')}>Log in</span></p>
        </div>
      </div>
    </>
  )
}

export default Register