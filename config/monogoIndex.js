const { MongoClient } = require("mongodb");

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const uri = process.env.MONGO_DB_URI;
const client = new MongoClient(uri);

async function createIndex(db_name,collection_name,index) {
	try {
		await client.connect();

		const database = client.db(db_name);
		const movies = await database
			.collection(collection_name)
			.createIndex(index, { unique: true });

		// Query for a movie that has the title 'Back to the Future'
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}

module.exports = createIndex