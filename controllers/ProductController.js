
const Product = require('../models/product');

class ProductController {

    static async index(_, response, next) {

        try {

            const products = await Product.find();

            return response.json({ products })

        } catch (error) {
            next(error);
        }
    }

    static async store(request, response, next) {

        try {

            const product = new Product;

            product.name = request.body.name;

            product.price = request.body.price;

            await product.save();

            response.json({ product });

        } catch (error) {
            next(error);
        }

    }

    static async show(request, response, next) {

        try {
            const product = await Product.findOne({ _id: request.params.product }).orFail();
            response.json({
                product
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

            const productId = request.params.product;

            await Product.findByIdAndUpdate(productId, updatedProperties).orFail();

            response.json({
                product: await Product.findById(productId).exec()
            });
        } catch (error) {
            next(error);
        }
    }

    static async destroy(request, response, next) {
        try {
            await Product.deleteOne({ _id: request.params.product }).orFail();

            response.json({
                result: 'Product deleted'
            });
        } catch (error) {
            next(error);
        }
    }

    static async destroyAll(_, response) {

        await Product.deleteMany();

        response.json({ result: 'All products were deleted' });
    }

}

module.exports = ProductController;
