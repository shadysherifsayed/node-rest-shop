const { check, validationResult } = require('express-validator')

const productValidatationRules = () => {

    return [
        check('price').bail().exists().isNumeric(),
        check('name').bail().exists().isLength({ min: 5 }),
    ];
}


const validate = (request, response, next) => {

    const errors = validationResult(request);

    console.log(errors);

    if (errors.isEmpty()) next();

    const error = new Error();

    error.status = 422;

    error.message = { errors: errors.array() }

    next(error)
}


module.exports = {
    validate,
    productValidatationRules,
}
