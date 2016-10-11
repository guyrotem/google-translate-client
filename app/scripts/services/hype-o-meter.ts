/// <reference path="../../../reference.ts" />
'use strict';

class HypeOMeter {

  private ranking: LanguageHype[];

  /* @ngInject */
  constructor(private localStorage: LocalStorage) {

  }

  getLanguageRank(langCode: string): number {
    return _.find(this.ranking, (x) => {
      return x.languageCode === langCode;
    }).rank;
  }

  loadRankings(langCodes: TargetLanguageServer[]): void {
    this.ranking = _.chain(langCodes)
      .map((lang) => {
        return {
          usageCount: this.localStorage.getLanguageUsageCount(lang.code),
          languageName: lang.name,
          languageCode: lang.code,
          rank: null
        };
      })
      .orderBy<string[]>(['usageCount', 'languageName'], ['desc', 'asc'])
      .map<LanguageHype>((langData: LanguageHype, index) => {
        langData.rank = index;
        return langData;
      })
      .value();
  }

  isPopularTargetLanguage(lang: TargetLanguageView): boolean {
    return this.getLanguageRank(lang.code) < 3;
  }
}

angular
  .module('googleTranslate1xAppInternal')
  .service('hypeOMeter', HypeOMeter);
