/// <reference path="../../../reference.ts" />
'use strict';

class LocalStorage {

  private popularityLifeMedian: number;

  /* @ngInject */
  constructor(private $window: ng.IWindowService) {
    this.popularityLifeMedian = 1000 * 60 * 60 * 24 * 7;
  }

  getLanguageUsageCount(languageCode: string): number {
    let popularitySettings = this.getPopularitySafe();
    let langInfo = popularitySettings.langsInfo;
    return LocalStorage.asIntOrZero(langInfo[languageCode]);
  }

  getLanguageLastUsage(languageCode: string): number {
    let langLastUse = this.getLastUsageStat();
    return LocalStorage.asIntOrZero(langLastUse[languageCode]);
  }

  normalizePopularity(): void {
    let popularitySettings = this.getPopularitySafe();
    let now = new Date().getTime();
    let timeSinceLastUpdate = now - popularitySettings.lastUpdate;
    let multiplier = Math.pow(0.5, timeSinceLastUpdate / this.popularityLifeMedian);
    let langInfo = popularitySettings.langsInfo;

    popularitySettings.lastUpdate = now;
    popularitySettings.langsInfo = <{ [key: string]: number }>_.transform(langInfo, (acc, popularity, key) => {
      acc[key] = multiplier * <number>popularity;
      return acc;
    });

    this.commitPopularitySettings(popularitySettings);
  }

  incrementLanguageUsageCount(languageCode: string) {
    let popularitySettings = this.getPopularitySafe();
    let currentCount = LocalStorage.asIntOrZero(popularitySettings.langsInfo[languageCode]);
    popularitySettings.langsInfo[languageCode] = currentCount + 1;
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

  private getPopularitySafe(): PopularityStorage {
    let pop = <PopularityStorage>this.getJsonSafe('popularity');
    pop.lastUpdate = pop.lastUpdate || new Date().getTime();
    pop.langsInfo = pop.langsInfo || {};
    return pop;
  }

  private getLastUsageStat() {
    return this.getJsonSafe('lastUse');
  }

  private commitPopularitySettings(popularitySettings: any) {
    this.commitJson('popularity', popularitySettings);
  }

  private commitLastUseSettings(lastUse: {[key: string]: number}) {
    this.commitJson('lastUse', lastUse);
  }

  private commitJson(name: string, value: {[key: string]: number}) {
    this.$window.localStorage.setItem(name, JSON.stringify(value));
  }

  private static asIntOrZero(input: any): number {
    if (angular.isUndefined(input) || isNaN(parseFloat(input))) {
      return 0;
    } else {
      return input;
    }
  }
}

interface PopularityStorage {
  lastUpdate: number;
  langsInfo: {[key: string]: number};
}

angular
  .module('googleTranslate1xAppInternal')
  .service('localStorage', LocalStorage);
