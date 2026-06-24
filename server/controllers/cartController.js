const Cart = require('../models/nosql/Cart');
const Product = require('../models/nosql/Product');

const get_cart = async (req, res) => {
    try {
        const userId = req.userId;
        const cart = await Cart.findOne({ userId }).populate('items.productId').lean();
        if (!cart) return res.status(200).json({ userId, items: [] });
        return res.status(200).json(cart);
    } catch (error) {
        console.error('getCart error:', error);
        res.status(500).json({ message: 'Unable to retrieve cart.' });
    }
};

const add_or_update_cartItem = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId, quantity = 1, selectedSize, selectedColor } = req.body;

        if (!productId || !selectedSize || !selectedColor) {
            return res.status(400).json({ message: 'productId, selectedSize and selectedColor are required.' });
        }

        const product = await Product.findById(productId);
        if (!product || !product.isAvailable) {
            return res.status(400).json({ message: 'Product unavailable.' });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = await Cart.create({ userId, items: [] });
        }

        const existingIndex = cart.items.findIndex(i => i.productId.toString() === productId && i.selectedSize === selectedSize && i.selectedColor === selectedColor);
        if (existingIndex > -1) {
            if (quantity <= 0) {
                cart.items.splice(existingIndex, 1);
            } else {
                cart.items[existingIndex].quantity = Math.max(1, quantity);
            }
        } else {
            if (quantity > 0) {
                cart.items.push({ productId, quantity: Math.max(1, quantity), selectedSize, selectedColor });
            }
        }

        await cart.save();
        const updated = await Cart.findOne({ userId }).populate('items.productId').lean();
        res.status(200).json(updated || { userId, items: [] });
    } catch (error) {
        console.error('addOrUpdateCartItem error:', error);
        res.status(500).json({ message: 'Unable to update cart.' });
    }
};

const clear_cart = async (req, res) => {
    try {
        const userId = req.userId;
        const productId = req.query.productId || req.body.productId;

        if (productId) {
            const cart = await Cart.findOne({ userId });
            if (!cart) {
                return res.status(200).json({ message: 'Cart is already empty.', items: [] });
            }

            cart.items = cart.items.filter(item => item.productId.toString() !== productId);
            await cart.save();
            const updated = await Cart.findOne({ userId }).populate('items.productId').lean();
            return res.status(200).json(updated || { userId, items: [] });
        }

        await Cart.findOneAndDelete({ userId });
        res.status(200).json({ message: 'Cart cleared.', items: [] });
    } catch (error) {
        console.error('clearCart error:', error);
        res.status(500).json({ message: 'Unable to clear cart.' });
    }
};

module.exports = { get_cart, add_or_update_cartItem, clear_cart };