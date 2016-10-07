/// <reference path="../../../reference.ts" />
'use strict';

describe('Service: googleTranslateApi', () => {
  let googleTranslateApi: GoogleTranslateApi;

  beforeEach(() => {
    module('googleTranslate1xAppInternal');
  });

  beforeEach(inject((_googleTranslateApi_: GoogleTranslateApi) => {
    googleTranslateApi = _googleTranslateApi_;
  }));

  it('should do something', () => {
    // expect(googleTranslateApi.someMethod()).toBe(42);
  });

});
