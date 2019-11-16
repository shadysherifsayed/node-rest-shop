
const Order = require('../models/order');
const Product = require('../models/product');

class OrderController {

    static async index(_, response, next) {

        try {

            const orders = await Order
                .find()
                .select('quantity')
                .populate('product_id', 'name price');

            return response.json({ orders })

        } catch (error) {
            next(error);
        }
    }

    static async store(request, response, next) {

        try {

            const product = await Product.findById(request.params.product).orFail();

            const order = await product.addOrder(request.body);

            response.json({ order });

        } catch (error) {
            next(error);
        }

    }

    static async show(request, response, next) {

        try {
            const order = await Order
                .findById(request.params.order)
                .populate('product_id', 'name price')
                .orFail();

            response.json({
                order
            });

        } catch (error) {
            next(error);
        }
    }

    static async update(request, response, next) {

        try {

            const updatedProperties = {};

            ['name', 'price'].forEach(property => {

                const propertyValue = request.body[property];

                if (!propertyValue) return;

                updatedProperties[property] = propertyValue;

            });

            const orderId = request.params.order;

            await Order.findByIdAndUpdate(orderId, updatedProperties).orFail();

            response.json({
                order: await Order.findById(orderId).exec()
            });
        } catch (error) {
            next(error);
        }
    }

    static async destroy(request, response, next) {

        try {
            await Order.deleteOne({ _id: request.params.order }).orFail();

            response.json({
                result: 'Order deleted'
            });
        } catch (error) {
            next(error);
        }
    }

    static async destroyAll(_, response) {

        await Order.deleteMany();

        response.json({ result: 'All orders were deleted' });
    }

}

module.exports = OrderController;
