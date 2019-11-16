const mongoose = require('mongoose');

let mongooseHidden = require('mongoose-hidden')()

const bcrypt = require('bcryptjs');

const JWT = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        hide: true
    }
});

userSchema.plugin(mongooseHidden)

userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function (secretKey) {

    const token = JWT.sign({
        email: this.email,
        id: this._id,
    }, secretKey);

    return token;
}

userSchema.methods.toJSON = function () {

    const user = this._doc;

    delete user.password;

    delete user.__v;

    return user;
}

module.exports = mongoose.model('User', userSchema);
