const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        default: 1
    },
    product_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Product'
    }
});

module.exports = mongoose.model('Order', OrderSchema);

