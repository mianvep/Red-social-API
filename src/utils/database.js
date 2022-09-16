const { Sequelize } = require("sequelize");

const db = new Sequelize({
	dialect: "postgres",
	host: "localhost",
	username: "postgres",
	password: "u$C!^e8$Wr",
	database: "redsocial",
});

module.exports = { db };
