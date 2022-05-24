const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please enter username'],
		unique: [true, 'Username already exists'],
	},
	hash: String,
    salt: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
