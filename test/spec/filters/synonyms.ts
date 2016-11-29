/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../app/scripts/filters/synonyms.ts" />

'use strict';

describe('Filter: synonyms', () => {

  // load the filter's module
  beforeEach(module('googleTranslateClientApp'));

  // initialize a new instance of the filter before each test
  var synonyms;
  beforeEach(inject($filter => {
    synonyms = $filter('synonyms');
  }));

  it('should return the input prefixed with "synonyms filter:"', () => {
    var text = 'angularjs';
    expect(synonyms(text)).toBe('synonyms filter: ' + text);
  });

});
