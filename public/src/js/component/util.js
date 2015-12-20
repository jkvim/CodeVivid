var AVATAR_CDN = 'http://fdn.geekzu.org/avatar/'
var gravatar = require('gravatar');

function getAvatarByEamil(email, options) {
	var avatarId = gravatar.url(email, options).match(/.*\/(\w+)?/)[1];
	return `${AVATAR_CDN}${avatarId}`;
}

exports.getAvatarByEamil = getAvatarByEamil;
