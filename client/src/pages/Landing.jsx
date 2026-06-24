import React from 'react';
import Navbar from '../components/Navbar';
import './Landing.css';
import '../components/Footer.css';
import { useNavigate } from 'react-router-dom'



const images = [
  {
    src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600',
    alt: 'Fashion Store',
  },
  {
    src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600',
    alt: 'Fashion Model',
  },
  {
    src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600',
    alt: "Women's Fashion",
  },
  {
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
    alt: 'Clothing Collection',
  },
  {
    src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
    alt: 'T-Shirt Collection',
  },
  {
    src: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600',
    alt: 'Men Fashion',
  },
  {
    src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600',
    alt: 'Formal Wear',
  },
  {
    src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600',
    alt: 'Casual Fashion',
  },
  {
    src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600',
    alt: 'Fashion Accessories',
  },
  {
    src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600',
    alt: 'Street Fashion',
  },
];

const Landing = () => {

  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div className="main-page">
        <div className="welcome-section" aria-label="Welcome message">
          <div className="welcome-track">
            <span>Welcome to 'Garmy': Your Favourite Clothing and Fashion Arena</span>
            <span aria-hidden="true">Welcome to 'Garmy': Your Favourite Clothing and Fashion Arena</span>
          </div>
        </div>

        <div className="explore-area">
          <h2>Explore a Variety of Fashion Items!</h2>

          <div className="image-gallery">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />
            ))}
          </div>
        </div>

          {/* go to dresses section */}
            <button className="see-more" onClick={() => {navigate('/dresses')}}>See more ↗</button>
          
        <footer className="footer-container">
          <div className="footer-content">
            <span className="footer-logo">Garmy</span>
            <div className="footer-links">
              <a href="#shop">Shop</a>
              <a href="#support">Support</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <p className="footer-copy">© 2026 Garmy. All rights reserved.</p>
        </footer>

      </div>
    </>
  );
};

export default Landing;