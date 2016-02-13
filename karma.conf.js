module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: './',

        browsers: ['PhantomJS'], //Chrome works. PhantomJS has unexpected token. IE has major probs.
        frameworks: ['jasmine'],
        files: [ // IMPORTANT: Improper order of this array can cause karma to break.
                 // SERIOUSLY: I CANNOT STRESS THIS ENOUGH.
                 
          'test/unit/*.spec.js'
        
        ],
        reporters: ['progress', 'nyan']
    });
};