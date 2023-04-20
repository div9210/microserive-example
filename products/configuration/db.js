const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_URL || "mysql://root:db@1234@localhost:3306/product_db",
  {
    logging: false,
  }
);

(async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    // await sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
