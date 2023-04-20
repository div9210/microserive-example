const Product = require("../configuration/models/product");

module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
      const allProducts = await Product.findAll();
      res.status(200).json({
        status: true,
        message: "All products",
        data: allProducts,
      });
    } catch (error) {
      next(error);
    }
  },
  getProductById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: {
          product_id: id,
        },
      });
      if (!product) {
        return res.status(200).json({
          status: false,
          message: "Product not found",
        });
      }
      return res.status(200).json({
        status: true,
        message: "Product found",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },
  addProduct: async (req, res, next) => {
    try {
      const { name, price, description, stock } = req.body;
      const { user_id, is_admin } = req.userInformation;

      if (!is_admin) {
        return res.status(200).json({
          status: false,
          message: "You are not authorized to add a product.",
        });
      }

      const product = await Product.create({
        product_name: name,
        price,
        description,
        stock,
        added_by: user_id,
      });

      return res.status(200).json({
        status: true,
        message: "Product added successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const { name, price, description, stock } = req.body;
      const { user_id, is_admin } = req.userInformation;
      const { id } = req.params;

      if (!is_admin) {
        return res.status(200).json({
          status: false,
          message: "You are not authorized to update a product.",
        });
      }

      const product = await Product.findOne({
        where: {
          product_id: id,
        },
      });

      if (!product) {
        return res.status(200).json({
          status: false,
          message: "Product not found",
        });
      }

      const updatedProduct = await product.update({
        product_name: name,
        price,
        description,
        stock,
        updated_by: user_id,
      });

      return res.status(200).json({
        status: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const { is_admin } = req.userInformation;
      const { id } = req.params;

      if (!is_admin) {
        return res.status(200).json({
          status: false,
          message: "You are not authorized to delete a product.",
        });
      }

      const product = await Product.findOne({
        where: {
          product_id: id,
        },
      });

      if (!product) {
        return res.status(200).json({
          status: false,
          message: "Product not found",
        });
      }

      await product.destroy();

      return res.status(200).json({
        status: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
