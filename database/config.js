const mongoose = require('mongoose')


const dbConnection = async() => {
    try {

        console.log(process.env.MONGODB_CNN , ' ... ');

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,   //NO SUPPORT  
            // useFindAndModify: false //NO SUPPORT
        });

        console.log('Online DB.....')
        
    } catch (error) {
        console.log(error)
        throw new Error('DB initialization Error')
    }

}

module.exports = {
    dbConnection
}