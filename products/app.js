const express = require("express");
const { verifyUser } = require("./middleware/verifyUser");
const productRoutes = require("./routes/product");

const app = express();
app.use(express.json());
require("./configuration/db");

// Uncomment the following line to sync the models with the database
// require("./configuration/models/sync");

app.use(verifyUser);

app.use("/api/products", productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    status: false,
    message: err.message,
  });
});

app.listen(5002, () => console.log("Product service on port: 5002"));
