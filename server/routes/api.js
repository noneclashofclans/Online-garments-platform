const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const { get_all_products, get_product_by_id, search_products } = require('../controllers/productController');
const { process_checkout, get_order_history } = require('../controllers/orderController');
const { authenticateJWT, identifyUser } = require('../middleware/authMiddleware');
const { get_cart, add_or_update_cartItem, clear_cart } = require('../controllers/cartController');

router.post('/auth/register', register);
router.post('/auth/login', login);

router.get('/products/search', search_products); 
router.get('/products', get_all_products);
router.get('/products/:id', get_product_by_id);

router.post('/checkout', authenticateJWT, process_checkout);
router.get('/orders', authenticateJWT, get_order_history);

router.get('/cart', identifyUser, get_cart);
router.post('/cart', identifyUser, add_or_update_cartItem);
router.delete('/cart', identifyUser, clear_cart);

module.exports = router;