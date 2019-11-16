const mongoose = require('mongoose');

mongoose.Promise = Promise;

const { mongodb } = require('./config/database');

const { username, password, host, port, database_name } = mongodb;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

try {
    mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database_name}`, options)
} catch (error) {
    console.error(error)
}


//Get the default connection
const connection = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
connection.on('error', () => console.error('MongoDB connection error:'));

connection.on('connected', () => console.log('Mongoose is connected'));

module.exports = mongoose;

