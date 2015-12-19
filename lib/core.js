var Comment = require('./comment');
var Works = require('./works');
var User = require('./user');

module.exports = {
	get $User () {
		return User;
	},

	get $Comment () {
		return Comment;
	},

	get $Works () {
		return Works; 
	},

};
