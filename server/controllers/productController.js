const Product = require('../models/nosql/Product');

const get_all_products = async(req, res) => {
    try{
        const page = Math.max(parseInt(req.query.page || '1', 10), 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit || '20', 10), 1), 100);
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.category) filter.category = req.query.category;
        if (req.query.tag) filter.tags = req.query.tag;
        if (req.query.available === 'true') filter.isAvailable = true;

        const [items, total] = await Promise.all([
            Product.find(filter).skip(skip).limit(limit).lean(),
            Product.countDocuments(filter)
        ]);

        res.status(200).json({
            page,
            limit,
            total,
            items
        });
    }
    catch(error){
        res.status(500).json({ message: 'Unable to retrieve products at this time.' });
    }
}

const get_product_by_id = async(req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) return res.status(404).json({ message: 'Product not found.' });


        res.status(200).json({ product });
    }
    catch(error){
        res.status(500).json({ message: 'Unable to retrieve product details.' });
    }
}


const search_products = async(req, res) => {
     try {
        const q = (req.query.q || '').trim();
        if (!q) return res.status(400).json({ message: 'Search query `q` is required.' });

        const page = Math.max(parseInt(req.query.page || '1', 10), 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit || '20', 10), 1), 100);
        const skip = (page - 1) * limit;

        const docs = await Product.find(
            { $text: { $search: q } },
            { score: { $meta: 'textScore' } }
        )
            .sort({ score: { $meta: 'textScore' } })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Product.countDocuments({ $text: { $search: q } });

        res.status(200).json({ page, limit, total, items: docs });
    } catch (error) {
        res.status(500).json({ message: 'Search failed.' });
    }
}

module.exports = {get_all_products, get_product_by_id, search_products};