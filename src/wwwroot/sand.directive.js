(function () {
    'use strict';
    
    angular
        .module('sand.widgets', [])
        .directive('sand', sandDir);

    function sandDir() {
        var directive = {
            link: link,
            templateUrl: 'sand.template.html',
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
        /* */
        }
    }
})();