/// <reference path="../app.ts" />

'use strict';

module googleTranslateClientApp {
  export class GoogleTranslateApi {

    public resolvedCounter: number;

    /* @ngInject */
    constructor(private $http: ng.IHttpService) {
      this.resolvedCounter = 0;
    }

    translate(originalText: string, sourceLanguage: string, targetLanguage: string): ng.IPromise<TranslationResultServerExtract> {
      let data: TranslationSubmitServer = {
        query: originalText,
        sourceLang: sourceLanguage,
        targetLang: targetLanguage
      };

      return this.$http.post('/api/translate', data)
        .then(response => <TranslationResultServer>response.data)
        .then(data => {
          this.resolvedCounter++;
          console.log(data.extract);
          return data.extract;
        });
    }

    getLanguages(): ng.IPromise<TargetLanguageServer[]> {
      return this.$http.get('/api/languages')
        .then(resposne => resposne.data);
    }
  }
}

angular.module('googleTranslateClientApp')
  .service('googleTranslateApi', googleTranslateClientApp.GoogleTranslateApi);
