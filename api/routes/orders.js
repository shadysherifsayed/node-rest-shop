const router = require('express').Router();

const OrderController = require('../../controllers/OrderController');

/**
 * @description Get All Orders
 * @return JSON
 */

router.get('/', OrderController.index);

/**
 * @description Create a New Order
 */
router.post('/:product', OrderController.store);

router.delete('/', OrderController.destroyAll);

router.get('/:order', OrderController.show);

router.put('/:order', OrderController.update);

router.patch('/:order', OrderController.update);

router.delete('/:order', OrderController.destroy);

module.exports = router;
