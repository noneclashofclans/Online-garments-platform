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

  const handle_login_submit = async(e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!formData.username || !formData.password){
        alert('Fill up all details');
    }
        
    try{
        const response = await axios.post(`${BASE_LINK}/api/auth/login`, {
            username: formData.username, password: formData.password});
            
        
        const data = await response.json();
            
        if (!response.ok){
            setLoading(false);
            return;
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        navigate(
            '/dresses');
        
    }
    catch(error){
        console.error('Unable to login');
        setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className='login-page'>
        <div className='login-card'>
          <h2>Welcome Back</h2>

          <form className='login-form' onSubmit={handle_login_submit}>  
            <label htmlFor='name'>Username</label>
            <input id='name' type='name' value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} placeholder='Username' />

            <label htmlFor='password'>Password</label>
            <input id='password' type='password' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}placeholder='Enter your password' />

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
