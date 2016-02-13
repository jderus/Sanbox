var gulp = require('gulp');

var plugins = require('gulp-load-plugins')();

var del = require('del');

var Server = require('karma').Server;

// Testing ----------------------------------------------------------------------------------------------------
gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true //set to false to debug tests
    }, function (exitCode) {
        done();
    }).start();
    
});