var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require("./tools/gulptasks/config.js")();     // all of our configuration vars

var chalk = require('chalk');
var del = require('del');
var jshint = require('gulp-jshint');

var Server = require('karma').Server;

// Use a function to get tasks defined in separate files and modules
function getFileTask(task, param) {
    if (param == undefined) { 
        console.log('Loading Task: ' + task );
        return require(config.paths.gulptasks + task)(gulp, plugins); 
    }
    else { return require(config.paths.gulptasks + task)(gulp, plugins, param); }
}

// Gulp FileTasks ----------------------------------------------------------------------------------------------
gulp.task('hello', getFileTask('hello'));

// Testing ----------------------------------------------------------------------------------------------------
gulp.task('test', ['jshintNreport', 'jshintspecsNreport'], function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true //set to false to debug tests
    }, function (exitCode) {
        done();
    }).start();
    
});

// Linting ------------------------------------------------------------------------------------------------------
gulp.task('jshint', function () {
    return gulp.src(config.paths.webroot + "*.js")
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jshintspecs', function () {
    return gulp.src("./test/**/*.js")
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
});

// TODO: Figure out how to make this work when dir doesnt exist.
gulp.task('jshintNreport', function () {
    return gulp.src(config.paths.webroot + "*.js")
      .pipe(jshint())
      .pipe(jshint.reporter('gulp-jshint-html-reporter', {
          filename: __dirname + '/reports/jshint/jshint-output.html',
          createMissingFolders: true
      }));
});

// TODO: Figure out how to make this work when dir doesnt exist.
gulp.task('jshintspecsNreport', function () {
    return gulp.src("./test/**/*.js")
      .pipe(jshint())
      .pipe(jshint.reporter('gulp-jshint-html-reporter', {
          filename: __dirname + '/reports/jshint/jshintspecs-output.html',
          createMissingFolders: true
      }));
});


// Clean ------------------------------------------------------------------------------------------------------
gulp.task("clean", ["clean:tests", "clean:cov", "clean:env"], function (cb) {
    console.log(chalk.yellow("// Gulp: Deleted Files"));
    return del([config.paths.reports]);
});
gulp.task("clean:tests", function (cb) {
    console.log(chalk.yellow("// Gulp: Delete Test Report Files"));
    del([config.paths.testReport + "/**/*.*"]);
    return del([config.paths.testReport]);
});
gulp.task("clean:cov", function (cb) {
    console.log(chalk.yellow("// Gulp: Delete Coverage Report Files"));
    del([config.paths.coverageReport + "/**/*.*"]);
    return del([config.paths.coverageReport]);
});
gulp.task("clean:env", function (cb) {
    console.log(chalk.yellow("// Gulp: Delete Dev Dist Files"));
    del([config.ENVIRONMENT.DEV + "**/*.*"]);
    del([config.ENVIRONMENT.DEV]);
    console.log(chalk.yellow("// Gulp: Delete Prod Dist Files"));
    del([config.ENVIRONMENT.PROD + "**/*.*"]);
    del([config.ENVIRONMENT.PROD]);
    return;
});


// Build ------------------------------------------------------------------------------------------------------
gulp.task("build", ["build:prod", "build:dev"], function (cb) {
    // Shortcut for building all envs.
    console.log(chalk.yellow("// Gulp: Building All"));
});

gulp.task("build:dev", function (cb) {
    // Will keep this really crude for now, just to flesh out across time
    console.log(chalk.yellow("// Gulp: Building Dev"));
    gulp.src(config.paths.webroot + "*.js")
        .pipe(gulp.dest(config.ENVIRONMENT.DEV));
    gulp.src(config.paths.webroot + "*.html")
        .pipe(gulp.dest(config.ENVIRONMENT.DEV));
        
    gulp.src("./bower_components/angular/angular.js")
        .pipe(gulp.dest(config.ENVIRONMENT.DEV + "lib/"));
    gulp.src("./bower_components/angular-resource/angular-resource.js")
        .pipe(gulp.dest(config.ENVIRONMENT.DEV + "lib/"));  
    gulp.src("./bower_components/angular-route/angular-route.js")
        .pipe(gulp.dest(config.ENVIRONMENT.DEV + "lib/"));     
      
    gulp.src("./bower_components/bootstrap/dist/js/bootstrap.js")
        .pipe(gulp.dest(config.ENVIRONMENT.DEV + "lib/"));     
    gulp.src("./bower_components/bootstrap/dist/css/bootstrap.css")
        .pipe(gulp.dest(config.ENVIRONMENT.DEV + "lib/")); 
    gulp.src("./bower_components/bootstrap/dist/css/bootstrap-theme.css")
        .pipe(gulp.dest(config.ENVIRONMENT.DEV + "lib/"));   
        
        
    gulp.src("./bower_components/c3/c3.js")
        .pipe(gulp.dest(config.ENVIRONMENT.DEV + "lib/"));
    gulp.src("./bower_components/d3/d3.js")
        .pipe(gulp.dest(config.ENVIRONMENT.DEV + "lib/"));
    
    return;
});

gulp.task("build:prod", function (cb) {
    // we will probably need to drive towards minification here.
    console.log(chalk.yellow("// Gulp: Building Prod"));
    gulp.src(config.paths.webroot + "*.js")
        .pipe(gulp.dest(config.ENVIRONMENT.PROD));
    gulp.src(config.paths.webroot + "*.html")
        .pipe(gulp.dest(config.ENVIRONMENT.PROD));
        
    gulp.src("./bower_components/angular/angular.js")
        .pipe(gulp.dest(config.ENVIRONMENT.DEV + "lib/"));
    gulp.src("./bower_components/angular-resource/angular-resource.js")
        .pipe(gulp.dest(config.ENVIRONMENT.DEV + "lib/"));  
    gulp.src("./bower_components/angular-route/angular-route.js")
        .pipe(gulp.dest(config.ENVIRONMENT.DEV + "lib/"));     
      
    gulp.src("./bower_components/bootstrap/dist/js/bootstrap.js")
        .pipe(gulp.dest(config.ENVIRONMENT.DEV + "lib/"));     
    gulp.src("./bower_components/bootstrap/dist/css/bootstrap.css")
        .pipe(gulp.dest(config.ENVIRONMENT.DEV + "lib/")); 
    gulp.src("./bower_components/bootstrap/dist/css/bootstrap-theme.css")
        .pipe(gulp.dest(config.ENVIRONMENT.DEV + "lib/"));   
        
        
    gulp.src("./bower_components/c3/c3.js")
        .pipe(gulp.dest(config.ENVIRONMENT.DEV + "lib/"));
    gulp.src("./bower_components/d3/d3.js")
        .pipe(gulp.dest(config.ENVIRONMENT.DEV + "lib/"));
        
    return;
});