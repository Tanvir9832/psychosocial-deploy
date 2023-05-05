const mongoose = require('mongoose');

const connectDatabase =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('database connected');
    } catch (error) {
        console.log(`database connection problem ${error}`);
    }    
}
module.exports = connectDatabase;