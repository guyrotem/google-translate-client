/// <reference path="../app.ts" />

'use strict';

module googleTranslateClientApp {
  export class LanguagesManager {

    private initialLanguages: TargetLanguageView[];
    private activeLanguages: TargetLanguageView[];
    private _isLoading: boolean;

    /* @ngInject */
    constructor(private sortLanguage: SortLanguage, private hypeOMeter: HypeOMeter,
                private googleTranslateApi: GoogleTranslateApi, private $q: ng.IQService,
                private sourceLanguageManager: SourceLanguageManager) {

    }

    init(): ng.IPromise<string> {
      this._isLoading = true;

      return this.googleTranslateApi.getLanguages()
        .then(results => {
          this._isLoading = false;
          this.setLanguages(results);
          this.sourceLanguageManager.setLanguages(results);
        })
        .catch(() => {
          this._isLoading = false;
          return this.$q.reject('Failed to retrieve languages. Please make sure server is up & running (it may take up to 1 minute, being a free HerokuApp)');
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

    langNameToCode(langName: string): string {
      return this.initialLanguages
        .find(x => x.name === langName)
        .code;
    }
  }
}

angular.module('googleTranslateClientApp')
  .service('languagesManager', googleTranslateClientApp.LanguagesManager);
