/// <reference path="../../../reference.ts" />
'use strict';

class HypeOMeter {

  private classALangs: string[];
  private classBLangs: string[];
  private ranking: LanguageHypeInfo[];

  /* @ngInject */
  constructor(private localStorage: LocalStorage) {
    this.classALangs = ['en', 'es', 'fr'];
    this.classBLangs = ['zh-CN', 'pt', 'ar', 'it', 'ru', 'ja', 'de', 'iw'];
  }

  getLanguageRank(langCode: string): number {
    return this.findLangStats(langCode).rank;
  }

  getLanguageLastUsage(langCode: string): number {
    return this.findLangStats(langCode).lastUsage;
  }

  loadStatistics(langs: TargetLanguageServer[]): void {
    let usageData =
      langs.map((lang) => {
        return {
          usageCount: this.localStorage.getLanguageUsageCount(lang.code),
          lastUsage: this.localStorage.getLanguageLastUsage(lang.code),
          languageCode: lang.code,
          rank: null,
          $$priority: this.getLanguageClass(lang.code),
          $$languageName: lang.name
        };
      });
    this.ranking = HypeOMeter.refreshRank(usageData);
  }

  isPopularTargetLanguage(lang: TargetLanguageView): boolean {
    return this.getLanguageRank(lang.code) < 5;
  }

  updateLanguageUsageStatistics(targetLangs: string[]) {
    targetLangs.map(code => {
      this.localStorage.incrementLanguageUsageCount(code);
      this.localStorage.setLastUsed(code);

      let langStats = this.findLangStats(code);
      langStats.lastUsage = new Date().getTime();
      langStats.usageCount++;

      this.ranking = HypeOMeter.refreshRank(this.ranking);
    });
  }

  private static refreshRank(hypeInfo: LanguageHypeInfo[]): LanguageHypeInfo[] {
    return _.chain(hypeInfo)
      .orderBy<string[]>(['usageCount', '$$priority', '$$languageName'], ['desc', 'desc', 'asc'])
      .map((langData: LanguageHypeInfo, index) => {
        langData.rank = index;
        return langData;
      })
      .value();
  }

  private findLangStats(langCode: string): LanguageHypeInfo {
    return _.find(this.ranking, (x) => {
      return x.languageCode === langCode;
    });
  }

  private getLanguageClass(langCode: string): number {
    if (this.classALangs.indexOf(langCode) > -1) {
      return 2;
    } else if (this.classBLangs.indexOf(langCode) > -1) {
      return 1;
    } else {
      return 0;
    }
  }
}

angular
  .module('googleTranslate1xAppInternal')
  .service('hypeOMeter', HypeOMeter);
