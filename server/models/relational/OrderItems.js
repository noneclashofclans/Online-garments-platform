const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db.mysql');

const OrderItems = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Orders',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    mongoProductId: {
        type: DataTypes.STRING(24), 
        allowNull: false
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    selectedSize: {
        type: DataTypes.STRING,
        allowNull: false
    },
    selectedColor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    purchasePrice: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    }
}, {
    timestamps: true 
});

module.exports = OrderItems;