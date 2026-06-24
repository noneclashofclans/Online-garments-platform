const mongoose = require('mongoose');


const variantSchema = new mongoose.Schema({
    size: { 
        type: String, 
        required: true,
        enum: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'OS'] 
    },

    color: { 
        type: String, 
        required: true 
    },
    sku: { 
        type: String, 
        required: true, 
        unique: true 
    }
}, { _id: false });


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required.'],
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: [true, 'Product description is required.']
    },
    price: {
        type: Number,
        required: [true, 'Product retail price is required.'],
        min: [0, 'Price cannot be negative.']
    },
    category: {
        type: String,
        required: [true, 'Category classification is required.'],
        index: true 
    },
    tags: {
        type: [String], 
        default: []
    },
    variants: [variantSchema], 
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

productSchema.index(
    {
        name: 'text',
        tags: 'text',
        category: 'text',
        description: 'text'
    },
    {
        weights: {
            name: 10,     
            tags: 5,        
            category: 3,    
            description: 1  
        },
        name: "ClothingCatalogSearchIndex"
    }
);

module.exports = mongoose.model('Product', productSchema);