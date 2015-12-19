var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
	username: {type: String, require: true},
	email: {type: String, require: true},
	password: {type: String, require: true},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
	works: [{type: ObjectId, ref: 'Works'}],
	liked_works:[{type: ObjectId, ref: 'Works'}],
	fans: {type: Number, default: 0},
	signature: {type: String},
});

UserSchema.index({username: 1});

module.exports = mongoose.model('User', UserSchema);
