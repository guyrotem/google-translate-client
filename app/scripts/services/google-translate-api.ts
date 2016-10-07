/// <reference path="../../../reference.ts" />
'use strict';

class GoogleTranslateApi {

  /* @ngInject */
  constructor(private $http: ng.IHttpService) { }

  translate(originalText: string, sourceLanguage: string, targetLanguage: string): ng.IPromise<TranslationResultServerExtract> {
    let data: TranslationSubmitServer = {
      query: originalText,
      sourceLang: sourceLanguage,
      targetLang: targetLanguage
    };

    return this.$http.post('/_api/translate', data)
      .then(response => <TranslationResultServer>response.data)
      .then(data => {
        console.log(data.extract);
        return data.extract;
      });
  }

  getLanguages(): ng.IPromise<TargetLanguageView[]> {
    return this.$http.get('/_api/languages')
      .then(resposne => resposne.data);
  }

  // private googleArrayToJson(googleArray: string) {
  //   let a = googleArray
  //     .replace(/,+/g, ',')
  //     .replace(/\[,/, '[').replace(/,\]/, ']');
  //   return JSON.parse(a);
  // }
}

angular
  .module('googleTranslate1xAppInternal')
  .service('googleTranslateApi', GoogleTranslateApi);
