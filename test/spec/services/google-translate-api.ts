/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../app/scripts/services/google-translate-api.ts" />

'use strict';

describe('Service: googleTranslateApi', () => {

  // load the service's module
  beforeEach(module('googleTranslateClientApp'));

  // instantiate service
  var googleTranslateApi;
  beforeEach(inject(_googleTranslateApi_ => {
    googleTranslateApi = _googleTranslateApi_;
  }));

  it('should do something', () => {
    expect(!!googleTranslateApi).toBe(true);
  });

});
