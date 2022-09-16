const router = require("express").Router();

const publicServices = require("./public.http");

router
	.route("/") //* /api/v1/publications/
	.get(publicServices.getAll);

router
	.route("/:id")
	.get(publicServices.getById)
	.delete(publicServices.remove)
	.put(publicServices.edit);

exports.router = router;
