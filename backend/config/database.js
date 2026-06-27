const mongoose = require('mongoose')

const DBconnection  = () => {
    mongoose.connect(process.env.DATA_URL).then((conn) => {
        console.log(`Database connected: ${conn.connection.host}`)
    }).catch((err) => {
        console.log(`database err: ${err}`)
        process.exit(1)
    })
}


module.exports = DBconnection



