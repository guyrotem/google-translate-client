/// <reference path="../../../reference.ts" />
'use strict';

describe('Service: localStorage', () => {
  let localStorage: LocalStorage, $window: ng.IWindowService;

  beforeEach(() => {
    module('googleTranslate1xAppInternal');
  });

  beforeEach(inject((_localStorage_: LocalStorage, _$window_: ng.IWindowService) => {
    localStorage = _localStorage_;
    $window = _$window_;
    $window.localStorage.clear();
  }));

  it('should initialize everything to 0', () => {
    expect(localStorage.getLanguageUsageCount('iw')).toBe(0);
  });

  it('should increment by 1', () => {
    localStorage.incrementLanguageUsageCount('iw');
    expect(localStorage.getLanguageUsageCount('iw')).toBe(1);

    localStorage.incrementLanguageUsageCount('iw');
    expect(localStorage.getLanguageUsageCount('iw')).toBe(2);
  });

  it('should only increment the target language', () => {
    localStorage.incrementLanguageUsageCount('iw');
    expect(localStorage.getLanguageUsageCount('fr')).toBe(0);
  });

  it('should clear local storage', () => {
    localStorage.incrementLanguageUsageCount('fr');
    expect(localStorage.getLanguageUsageCount('fr')).toBe(1);
    localStorage.resetStatistics();
    expect(localStorage.getLanguageUsageCount('fr')).toBe(0);
  });

  it('should reset popularity on bad input', () => {
    localStorage.incrementLanguageUsageCount('fr');
    $window.localStorage.setItem('popularity', '{someInvalidJson');
    expect(localStorage.getLanguageUsageCount('fr')).toBe(0);
  });

  it('should reset language when value is not a number', () => {
    $window.localStorage.setItem('popularity', '{"lastUpdate": 1, "langsInfo": {"fr": "not a number", "de": 1}}');
    expect(localStorage.getLanguageUsageCount('fr')).toBe(0);
    expect(localStorage.getLanguageUsageCount('de')).toBe(1);
  });
});
