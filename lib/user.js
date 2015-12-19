var User = require('../models').User;

exports.addUser = function (data) {
	return User.create(data);
}

exports.getUserById = function (id) {
	return User.findById(id).exec();
}

exports.getUserByName = function (name) {
	return User.findOne({username: name}).exec();
}

exports.getUserWorks = function (name) {
	return User
				 .findOne({username: name})
				 .populate('works liked_works')
				 .select('-_id -password -created_at -updated_at')
				 .exec();
}

exports.saveWorks = function (name, works) {
	return User
				 .update({username: name}, {$set: {works: works}})
				 .exec();
}

exports.getUserLikedWorks = function (name) {
	return User
				 .findOne({username: name})
				 .populate('liked_works')
				 .exec();
}

exports.saveLikedWorks = function (name, likedWorks) {
	setTimeout(function() { 			 
	return User
				 .update({username: name}, {$set: {liked_works: likedWorks}})
				 .exec();
	}, 1);
}

