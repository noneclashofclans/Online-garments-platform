const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db.mysql');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    orderNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: () => `ORD-${Date.now().toString().slice(-8)}`
    },
    
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false,
        defaultValue: 0.00
    },
    status: {
        type: DataTypes.ENUM('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'),
        defaultValue: 'pending',
        index: true 
    },
    paymentId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    shippingAddress: {
        type: DataTypes.TEXT, 
        allowNull: false
    },
    trackingNumber: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true 
});

module.exports = Order;