'use strict';

describe('fiddle service', function () {
    var testService;

    beforeEach(angular.mock.module('sandboxApp'));
    beforeEach(inject(['fiddleService',
        function (fiddleService) {
            this.testService = fiddleService;
        }])
    );

    it('should inject the service',function () {
        expect(this.testService).toBeDefined();
    });

    it('should have the getData call', function () {
        expect(this.testService.getData).toBeDefined();
    });

});