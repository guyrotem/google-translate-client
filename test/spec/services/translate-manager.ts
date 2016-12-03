/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../app/scripts/services/translate-manager.ts" />

'use strict';

describe('Service: translateManager', () => {

  // load the service's module
  beforeEach(module('googleTranslateClientApp'));

  // instantiate service
  var translateManager;
  beforeEach(inject(_translateManager_ => {
    translateManager = _translateManager_;
  }));

  it('should do something', () => {
    expect(!!translateManager).toBe(true);
  });

});
