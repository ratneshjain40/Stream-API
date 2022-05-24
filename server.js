const express = require("express");
const passport = require("passport");
const cors = require("cors");

//-------------- Import Routes and config ----------------

const auth = require("./routes/auth");
const listing = require("./routes/listing");

const connectDb = require("./config/connectDb");

const error = require("./middlewares/error");
require("./config/passport");

//-------------- GENERAL SETUP ----------------

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const app = express();
connectDb();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//-------------- Passport Middleware ----------------

function custom_middle(req, res, next) {
	console.log("Here ");
	next();
}

app.use(passport.initialize());
app.use(custom_middle);

//-------------- Routes Middleware ----------------

app.use("/auth", auth);
app.use("/listing", listing);

//-------------- Error Middleware ----------------

app.use(error);

//-------------- Run Server ----------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
