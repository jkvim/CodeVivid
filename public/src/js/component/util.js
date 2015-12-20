var AVATAR_CDN = 'http://fdn.geekzu.org/avatar/'
var gravatar = require('gravatar');

function getAvatarByEamil(email, options) {
	var avatarUrl = gravatar.url(email, options);
	var id = avatarUrl.match(/.*\/([\w\?=]+)/)[1];

	return `${AVATAR_CDN}${id}`;
}

exports.getAvatarByEamil = getAvatarByEamil;
