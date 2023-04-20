const express = require("express");
const authRoutes = require("./routes/auth");
require("dotenv").config({ path: "./.env" });
require("./configuration/db");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Auth service on port: ${PORT}`));
