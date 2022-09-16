const uuid = require("uuid");

const publicationsDB = [];

const getAllPublic = () => {
	return publicationsDB;
};

const getPublicById = (id) => {
	const data = publicationsDB.filter((item) => item.id === id);
	return data ? data[0] : false;
};

const createPublic = (data) => {
	const newUser = {
		id: uuid.v4(),
		type: "string",
		amount: "number",
	};
	database.push(newUser);
	return newUser;
};

const editPublic = (id, data) => {
	const index = database.findIndex((user) => user.id === id);
	if (index !== -1) {
		database[index] = {
			id: id,
			type: data.type,
			amount: data.amount,
		};
		return database[index];
	} else {
		return createPublic(data);
	}
};

const deletePublic = (id) => {
	const index = database.findIndex((user) => user.id === id);
	if (index !== -1) {
		database.splice(index, 1);
		return true;
	} else {
		return false;
	}
};

module.exports = {
	getAllPublic,
	getPublicById,
	createPublic,
	editPublic,
	deletePublic,
};
