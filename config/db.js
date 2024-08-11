const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI);
        if(con){
            console.log("MongoDB connected successfully");
        }
        else{
            console.log("MongoDB not connected, try again...");
        }
    } catch (error) {
        console.log("something went wrong");
        process.exit();
    }
}

module.exports = connectDb;