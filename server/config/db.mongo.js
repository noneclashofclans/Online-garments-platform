const mongoose = require('mongoose');

const connect_mongodb = async() => {
    const link = process.env.MONGO_URI;

    try{
        const options = {
            autoIndex: true,
            autoCreate: true,
            bufferCommands: true,
            family: 4,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        const mongodb_connection = await mongoose.connect(link, options);
        console.log('MongoDB is connected');
    }
    catch(error){
        console.error('Error connecting mongo db', error.message);
        process.exit(1);
    }
}


module.exports = connect_mongodb;