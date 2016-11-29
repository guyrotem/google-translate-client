/// <reference path="../app.ts" />

'use strict';

module googleTranslateClientApp {
  export class TranslateBoxUi {
    private lastError: string;

    /* @ngInject */
    constructor(private languagesManager: LanguagesManager, private translateManager: TranslateManager, private $q) {
      this.lastError = null;
    }

    init(): void {
      this.lastError = '';

      this.languagesManager.init()
        .catch((err) => {
          this.lastError = err;
        });
    }

    getLastError(): string {
      return this.lastError;
    }

    translate(originalText: string, sourceLanguage: string, targetLanguages: string[]): ng.IPromise<TranslationResultView[]> {
      this.lastError = '';

      return this.translateManager.translate(originalText, sourceLanguage, targetLanguages)
        .catch(err => {
          this.lastError = err;
          return this.$q.reject();
        });
    }
  }
}

angular.module('googleTranslateClientApp')
  .service('translateBoxUi', googleTranslateClientApp.TranslateBoxUi);
