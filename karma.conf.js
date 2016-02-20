module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: './',

        browsers: ['PhantomJS'], //Chrome works. PhantomJS has unexpected token. IE has major probs.
        frameworks: ['jasmine'],
        files: [ // IMPORTANT: Improper order of this array can cause karma to break.
                 // SERIOUSLY: I CANNOT STRESS THIS ENOUGH.
          'bower_components/angular/angular.js',
          'bower_components/angular-resource/angular-resource.js',
          'bower_components/angular-route/angular-route.js', 
          'bower_components/angular-mocks/angular-mocks.js',          
          
          'src/wwwroot/*.app.js',
          'src/wwwroot/*.service.js',
          'src/wwwroot/*.controller.js',
                 
          'test/unit/*.spec.js'
        
        ],
        reporters: ['progress', 'coverage', 'html', 'nyan'],
        preprocessors: {
            // source files, to generate coverage for 
            // do not include tests or libraries 
            // (these files will be instrumented by Istanbul) 
            'src/wwwroot/*.js': ['coverage']
        },

        // Optional Configuration for HTML Reporter
        htmlReporter: {
            outputFile: 'reports/tests/units.html',

            pageTitle: 'Unit Tests',
            subPageTitle: 'Test All The Things'
        },

        // Optional Configuration for Coverage Reporter
        coverageReporter: {
            type: 'html',
            dir: 'reports/coverage/'
        }
    });
};