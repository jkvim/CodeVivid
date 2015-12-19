var Comment = require('../models').Comment;

// 添加一条评论
exports.addComment = function (data) {
	return Comment.create(data);
}

exports.getCommentBytWorkId = function (id) {
	return Comment.find({works_id: id})
								.sort({updated_at: 1})
								.select('user content updated_at _id')
								.exec();
}

exports.delCommentByWorksId = function (id) {
	return Comment.findByIdAndRemove(id).exec();
}
