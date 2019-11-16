const app = require('./app');

require('dotenv').config()

const config = require('./config/app');

require('./packages')

app.use(require('./api/routes/index'));

const mongoose = require('./database');

// Handling 404 Errors
app.use((request, response, next) => {

    const error = new Error('Page Not Found');

    error.status = 404;

    next(error);
});

// Handling other errors
/* app.use((error, request, response, next) => {

    response.status(error.status || 500);

    response.json({
        trace: error,
        error: error.message || 'Interval Server Error',
    })

    next(error);
});
 */
app.listen(config.port, () => console.log(`App is listening on port ${config.port}!`));
