var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CommentSchema = new Schema({
	works_id: {type: String, require: true},
	user: {
		username: {type: String, required: true},
		email: {type: String , required: true}
	},
	content: {type: String, required: true},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}
});

CommentSchema.index({updated_at: 1});

module.exports = mongoose.model('Comment', CommentSchema);
