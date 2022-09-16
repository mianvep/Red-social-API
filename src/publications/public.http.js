const publicControllers = require("./public.controllers");

const getAll = (req, res) => {
	publicControllers
		.getAllPublic()
		.then((response) => {
			res.status(200).json({ items: response.length });
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

const getById = (req, res) => {
	const id = req.params.id;
	publicControllers
		.getPublicById(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((err) => {
			res
				.status(404)
				.json({ message: `La publicación con el id ${id} no existe` });
		});
};

const remove = (req, res) => {
	const id = req.params.id;
	publicControllers.deletePublic(id).then((response) => {
		if (response) {
			res.status(204).json();
		} else {
			res.status(400).json({
				message: "Invalid ID",
			});
		}
	});
};

const edit = (req, res) => {
	const id = req.params.id;
	const data = req.body;
	if (!Object.keys(data).length) {
		return res.status(400).json({ message: "Missing Data" });
	} else if (!data.type || !data.amount) {
		return res.status(400).json({
			message: "All fields must be completed",
			fields: {
				type: "string",
				amount: "number",
			},
		});
	} else {
		const response = publicControllers.editPublic(id, data, req.user.rol);
		return res.status(200).json({
			message: "Publication edited succesfully",
			user: response,
		});
	}
};

const getMyPublic = (req, res) => {
	const id = req.user.id;
	const data = publicControllers.getPublicById(id);
	res.status(200).json(data);
};

const removeMyPublic = (req, res) => {
	const id = req.user.id;
	const data = publicControllers.deletePublic(id);
	if (data) {
		res.status(204).json();
	} else {
		res.status(400).json({ message: "invalid id" });
	}
};

module.exports = {
	getAll,
	getById,
	remove,
	edit,
	getMyPublic,
	removeMyPublic,
};
