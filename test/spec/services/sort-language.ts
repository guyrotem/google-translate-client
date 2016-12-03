/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../app/scripts/services/sort-language.ts" />

'use strict';

describe('Service: sortLanguage', () => {

  // load the service's module
  beforeEach(module('googleTranslateClientApp'));

  // instantiate service
  var sortLanguage;
  beforeEach(inject(_sortLanguage_ => {
    sortLanguage = _sortLanguage_;
  }));

  it('should do something', () => {
    expect(!!sortLanguage).toBe(true);
  });

});
