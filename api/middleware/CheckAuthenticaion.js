const JWT = require('jsonwebtoken');

const { secret_key: secretKey } = require('../../config/app');

const checkAuth = function (request, response, next) {

    try {

        const bearerToken = request.headers.authorization;

        const [_, token] = bearerToken.split(" ");

        const decodedData = JWT.verify(token, secretKey);

        request.user = decodedData;

        next();
    } catch (error) {

        response.status(401);

        next(error);
    }
}

module.exports = checkAuth;
