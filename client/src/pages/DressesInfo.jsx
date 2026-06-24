import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dresses.css'

const DressesInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dress = location.state;
  const [selectedSize, setSelectedSize] = useState('M');

  if (!dress) {
    return (
      <>
        <Navbar />
        <div className="detail-page">
          <div className="detail-card empty-state">
            <h2>No dress selected</h2>
            <p>Please select a dress first.</p>
            <button onClick={() => navigate('/dresses')}>Back to collection</button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="detail-page">
        <div className="detail-card">
          <img className="detail-image" src={dress.image} alt={dress.name} />
          <div className="detail-info">
            <h2>{dress.name}</h2>
            <h3>₹{dress.price}</h3>
            <p>{dress.description}</p>

            <div className="size-section">
              <label htmlFor="size-select">Choose size</label>
              <select
                id="size-select"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>

            <div className="action-buttons">
              <button className="primary-btn" onClick={() => navigate('/dresses')}>Add to Cart</button>
              <button className="secondary-btn" onClick={() => navigate('/dresses')}>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DressesInfo
