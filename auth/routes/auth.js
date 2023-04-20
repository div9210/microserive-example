const express = require("express");

const router = express.Router();
const loginController = require("../controllers/auth");

router.get("/", (req, res) => {
  res.send("Welcome to auth service.");
});

router.post("/register", loginController.register);
router.post("/register-admin", loginController.registerAdmin);
router.post("/login", loginController.login);
router.get("/verify-user", loginController.verifyUser);

module.exports = router;
