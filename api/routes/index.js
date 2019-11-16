const app = require('express')();

const checkAuth = require('../middleware/CheckAuthenticaion');

app.route('', (_, response) => response.send('Hello World'));

app.use('/products', checkAuth, require('./products'));

app.use('/orders', require('./orders'));

app.use('/', require('./auth'));

module.exports = app;
