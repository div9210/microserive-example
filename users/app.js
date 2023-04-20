const express = require("express");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const { verifyUser } = require("./middlewares/verifyUser");
require("./configuration/db");

const app = express();
app.use(express.json());

// Uncomment the following line to sync the models with the database
// require("./configuration/models/sync");

// Check the basic authentication then let the use move to userRoutes
app.use(verifyUser);
app.use("/api/user", userRoutes);

// Check the admin rights then let the use move to adminRoutes
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`User service on port: ${PORT}`));
