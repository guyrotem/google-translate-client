/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../app/scripts/services/local-storage.ts" />

'use strict';

describe('Service: localStorage', () => {

  // load the service's module
  beforeEach(module('googleTranslateClientApp'));

  // instantiate service
  var localStorage;
  beforeEach(inject(_localStorage_ => {
    localStorage = _localStorage_;
  }));

  it('should do something', () => {
    expect(!!localStorage).toBe(true);
  });

});
