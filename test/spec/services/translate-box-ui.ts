/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../app/scripts/services/translate-box-ui.ts" />

'use strict';

describe('Service: translateBoxUi', () => {

  // load the service's module
  beforeEach(module('googleTranslateClientApp'));

  // instantiate service
  var translateBoxUi;
  beforeEach(inject(_translateBoxUi_ => {
    translateBoxUi = _translateBoxUi_;
  }));

  it('should do something', () => {
    expect(!!translateBoxUi).toBe(true);
  });

});
