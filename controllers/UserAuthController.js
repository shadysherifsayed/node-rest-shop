const User = require('../models/user');
const bcrypt = require('bcryptjs');

const { secret_key: secretKey } = require('../config/app');

class UserAuthController {

    static async login(request, response, next) {

        try {

            const { email, password } = request.body;

            const user = await User.findOne({ email });

            if (!user) return next({ message: "User doesn't exist." });

            if (await user.validatePassword(password) === false) return next({ message: 'Incorrect password.' });

            const token = user.generateAccessToken(secretKey);

            response.json({
                user,
                token
            })

        } catch (error) {
            next(error);
        }

    }

    static async register(request, response, next) {

        try {

            const data = request.body;

            const user = new User;

            user.email = data.email;

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(data.password, salt);

            await user.save();

            response.json({ user })

        } catch (error) {
            next(error);
        }

    }
}

module.exports = UserAuthController;
