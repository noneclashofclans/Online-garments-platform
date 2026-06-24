import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './Cart.css';

const BASE_URL = 'http://localhost:5000';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingItem, setUpdatingItem] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    let user = null;

    if (storedUser && storedUser !== 'undefined') {
      try {
        user = JSON.parse(storedUser);
      } catch {
        user = null;
      }
    }

    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    if (user?.id) headers['x-user-id'] = user.id;
    return headers;
  };

  const fetchCart = async () => {
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.get(`${BASE_URL}/api/cart`, {
        headers: getAuthHeaders(),
      });
      setCart(data || { items: [] });
      const count = (data?.items || []).reduce((sum, item) => sum + Number(item.quantity || 1), 0);
      localStorage.setItem('cartCount', String(count));
      window.dispatchEvent(new Event('cart-updated'));
    } catch (err) {
      console.error('Unable to load cart:', err);
      setError(err.response?.data?.message || 'Unable to load your cart right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = useMemo(() => {
    return cart.items.reduce((sum, item) => {
      const unitPrice = Number(item.productId?.price || 0);
      const quantity = Number(item.quantity || 1);
      return sum + unitPrice * quantity;
    }, 0);
  }, [cart.items]);

  const updateQuantity = async (item, nextQuantity) => {
    const productId = item.productId?._id || item.productId?.id || item.productId;
    if (!productId) return;

    setUpdatingItem(productId);
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/cart`,
        {
          productId,
          quantity: nextQuantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
        },
        { headers: getAuthHeaders() }
      );
      setCart(data || { items: [] });
      const count = (data?.items || []).reduce((sum, item) => sum + Number(item.quantity || 1), 0);
      localStorage.setItem('cartCount', String(count));
      window.dispatchEvent(new Event('cart-updated'));
    } catch (err) {
      console.error('Unable to update cart item:', err);
      setError(err.response?.data?.message || 'Unable to update the selected item.');
    } finally {
      setUpdatingItem(null);
    }
  };

  const removeItem = async (item) => {
    const productId = item.productId?._id || item.productId?.id || item.productId;
    if (!productId) return;

    setUpdatingItem(productId);
    try {
      const { data } = await axios.delete(`${BASE_URL}/api/cart`, {
        headers: getAuthHeaders(),
        params: { productId },
      });
      setCart(data || { items: [] });
      const count = (data?.items || []).reduce((sum, item) => sum + Number(item.quantity || 1), 0);
      localStorage.setItem('cartCount', String(count));
      window.dispatchEvent(new Event('cart-updated'));
    } catch (err) {
      console.error('Unable to remove cart item:', err);
      setError(err.response?.data?.message || 'Unable to remove the selected item.');
    } finally {
      setUpdatingItem(null);
    }
  };

  const clearCart = async () => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/api/cart`, {
        headers: getAuthHeaders(),
      });
      setCart(data || { items: [] });
      localStorage.setItem('cartCount', '0');
      window.dispatchEvent(new Event('cart-updated'));
    } catch (err) {
      console.error('Unable to clear cart:', err);
      setError(err.response?.data?.message || 'Unable to clear your cart.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="cart-header">
          <div>
            <p className="eyebrow">Your bag</p>
            <h1>Shopping Cart</h1>
          </div>
          {cart.items.length > 0 && (
            <button className="secondary-btn" onClick={clearCart}>
              Clear cart
            </button>
          )}
        </div>

        {loading ? (
          <div className="cart-state">
            <p>Loading your cart...</p>
          </div>
        ) : error ? (
          <div className="cart-state">
            <p>{error}</p>
            <button className="primary-btn" onClick={() => navigate('/login')}>
              Log in to continue
            </button>
          </div>
        ) : cart.items.length === 0 ? (
          <div className="cart-state empty-state">
            <h2>Your cart is empty</h2>
            <p>Add a few favourites and they will appear here.</p>
            <button className="primary-btn" onClick={() => navigate('/dresses')}>
              Continue shopping
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.items.map((item) => {
                const product = item.productId;
                const price = Number(product?.price || 0);
                const productId = product?._id || product?.id || item.productId;
                const qty = Number(item.quantity || 1);

                return (
                  <div className="cart-item" key={`${productId}-${item.selectedSize}-${item.selectedColor}`}>
                    <div className="item-preview">
                      <span>{product?.name?.charAt(0) || 'G'}</span>
                    </div>

                    <div className="item-details">
                      <h3>{product?.name || 'Product'}</h3>
                      <p className="item-meta">
                        Size: {item.selectedSize || 'N/A'} • Color: {item.selectedColor || 'N/A'}
                      </p>
                      <p className="item-price">₹{price.toLocaleString()}</p>
                    </div>

                    <div className="quantity-controls">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item, qty - 1)}
                        disabled={updatingItem === productId}
                      >
                        −
                      </button>
                      <span>{qty}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item, qty + 1)}
                        disabled={updatingItem === productId}
                      >
                        +
                      </button>
                    </div>

                    <div className="item-actions">
                      <button
                        className="text-btn"
                        onClick={() => removeItem(item)}
                        disabled={updatingItem === productId}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <aside className="summary-card">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>₹{subtotal.toLocaleString()}</strong>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <strong>Free</strong>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <strong>₹{subtotal.toLocaleString()}</strong>
              </div>
              <button className="primary-btn full-width" onClick={() => navigate('/dresses')}>
                Continue shopping
              </button>
            </aside>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
