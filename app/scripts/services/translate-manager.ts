/// <reference path="../../../reference.ts" />
'use strict';

class TranslateManager {

  private sourceLanguages: { [key: string]: string; };
  private targetLanguages: TargetLanguageView[];

  /* @ngInject */
  constructor(private googleTranslateApi: GoogleTranslateApi, private $q: ng.IQService) {
    this.sourceLanguages = {
      auto: 'Auto',
      en: 'English',
      es: 'Spanish',
      fr: 'French'
    };

    this.googleTranslateApi.getLanguages()
      .then(result => {
        this.targetLanguages = result;
      });
  }

  getAllTargetLanguages(): TargetLanguageView[] {
    return this.targetLanguages;
  }

  getAllTargetLanguageCodes(): string[] {
    return _.map(this.targetLanguages, x => x.code);
  }

  translate(originalText: string, sourceLanguage: string, targetLanguages: string[]): ng.IPromise<TranslationResultView[]> {
    let promiseMap: ng.IPromise<TranslationResultServerExtract>[] =
      targetLanguages.map(l => this.googleTranslateApi.translate(originalText, sourceLanguage, l));

    return this.$q.all(promiseMap)
      .then((resolvedTranslations: TranslationResultServerExtract[]) => {
        return targetLanguages.map((langCode, index) => {
          return {
            language: this.langCodeToName(langCode),
            translation: resolvedTranslations[index].translation
          };
        });
      });
  }

  private langCodeToName(langCode: string): string {
    return this.targetLanguages
      .find(x => x.code == langCode)
      .name;
  }
}

angular
  .module('googleTranslate1xAppInternal')
  .service('translateManager', TranslateManager);
