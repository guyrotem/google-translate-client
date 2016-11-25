/// <reference path="../../../reference.ts" />
'use strict';

describe('Service: sourceLanguageManager', () => {
  let sourceLanguageManager: SourceLanguageManager;

  beforeEach(() => {
    module('googleTranslate1xAppInternal');
  });

  beforeEach(inject((_sourceLanguageManager_: SourceLanguageManager) => {
    sourceLanguageManager = _sourceLanguageManager_;
  }));

  it('should do something', () => {
    // expect(sourceLanguageManager.someMethod()).toBe(42);
  });

});
