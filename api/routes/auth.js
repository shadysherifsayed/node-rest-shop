const router = require('express').Router();

const UserAuthController = require('../../controllers/UserAuthController');

router.post('/users/login', UserAuthController.login);

router.post('/users/register', UserAuthController.register);

module.exports = router;
