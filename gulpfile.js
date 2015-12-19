var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackBuildConfig = require('./webpack.build.config.js');

gulp.task('webpack', function (cb) {
	webpack(webpackBuildConfig, function (err, stats) {
		if (err) {
			throw new gutil.PluginError('webpack', err);
			gutil.log('[webpack]', stats.toString());
		}
		cb();
	});
	gulp.watch(['./public/src/*'],
						 ['webpack']);
});

