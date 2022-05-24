const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();

// Import controllers
const {
	addMovie,
	deleteMovie,
	searchMovie,
	movieUpload,
} = require("../controllers/listing");

// Map controllers
router.post("/movie", addMovie);
router.delete("/movie", deleteMovie);
router.get("/movie", searchMovie);
router.put(
	"/movie",
	fileUpload({
		limits: { fileSize: 50 * 1024 * 1024 },
        createParentPath: true
	}),
	movieUpload
);

module.exports = router;
