const app = require('./app');

const morgran = require('morgan');

const bodyParser = require('body-parser');

app.use(morgran('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Enable CORS
app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*');

    response.header('Access-Content-Allow-Headers', '*');

    if (request.method.toUpperCase() === 'OPTIONS') {

        response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

        return response.status(200).json({});
    }

    next();
});

