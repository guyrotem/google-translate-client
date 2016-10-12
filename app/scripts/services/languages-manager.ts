/// <reference path="../../../reference.ts" />
'use strict';

class LanguagesManager {

  private initialLanguages: TargetLanguageView[];
  private activeLanguages: TargetLanguageView[];
  private _isLoading: boolean;

  /* @ngInject */
  constructor(private sortLanguage: SortLanguage, private hypeOMeter: HypeOMeter,
              private googleTranslateApi: GoogleTranslateApi, private $q: ng.IQService) {

  }

  init(): ng.IPromise<string> {
    this._isLoading = true;

    return this.googleTranslateApi.getLanguages()
      .then(results => {
        this._isLoading = false;
        this.setLanguages(results);
      })
      .catch(() => {
        this._isLoading = false;
        return this.$q.reject('Failed to retrieve languages. Please make sure server is up & running (or set enableMocks==true)');
      });
  }

  isLoading(): boolean {
    return this._isLoading;
  }

  setLanguages(serverResult: TargetLanguageServer[]): void {
    this.hypeOMeter.loadStatistics(serverResult);
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
