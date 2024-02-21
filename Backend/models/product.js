const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);





// const mongoose =require("mongoose");

// const productSchema = new mongoose.Schema({
//   name:{
//     type:String,
//     required:true,
//   },
//   price:{
//     type:Number,
//     required:true,
//   },
//   featured:{
//     type:Boolean,
//     default:false,
//   },
//   rating:{
//     type:Number,
//     default:4.9,
//   },
//   CreatedAt:{
//     type:Date,
//     default:Date.now(),
//   },
//   company:{
//     type:String,
//     enum:{
//       values:["apple","samsung","dell","mi"],
//       message:`{value} is not supported`,
//     },
//   },
// })

// module.exports=mongoose.model("Product",productSchema);
