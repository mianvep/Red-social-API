const Users = require("./user.model");
const Roles = require("./roles.model");
const Reservations = require("./reservations.model");
const Accomodations = require("./accomodations.model");

const initModels = () => {
	Users.hasOne(Roles);
	Roles.belongsToMany(Users);

	Users.belongsToMany(Accomodations, { through: Reservations });
	Accomodations.belongsToMany(Users, { through: Reservations });
};

module.exports = initModels;
