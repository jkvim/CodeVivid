var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var WorksSchema = Schema({
	_creator: {type: ObjectId, ref: 'User'},
	title: String,
	iframe: {type: String, require: true},
	srcUrl: {type: String, require: true},
	slug: {type: String, require: true},
	thumbnail_url: {type: String ,require: true},
	liked: {type: Number, default: 0},
	pv: {type: Number, default: 0},
	comment: {type: Number, default: 0},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
	author: {type:String, require: true},
	author_url: {type: String, require: true},
	description: {type: String},
	user: {
		username: {type: String, require: true},
		email: {type: String, require: true}
	},
});

WorksSchema.index({tab: 1, updated_at: -1});

module.exports = mongoose.model('Works', WorksSchema);
