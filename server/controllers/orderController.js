const Order = require('../models/relational/Order');
const OrderItem = require('../models/relational/OrderItems');
const Product = require('../models/nosql/Product');
const Cart = require('../models/nosql/Cart');
const { sequelize } = require('../config/db.mysql');

const process_checkout = async (req, res) => {
    const userId = req.user?.id || req.userId;
    const { shippingAddress, items } = req.body;

    if (!userId) {
        return res.status(401).json({ message: 'User authentication required.' });
    }

    if (!shippingAddress || typeof (shippingAddress) !== 'string' || shippingAddress.trim().length === 0) {
        return res.status(400).json({ message: 'A valid shipping address is required.' });
    }

    const transaction = await sequelize.transaction();

    try {
        let cartItems = items;
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            const cart = await Cart.findOne({ userId });
            cartItems = cart?.items || [];
        }

        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            throw new Error('Your cart is empty.');
        }

        let totalAmount = 0;
        const verifiedItems = [];

        for (const item of cartItems) {
            const product = await Product.findById(item.productId);
            if (!product || !product.isAvailable) {
                throw new Error(`Product ${item.productId} is unavailable.`);
            }

            const quantity = Math.max(1, item.quantity || 1);
            const lineTotal = product.price * quantity;
            totalAmount += lineTotal;

            verifiedItems.push({
                mongoProductId: product._id.toString(),
                productName: product.name,
                selectedSize: item.selectedSize,
                selectedColor: item.selectedColor,
                purchasePrice: product.price,
                quantity
            });
        }

        if (totalAmount > 0 && totalAmount <= 150) {
            totalAmount += 15.0;
        }

        const newOrder = await Order.create({
            userId,
            totalAmount,
            shippingAddress,
            status: 'processing'
        }, { transaction });

        for (const vItem of verifiedItems) {
            await OrderItem.create({
                orderId: newOrder.id,
                ...vItem
            }, { transaction });
        }

        await Cart.findOneAndDelete({ userId });
        await transaction.commit();

        res.status(201).json({
            message: 'Order processed successfully.',
            orderId: newOrder.id
        });
    } catch (error) {
        await transaction.rollback();
        console.error('Checkout failed:', error);
        res.status(400).json({ message: error.message || 'Transaction failed. Rolled back.' });
    }
};

const get_order_history = async (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'User authentication required.' });
    }

    try {
        const orders = await Order.findAll({
            where: { userId },
            include: [{ model: OrderItem, as: 'items' }],
            order: [['createdAt', 'DESC']]
        });

        return res.json({ orders });
    } catch (error) {
        console.error('Failed to load order history:', error);
        return res.status(500).json({ message: 'Unable to load order history.' });
    }
};

module.exports = { process_checkout, get_order_history };