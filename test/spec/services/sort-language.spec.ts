/// <reference path="../../../reference.ts" />
'use strict';

describe('Service: sortLanguage', () => {
  let sortLanguage: SortLanguage;

  beforeEach(() => {
    module('googleTranslate1xAppInternal');
  });

  beforeEach(inject((_sortLanguage_: SortLanguage) => {
    sortLanguage = _sortLanguage_;
  }));

  it('should do something', () => {
    expect(sortLanguage.getSortingOptions().length).toBe(2);
  });

});
