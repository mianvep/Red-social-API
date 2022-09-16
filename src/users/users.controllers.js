const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const Users = require("../models/user.model");

const userDB = [
	{
		id: "1",
		name: "Miguel",
		gender: "string",
		email: "miguel@gmail.com",
		password: "miguel123",
		phone: "00000",
		birthday_date: "23/01/1996",
		rol: "normal",
		profile_image: "",
		is_active: true,
		verified: false,
	},
];

const getAllUsers = async () => {
	const data = await Users.findAll({
		attributes: {
			exclude: ["password"],
		},
	});
	return data;
};

const getUserById = async (id) => {
	const data = await Users.findOne({
		where: {
			id,
		},
		attributes: {
			exclude: ["password"],
		},
	});
	return data;
};

const createUser = async (data) => {
	const newUser = await Users.create({
		id: uuid.v4(),
		name: data.name,
		gender: data.gender,
		email: data.email,
		password: hashPassword(data.password),
		phone: data.phone,
		birthdayDate: data.birthday_date,
		role: "normal",
		profileImage: data.profile_image,
		status: "active",
		verified: false,
	});
	return newUser;
};

const editUser = (id, data, userRol) => {
	const index = userDB.findIndex((user) => user.id === id);
	if (index !== -1) {
		userDB[index] = {
			id: id,
			name: data.name,
			gender: data.gender,
			email: data.email,
			password: userDB[index].password,
			phone: data.phone, //unico
			birthday_date: data.birthday_date,
			rol: userRol === "admin" ? data.rol : "normal",
			profile_image: data.profile_image,
			is_active: data.is_active,
			verified: false,
		};
		return userDB[index];
	} else {
		return createUser(data);
	}
};

const deleteUser = async (id) => {
	const data = await Users.destroy({
		where: {
			id: id,
		},
	});
	return data;
};

const getUserByEmail = (email) => {
	const data = userDB.filter((item) => item.email === email);
	return data.length ? data[0] : false;
};

const editProfileImg = (userID, imgUrl) => {
	const index = userDB.findIndex((user) => user.id === userID);
	if (index !== -1) {
		userDB[index].profile_image = imgUrl;
		return userDB[index];
	}
	return false;
};

module.exports = {
	createUser,
	getAllUsers,
	getUserById,
	editUser,
	deleteUser,
	getUserByEmail,
	editProfileImg,
};
