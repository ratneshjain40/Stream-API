const mongoose = require('mongoose');

const connectDb = async () => {
	const conn = await mongoose.connect(process.env.MONGO_DB_URI, {
		dbName:"stream-app",
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log(`Connected to MongoDB: ${conn.connection.host}`);
};

module.exports = connectDb;
