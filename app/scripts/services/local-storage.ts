/// <reference path="../../../reference.ts" />
'use strict';

class LocalStorage {

  /* @ngInject */
  constructor(private $window: ng.IWindowService) {}

  getLanguageUsageCount(languageCode: string): number {
    let popularitySettings = this.getPopularitySafe();
    return LocalStorage.asIntOrZero(popularitySettings[languageCode]);
  }

  getLanguageLastUsage(languageCode: string): number {
    let langLastUse = this.getLastUsageStat();
    return LocalStorage.asIntOrZero(langLastUse[languageCode]);
  }

  incrementLanguageUsageCount(languageCode: string) {
    let popularitySettings = this.getPopularitySafe();
    let currentCount = LocalStorage.asIntOrZero(popularitySettings[languageCode]);
    popularitySettings[languageCode] = currentCount + 1;
    this.commitPopularitySettings(popularitySettings);
  }

  setLastUsed(languageCode: string) {
    let langLastUse = this.getLastUsageStat();
    langLastUse[languageCode] = new Date().getTime();
    this.commitLastUseSettings(langLastUse);
  }

  resetStatistics() {
    this.$window.localStorage.clear();
  }

  private getJsonSafe(propertyName: string) {
    let storageJson = this.$window.localStorage.getItem(propertyName);

    try {
      return JSON.parse(storageJson) || {};
    } catch (e) {
      this.commitJson(propertyName, {});
      return {};
    }
  }

  private getPopularitySafe() {
    return this.getJsonSafe('popularity');
  }

  private getLastUsageStat() {
    return this.getJsonSafe('lastUse');
  }

  private commitPopularitySettings(popularitySettings: {[key: string]: number}) {
    this.commitJson('popularity', popularitySettings);
  }

  private commitLastUseSettings(lastUse: {[key: string]: number}) {
    this.commitJson('lastUse', lastUse);
  }

  private commitJson(name: string, value: {[key: string]: number}) {
    this.$window.localStorage.setItem(name, JSON.stringify(value));
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
