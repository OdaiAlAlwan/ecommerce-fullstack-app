const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Too short product title'],
      maxlength: [100, 'Too long product title'],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [20, 'Too short product description'],
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      trim: true,
      max: [200000, 'Too long product price'],
    },
    imageCover: {
      type: String,
      required: [true, 'Product Image cover is required'],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Product must be belong to category'],
    },
  },
  { timestamps: true }
);

// // Mongoose query middleware
productSchema.pre(/^find/ , function (){
  this.populate({
    path : 'category',
    select : 'name _id'
  });
});


const setImageUrl = (doc) => {
  const baseUrl = process.env.BASE_URL;

  if (doc.imageCover) {
    if (!doc.imageCover.startsWith(baseUrl) && !doc.imageCover.startsWith('http')) {
      const imageUrl = `${baseUrl}/products/${doc.imageCover}`;
      doc.imageCover = imageUrl;
    }
  }

  if (doc.images) {
    const imagesList = doc.images.map((image) => {
      if (!image.startsWith(baseUrl) && !image.startsWith('http')) {
        return `${baseUrl}/products/${image}`;
      }
      return image;
    });
    doc.images = imagesList;
  }
};


// return url-Image after save image in database 

// findAll , findOne , update
productSchema.post("init", (doc) => {
  setImageUrl(doc)
});
// Create
productSchema.post("save", (doc) => {
  setImageUrl(doc)
});


module.exports = mongoose.model('Product', productSchema);