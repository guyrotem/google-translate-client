/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../app/scripts/services/hype-o-meter.ts" />

'use strict';

describe('Service: hypeOMeter', () => {

  // load the service's module
  beforeEach(module('googleTranslateClientApp'));

  // instantiate service
  var hypeOMeter;
  beforeEach(inject(_hypeOMeter_ => {
    hypeOMeter = _hypeOMeter_;
  }));

  it('should do something', () => {
    expect(!!hypeOMeter).toBe(true);
  });

});
