const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://abhisheksharma32344:abhi70788@cluster0.ik9oz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        // const conn = await mongoose.connect('mongodb://127.0.0.1:27017/test');

        console.log(`This is connected ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in connecting with MongoDB ${error}`);
    }
};

module.exports = connectDb;