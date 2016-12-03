/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../app/scripts/services/tts.ts" />

'use strict';

describe('Service: tts', () => {

  // load the service's module
  beforeEach(module('googleTranslateClientApp'));

  // instantiate service
  var tts;
  beforeEach(inject(_tts_ => {
    tts = _tts_;
  }));

  it('should do something', () => {
    expect(!!tts).toBe(true);
  });

});
