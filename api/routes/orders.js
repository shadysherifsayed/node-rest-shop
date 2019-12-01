const router = require('express').Router();

const OrderController = require('../../controllers/OrderController');

router.get('/', OrderController.index);

router.post('/:product', OrderController.store);

router.delete('/', OrderController.destroyAll);

router.get('/:order', OrderController.show);

router.put('/:order', OrderController.update);

router.patch('/:order', OrderController.update);

router.delete('/:order', OrderController.destroy);

module.exports = router;
