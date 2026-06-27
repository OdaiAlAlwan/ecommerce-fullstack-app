const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "Category required"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);



const setImageUrl = (doc) => {
    const baseUrl = process.env.BASE_URL;
    if (doc.image) {
      if (!doc.image.startsWith(baseUrl)) {
        const imageUrl = `${baseUrl}/category/${doc.image}`;
        doc.image = imageUrl;
      }
}};

// return url-Image after save image in database 

// findAll , findOne , update
categorySchema.post("init", (doc) => {
  setImageUrl(doc)
});
// Create
categorySchema.post("save", (doc) => {
  setImageUrl(doc)
});

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
