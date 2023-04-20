const express = require("express");

const router = express.Router();

const productController = require("../controllers/product");

router.get("/all", productController.getAllProducts);
router.get("/get/:id", productController.getProductById);
router.post("/add", productController.addProduct);
router.put("/update/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
