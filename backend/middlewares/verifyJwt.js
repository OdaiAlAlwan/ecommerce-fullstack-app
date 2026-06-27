const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError")

const verifyJwt = (req , res , next ) => {
    const authHeader = req.headers.authorization || req.headers.authorization

    if(!authHeader.startsWith('Bearer ')){
        return res.status(401).json({ message : 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token ,
        process.env.JWT_TOKEN_REFRESH ,
        (err , decoded) => {
          if(err) return next(new ApiError("there is error from decoded token", 403));
            req.userId = decoded.userId
            req.role =  decoded.role
            next()
        }
       )
}


module.exports = verifyJwt