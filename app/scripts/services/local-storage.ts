/// <reference path="../../../reference.ts" />
'use strict';

class LocalStorage {

  /* @ngInject */
  constructor(private $window: ng.IWindowService) {}

  getLanguageUsageCount(languageCode: string): number {
    let popularitySettings = this.getPopularitySafe();
    return LocalStorage.asIntOrZero(popularitySettings[languageCode]);
  }

  incrementLanguageUsageCount(languageCode: string) {
    let popularitySettings = this.getPopularitySafe();
    let currentCount = LocalStorage.asIntOrZero(popularitySettings[languageCode]);
    popularitySettings[languageCode] = currentCount + 1;
    this.commitPopularitySettings(popularitySettings);
  }

  resetStatistics() {
    this.$window.localStorage.clear();
  }

  private getPopularitySafe() {
    let languagePopularityJson = this.$window.localStorage.getItem('popularity');

    try {
      return JSON.parse(languagePopularityJson) || {};
    } catch (e) {
      this.commitPopularitySettings({});
      return {};
    }
  }

  private commitPopularitySettings(popularitySettings: {[key: string]: number}) {
    this.$window.localStorage.setItem('popularity', JSON.stringify(popularitySettings));
  }

  private static asIntOrZero(input: any): number {
    if (input === null || parseInt(input, 10) !== input) {
      return 0;
    } else {
      return input;
    }
  }
}

angular
  .module('googleTranslate1xAppInternal')
  .service('localStorage', LocalStorage);
