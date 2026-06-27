const path = require('path');
const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const compression = require('compression')
const cookieParser = require('cookie-parser')

const DBconnection = require('./config/database')

dotenv.config({path:'config.env'})
const ApiError = require('./utils/ApiError')
const globalError = require('./middlewares/errorMiddleware')

const mountRoutes = require('./routes');

const app = express()

// Connect DB
DBconnection()


// Enable other domains to access your application
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
))
app.options(/.*/, cors())

// compress all responses
app.use(compression())

//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'uploads')));


// Route
mountRoutes(app)




app.all(/.*/ , (req ,res ,next ) => {
    next(new ApiError(`Can't find this route ${req.originalUrl}`,400))
})


// Global error handling middleware 
app.use(globalError)




const server = app.listen(process.env.PORT, () =>{
    console.log('The application is working now....')
})


// Event For handel any Error outside Express
process.on('unhandledRejection' , (err) => {
    console.error(`UnhandledRejection Error : ${err.name} | ${err.message}`)
    server.close(() => {
        console.log('Server Shutting down.....')
        process.exit(1)
    })

})