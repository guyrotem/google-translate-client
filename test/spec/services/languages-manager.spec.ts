/// <reference path="../../../reference.ts" />
'use strict';

describe('Service: languagesManager', () => {
  let languagesManager: LanguagesManager;

  beforeEach(() => {
    module('googleTranslate1xAppInternal');
  });

  beforeEach(inject((_languagesManager_: LanguagesManager) => {
    languagesManager = _languagesManager_;
  }));

  it('should do something', () => {
    // expect(languagesManager.someMethod()).toBe(42);
  });

});
