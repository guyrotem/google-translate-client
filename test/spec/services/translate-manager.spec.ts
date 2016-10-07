/// <reference path="../../../reference.ts" />
'use strict';

describe('Service: translateManager', () => {
  let translateManager: TranslateManager;

  beforeEach(() => {
    module('googleTranslate1xAppInternal');
  });

  beforeEach(inject((_translateManager_: TranslateManager) => {
    translateManager = _translateManager_;
  }));

  it('should do something!', () => {
    // expect(translateManager.someMethod()).toBe(42);
  });

});
