describe('toyController', function() {
  var scope, testController;

  beforeEach(module('sandboxApp'));
  beforeEach(inject(function($rootScope,$controller) {
    testController = $controller('toyController', {$scope:scope});
  }));

  it('should define a controller', function() {
    expect(testController).toBeDefined();
  });

  it('should have a title property', function(){
     expect(testController.title).toBeDefined(); 
  });

  it('should have a text property', function(){
     expect(testController.text).toBeDefined(); 
  });

  it('should not have a property called vm', function() {
    expect(testController.vm).toBeUndefined();
  });
});