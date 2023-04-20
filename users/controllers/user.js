const Users = require("../configuration/models/User");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await Users.findAll({});

      return res.status(200).json({
        status: true,
        data: allUsers,
        loggedInUser: req.userInformation,
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await Users.findOne({
        where: {
          user_id: id,
        },
      });

      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }

      return res.status(200).json({
        status: true,
        data: user,
        loggedInUser: req.userInformation,
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  deleteUserById: async (req, res) => {
    try {
      const { id } = req.params;

      if (Number(id) === req.userInformation.user_id) {
        return res
          .status(401)
          .json({ status: false, message: "You cannot delete yourself." });
      }

      if (!req.userInformation.is_admin) {
        return res
          .status(401)
          .json({ status: false, message: "You are not authorized." });
      }

      const user = await Users.findOne({
        where: {
          user_id: id,
        },
      });

      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }

      await Users.destroy({
        where: {
          user_id: id,
        },
      });

      return res.status(200).json({
        status: true,
        message: "User deleted successfully",
        loggedInUser: req.userInformation,
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};
