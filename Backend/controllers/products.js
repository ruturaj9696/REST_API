const Product = require("../models/product.js");

const getAllProducts = async (req, res) => {
  try {
    const mydata = await Product.find({});
    console.log(mydata);
    res.status(200).json({ data: mydata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAllProducts };
