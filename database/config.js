const mongoose = require('mongoose');

const dbConection = async () => {

    try {


        await mongoose.set("strictQuery", false);

        await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('DB Online')

    } catch (error) {
        console.log(error)
        throw new Error('Error en la base de datos')
    }
}


module.exports = {
    dbConection
}