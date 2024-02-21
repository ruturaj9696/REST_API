const express = require("express");
const router =express.Router();
// const {
//   getAllProducts,
//   getAllProductsTesting,
// } = require("../controllers/products");

const getAllProducts = async (req, res) => {
  try {
      const mydata = await Product.find({});
      res.status(200).json({ data: mydata });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
};

router.route("api/get /").get(getAllProducts);
//router.route("/testing").get(getAllProductsTesting);

module.exports = router;
