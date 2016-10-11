/// <reference path="../../../reference.ts" />
'use strict';

class LanguagesManager {

  private initialLanguages: TargetLanguageView[];
  private activeLanguages: TargetLanguageView[];

  /* @ngInject */
  constructor(private sortLanguage: SortLanguage, private hypeOMeter: HypeOMeter) {

  }

  setLanguages(serverResult: TargetLanguageServer[]): void {
    this.hypeOMeter.loadRankings(serverResult);
    this.initialLanguages = serverResult;
    this.orderLangsBy(SortingOption.ABC);
  }

  getActiveLanguages(): TargetLanguageView[] {
    return this.activeLanguages;
  }

  orderLangsBy(how: SortingOption): void {
    this.activeLanguages = this.sortLanguage.orderLangsBy(this.initialLanguages, how);
  }

  langCodeToName(langCode: string): string {
    return this.initialLanguages
      .find(x => x.code === langCode)
      .name;
  }
}

angular
  .module('googleTranslate1xAppInternal')
  .service('languagesManager', LanguagesManager);
