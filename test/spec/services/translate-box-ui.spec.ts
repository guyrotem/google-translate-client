/// <reference path="../../../reference.ts" />
'use strict';

describe('Service: translateBoxUi', () => {
  let translateBoxUi: TranslateBoxUi;

  beforeEach(() => {
    module('googleTranslate1xAppInternal');
  });

  beforeEach(inject((_translateBoxUi_: TranslateBoxUi) => {
    translateBoxUi = _translateBoxUi_;
  }));

  it('should do something', () => {
    expect(translateBoxUi.getLastError()).toBe(null);
  });

});
