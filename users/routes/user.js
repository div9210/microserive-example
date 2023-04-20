const router = require("express").Router();
const UserControllers = require("../controllers/user");

router.get("/", (req, res) => {
  res.send("Welcome to users service.");
});

router.get("/all", UserControllers.getAllUsers);
router.get("/get/:id", UserControllers.getUserById);
router.delete("/delete/:id", UserControllers.deleteUserById);

module.exports = router;
