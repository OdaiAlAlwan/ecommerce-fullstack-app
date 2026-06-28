const CategoryRoute= require('./CategoryRoute')
const ProductRoute= require('./ProductRoute')
const UserRoute= require('./UserRoute')
const AuthRoute= require('./AuthRoute')
const CartRoute = require('./CartRoute')
const OrderRoute = require('./orderRoute')
const BrandsRoute = require('./BrandRoute')

const mountRoutes = (app) => {
    app.use('/api/v1/categories' , CategoryRoute)
    app.use('/api/v1/products' , ProductRoute)
    app.use('/api/v1/user' , UserRoute)
    app.use('/api/v1/auth' , AuthRoute)
    app.use('/api/v1/cart' , CartRoute )
    app.use('/api/v1/order' , OrderRoute )
    app.use('/api/v1/brands' , BrandsRoute)
}

module.exports = mountRoutes