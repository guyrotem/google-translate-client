/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../app/scripts/services/languages-manager.ts" />

'use strict';

describe('Service: languagesManager', () => {

  // load the service's module
  beforeEach(module('googleTranslateClientApp'));

  // instantiate service
  var languagesManager;
  beforeEach(inject(_languagesManager_ => {
    languagesManager = _languagesManager_;
  }));

  it('should do something', () => {
    expect(!!languagesManager).toBe(true);
  });

});
