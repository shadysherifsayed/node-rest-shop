const router = require('express').Router();


const ProductController = require('../../controllers/ProductController');


/**
 * @description Get All Products
 * @return JSON
 */

router.get('/', ProductController.index);

/**
 * @description Create a new product
 */
router.post('/', ProductController.store);

router.delete('/', ProductController.destroyAll);

router.get('/:product', ProductController.show);

router.put('/:product', ProductController.update);

router.patch('/:product', ProductController.update);

router.delete('/:product', ProductController.destroy);

module.exports = router;
