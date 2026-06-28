const mongoose =require('mongoose')

const BrandSchema = new mongoose.Schema({
    name: {
        type : String,
        required : [true , 'Brand required'],
        unique : [true , 'Brand required'],
        minlength : [3 , 'Too short Brand name'],
        maxlength : [32 , 'Too long Brand name'],
    },
    slug :{
        type : String ,
        lowercase : true,
    },
    image : String,
}, {timestamps : true})


module.exports = mongoose.model('Brand' , BrandSchema)
