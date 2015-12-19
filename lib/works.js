var Works = require('../models').Works;

// 新增一个作品
exports.addWorks = function (data) {
	return Works.create(data);
};

// 删除作品
exports.delWorks = function (id) {
	return Works.findByIdAndRemove(id).exec(); 
};

// 点赞, liked + 1
exports.incLikedById = function (id) {
	return Works
				 .findByIdAndUpdate(id, {$inc: {liked: 1}})
				 .exec();
};

// 取消点赞, liked - 1
exports.decLikedById = function (id) {
	return Works
	       .findByIdAndUpdate(id, {$inc: {liked: -1}})
				 .exec();
};


// 根据page获取首页展示的作品
exports.getWorksByPage = function (page) {
	return Works.find()
							.skip((page - 1) * 9)
							.sort('-updated_at')
							.limit(10) //一次获取10个, 判断是否是最后一页
							.exec();
};

// 点击卡片浏览作品, pv + 1
exports.getWorksById = function (id) {
	return Works.findByIdAndUpdate(id, {$inc: {pv: 1}}).exec();
};


