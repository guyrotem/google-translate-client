/// <reference path="../../../reference.ts" />
'use strict';

describe('Filter: synonyms', () => {
  let synonyms: Function;

  beforeEach(() => {
    module('googleTranslate1xAppInternal');
  });

  beforeEach(inject(($filter: ng.IFilterService) => {
    synonyms = $filter<Function>('synonyms');
  }));

  it('should return the input prefixed with "synonyms filter:"', () => {
    let synData: string[] = ['angularjs', 'angularJs', 'react'];
    expect(synonyms(synData)).toBe('angularJs, react');
  });

});
