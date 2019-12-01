const router = require('express').Router();

const ProductController = require('../../controllers/ProductController');

const { productValidatationRules, validate } = require('../requests/Validators');

router.get('/', ProductController.index);

router.post('/', productValidatationRules(), validate, ProductController.store);

router.delete('/', ProductController.destroyAll);

router.get('/:product', ProductController.show);

['put', 'patch'].forEach(httpMethod => {
    router[httpMethod]('/:product', productValidatationRules(), ProductController.update);
});

router.delete('/:product', ProductController.destroy);

module.exports = router;
