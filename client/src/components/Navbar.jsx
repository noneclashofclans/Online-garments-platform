import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo_garmy from '../assets/logo_garmy.png';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const handleNav = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    let parsedUser = null;

    if (storedUser && storedUser !== 'undefined') {
      try {
        parsedUser = JSON.parse(storedUser);
      } catch {
        parsedUser = null;
      }
    }

    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    if (parsedUser?.id) headers['x-user-id'] = parsedUser.id;
    return headers;
  };

  const fetchCartCount = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/cart`, {
        headers: getAuthHeaders(),
      });
      const count = (data?.items || []).reduce((sum, item) => sum + Number(item.quantity || 1), 0);
      setCartCount(count);
      localStorage.setItem('cartCount', String(count));
    } catch (err) {
      const savedCount = Number(localStorage.getItem('cartCount') || 0);
      setCartCount(savedCount);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser('');
      }
    }

    fetchCartCount();

    const handleCartUpdate = () => fetchCartCount();
    window.addEventListener('cart-updated', handleCartUpdate);
    window.addEventListener('focus', handleCartUpdate);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
      window.removeEventListener('focus', handleCartUpdate);
    };
  }, []);

  return (
    <nav className='navbar-main'>
      <div className='nav-left'>
        <div className='nav-logo' onClick={() => handleNav('/')}>
          <img src={logo_garmy} alt='garmy-logo' />
        </div>

        <div className='brand-title'>
          <h2>Garmy</h2>
        </div>
      </div>

      <button
        className='menu-toggle'
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label='Toggle navigation menu'
      >
        ☰
      </button>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {user ? (
          <li>Welcome, {user.name || user.firstName}</li>
        ) : (
          <li onClick={() => handleNav('/login')}>Login/Register</li>
        )}
        <li onClick={() => handleNav('/')}>Home</li>
        <li onClick={() => handleNav('/orders')}>Orders</li>
        <li className='nav-cart-link' onClick={() => handleNav('/cart')}>
          Cart
          <span className={`cart-badge ${cartCount > 0 ? 'visible' : ''}`}>{cartCount}</span>
        </li>
        <li className='cta' onClick={() => handleNav('/about')}>Know Us!</li>
      </ul>
    </nav>
  );
};

export default Navbar;