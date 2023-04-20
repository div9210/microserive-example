const bcrypt = require("bcrypt");
const Users = require("../configuration/models/User");
const jwt = require("jsonwebtoken");

function checkEmail(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  register: async (req, res) => {
    try {
      const { username, password, age, email } = req.body;

      // Check if username and password are provided
      if (!username || !password || !email) {
        return res.status(400).json({
          status: false,
          message: "Username, email and password required.",
        });
      }

      // Check for email validation
      if (!checkEmail(email)) {
        return res
          .status(400)
          .json({ status: false, message: "Email is not valid." });
      }

      // Check if user already exists
      const findUser = await Users.findOne({
        where: {
          email: email,
          is_admin: false,
        },
      });

      if (findUser) {
        return res
          .status(400)
          .json({ status: false, message: "User already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await Users.create({
        username,
        password: hashedPassword,
        email,
        age,
        is_admin: false,
      });
      return res
        .status(201)
        .json({ status: false, message: "User created successfully." });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  registerAdmin: async (req, res) => {
    try {
      const { username, password, age, email } = req.body;

      // Check if username and password are provided
      if (!username || !password || !email) {
        return res.status(400).json({
          status: false,
          message: "Username, email and password required.",
        });
      }

      // Check for email validation
      if (!checkEmail(email)) {
        return res
          .status(400)
          .json({ status: false, message: "Email is not valid." });
      }

      // Check if user already exists
      const findUser = await Users.findOne({
        where: {
          email,
          is_admin: true,
        },
      });

      if (findUser) {
        return res
          .status(400)
          .json({ status: false, message: "User already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await Users.create({
        username,
        email,
        password: hashedPassword,
        age,
        is_admin: true,
      });

      return res
        .status(201)
        .json({ status: true, message: "Admin created successfully." });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          status: false,
          message: "Email and Password are required.",
        });
      }

      if (!checkEmail(email)) {
        return res
          .status(400)
          .json({ status: false, message: "Email is not valid." });
      }

      const findUser = await Users.findOne({
        where: {
          email: email,
        },
      });

      if (!findUser) {
        return res.status(404).json({
          status: false,
          message: "No user found with this email.",
        });
      }

      const userPassword = findUser.dataValues.password;
      const isPasswordValid = await bcrypt.compare(password, userPassword);
      if (isPasswordValid) {
        const token = jwt.sign(
          {
            ...findUser.dataValues,
          },
          "Avengers Assemble!",
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          status: true,
          message: "Login Successful : Welcome!",
          accessToken: token,
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Login Unsuccessful: Wrong Password",
        });
      }
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  verifyUser: async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, "Avengers Assemble!");
      if (!decodedToken) {
        return res.status(200).json({
          status: false,
          message: "Unauthorized Access.",
        });
      }

      const findUser = await Users.findOne({
        where: {
          user_id: decodedToken.user_id,
        },
      });
      if (findUser) {
        return res.status(200).json({
          status: true,
          message: "User verified.",
          user: {
            user_id: findUser.dataValues.user_id,
            username: findUser.dataValues.username,
            age: findUser.dataValues.age,
            is_admin: findUser.dataValues.is_admin,
          },
        });
      } else {
        return res.status(404).json({
          status: false,
          message: "User not found.",
        });
      }
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};
