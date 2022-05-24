const mongoose = require("mongoose");
const createIndex = require("../config/monogoIndex");

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Please enter username"],
		unique: [true, "Username already exists"],
	},
	tags: [String],
});

const Movie = mongoose.model("Movie", movieSchema);
createIndex("stream-app", "movies", { title: "text" });

module.exports = Movie;
