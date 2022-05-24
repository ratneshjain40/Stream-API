const path = require("path");
const Movie = require("../models/Listing");
const ErrorResponse = require("../utils/errorResponse");

exports.addMovie = async (req, res, next) => {
	try {
		const movie = await Movie.create(req.body);

		if (!movie) {
			throw new ErrorResponse("Could not create Movie", 500);
		}

		res.json({
			success: true,
			movie,
		});
	} catch (error) {
		next(error);
	}
};

exports.movieUpload = async (req, res, next) => {
	try {
		const movie = await Movie.findOne({ title: req.body.title });

		if (!movie) {
			throw new ErrorResponse("Could not find Movie", 500);
		}

		if (req.files.image) {
            const image = req.files.image
            //console.log(`./uploads/images/${req.body.title}${path.extname(image.name)}`)
            await image.mv(`./uploads/images/${req.body.title}${path.extname(image.name)}`)
		}

		res.json({
			success: true,
			movie,
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteMovie = async (req, res, next) => {
	try {
		const movie = await Movie.findOneAndDelete({ title: req.query["title"] });

		if (!movie) {
			throw new ErrorResponse("Could not delete Movie", 500);
		}

		res.json({
			success: true,
			movie,
		});
	} catch (error) {
		next(error);
	}
};

exports.searchMovie = async (req, res, next) => {
	try {
		const title = req.query["title"];
		const movies = await Movie.find({ $text: { $search: title } });

		res.json({
			success: true,
			movies,
		});
	} catch (error) {
		next(error);
	}
};
