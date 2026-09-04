import React from 'react';
import Navbar from '../components/Navbar';
import './Landing.css';
import '../components/Footer.css';
import { useNavigate } from 'react-router-dom';

const lookbook = [
  {
    src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600',
    alt: 'Model in tailored blazer',
    name: 'The Tailored Blazer',
    price: '₹5,200',
    size: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600',
    alt: 'Model in draped slip dress',
    name: 'The Draped Slip',
    price: '₹3,800',
    size: 'normal',
  },
  {
    src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600',
    alt: 'Wrap coat, women\'s edit',
    name: 'The Wrap Coat',
    price: '₹6,400',
    size: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
    alt: 'Knit layering piece',
    name: 'The Knit Layer',
    price: '₹2,900',
    size: 'normal',
  },
  {
    src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
    alt: 'Essential cotton tee',
    name: 'The Essential Tee',
    price: '₹1,200',
    size: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600',
    alt: 'Structured suit, men\'s edit',
    name: 'The Structured Suit',
    price: '₹7,500',
    size: 'normal',
  },
  {
    src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600',
    alt: 'Formal evening set',
    name: 'The Evening Set',
    price: '₹8,200',
    size: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600',
    alt: 'Weekend jacket, casual edit',
    name: 'The Weekend Jacket',
    price: '₹4,600',
    size: 'normal',
  },
  {
    src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600',
    alt: 'Statement leather belt',
    name: 'The Statement Belt',
    price: '₹1,800',
    size: 'normal',
  },
  {
    src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600',
    alt: 'Utility cargo, street edit',
    name: 'The Utility Cargo',
    price: '₹3,400',
    size: 'tall',
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="main-page">

        {/* Hero */}
        <section className="grm-hero">
          <div className="grm-hero-text">
            <p className="grm-hero-kicker">Garmy — the season's edit, chosen piece by piece</p>
            <h1 className="grm-hero-title">Dress like the story you're telling.</h1>
            <p className="grm-hero-sub">
              Ten pieces, restocked weekly — tailored outerwear, considered basics,
              and the kind of staples you reach for without thinking twice.
            </p>
            <button className="grm-hero-cta" onClick={() => navigate('/dresses')}>
              Explore the edit
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="grm-hero-image">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200"
              alt="Model wearing this week's featured look"
            />
          </div>
        </section>

        {/* Ticker */}
        <div className="welcome-section" aria-label="Store updates">
          <div className="welcome-track">
            <span>New arrivals every Friday · Free shipping over ₹2,999 · Made-to-last essentials</span>
            <span aria-hidden="true">New arrivals every Friday · Free shipping over ₹2,999 · Made-to-last essentials</span>
          </div>
        </div>

        {/* Lookbook */}
        <div className="explore-area">
          <div className="explore-area-head">
            <h2>The Edit</h2>
            <p>Ten pieces from this week's drop, shot as they'd actually be worn.</p>
          </div>

          <div className="image-gallery">
            {lookbook.map((item, index) => (
              <div className={`grm-item grm-item--${item.size}`} key={index}>
                <img src={item.src} alt={item.alt} loading="lazy" />
                <div className="grm-caption">
                  <span className="grm-caption-name">{item.name}</span>
                  <span className="grm-caption-price">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="see-more" onClick={() => navigate('/dresses')}>
          See the full collection ↗
        </button>

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