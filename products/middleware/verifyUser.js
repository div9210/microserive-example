const axios = require("axios");

module.exports = {
  verifyUser: async (req, res, next) => {
    try {
      const loginResponse = await axios.get(
        "http://localhost:5001/api/auth/verify-user",
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        }
      );

      req.userInformation = {
        ...loginResponse.data.user,
      };

      next();
    } catch (error) {
      return res
        .status(200)
        .json({ status: false, message: "Authentication token failed!" });
    }
  },
};
