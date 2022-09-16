const express = require("express");
const passport = require("passport");
require("./middleware/auth.middleware")(passport);
const path = require("path");

const userRouter = require("./users/users.router").router;
const authRouter = require("./auth/auth.router").router;
const publicRouter = require("./publications/public.router").router;

const { db } = require("./utils/database");

const app = express();

db.authenticate()
	.then(() => console.log("Database Authenticated"))
	.catch((err) => console.log(err));

db.sync()
	.then(() => console.log("Database synced"))
	.catch((err) => console.log(err));

app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({ message: "All ok!" });
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/publications", publicRouter);

app.get("/api/v1/uploads/:imgName", (req, res) => {
	const imgName = req.params.imgName;
	res.status(200).sendFile(path.resolve("uploads/") + "/" + imgName);
});

app.listen(8000, () => {
	console.log("Server started at port 8000");
});

exports.default = app;
exports.app = app;
module.exports = app;
