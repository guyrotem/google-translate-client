/// <reference path="../../../reference.ts" />
'use strict';

class GoogleTranslateApi {

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

  getLanguages(): ng.IPromise<TargetLanguageView[]> {
    return this.$http.get('/api/languages')
      .then(resposne => resposne.data);
  }
}

angular
  .module('googleTranslate1xAppInternal')
  .service('googleTranslateApi', GoogleTranslateApi);
