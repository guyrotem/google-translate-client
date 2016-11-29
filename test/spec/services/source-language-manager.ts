/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../app/scripts/services/source-language-manager.ts" />

'use strict';

describe('Service: sourceLanguageManager', () => {

  // load the service's module
  beforeEach(module('googleTranslateClientApp'));

  // instantiate service
  var sourceLanguageManager;
  beforeEach(inject(_sourceLanguageManager_ => {
    sourceLanguageManager = _sourceLanguageManager_;
  }));

  it('should do something', () => {
    expect(!!sourceLanguageManager).toBe(true);
  });

});
