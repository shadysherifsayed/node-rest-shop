const { Schema, model } = require('mongoose');

const Order = require('./order');

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    }
});

productSchema.methods.deleteOrders = async function () {
    return await Order.deleteMany({ 'product_id': this._id });
}

productSchema.methods.addOrder = async function (data) {

    const order = new Order;

    order.product_id = this._id;

    if (data.quantity) {
        order.quantity = data.quantity;
    }

    return await order.save();

}

productSchema.methods.getOrders = async function () {
    return await Order.find({ 'product_id': this._id });
}

productSchema.post('deleteOne', async function (product, next) {

    const { _id: productId } = this.getQuery();

    await Order.deleteMany({ 'product_id': productId });

    next();
});

module.exports = model('Product', productSchema);

