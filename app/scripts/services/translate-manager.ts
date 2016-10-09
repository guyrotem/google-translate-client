/// <reference path="../../../reference.ts" />
'use strict';

class TranslateManager {

  private sourceLanguages: { [key: string]: string; };
  private targetLanguages: TargetLanguageView[];
  private didYouMean: string;
  private translationInProgress: boolean;
  private lastError: string;

  private translationsCounterFreeze: number;

  /* @ngInject */
  constructor(private googleTranslateApi: GoogleTranslateApi, private $q: ng.IQService) {
    this.sourceLanguages = {
      auto: 'Auto',
      en: 'English',
      es: 'Spanish',
      fr: 'French'
    };

    this.didYouMean = null;
    this.translationInProgress = false;
    this.lastError = '';

    this.googleTranslateApi.getLanguages()
      .then(result => {
        this.targetLanguages = result;
      })
      .catch(err => {
        this.lastError = 'Failed to retrieve languages. Please make sure server is up & running (or set enableMocks==true)';
      });
  }

  getAllTargetLanguages(): TargetLanguageView[] {
    return this.targetLanguages;
  }

  getAllTargetLanguageCodes(): string[] {
    return _.map(this.targetLanguages, x => x.code);
  }

  getDidYouMeanFix(): string {
    return this.didYouMean;
  }

  getLastError(): string {
    return this.lastError;
  }

  isTranslationInProgress(): boolean {
    return this.translationInProgress;
  }

  translationsDoneCounter(): number {
    return this.googleTranslateApi.resolvedCounter - this.translationsCounterFreeze;
  }

  translate(originalText: string, sourceLanguage: string, targetLanguages: string[]): ng.IPromise<TranslationResultView[]> {
    this.didYouMean = null;
    this.translationInProgress = true;
    this.lastError = '';
    this.translationsCounterFreeze = this.googleTranslateApi.resolvedCounter;

    let promiseMap: ng.IPromise<TranslationResultServerExtract>[] =
      targetLanguages.map(l => this.googleTranslateApi.translate(originalText, sourceLanguage, l));

    return this.$q.all(promiseMap)
      .then((resolvedTranslations: TranslationResultServerExtract[]) => {
        if (resolvedTranslations[0].actualQuery !== originalText) {
          this.didYouMean = resolvedTranslations[0].actualQuery;
        }

        this.translationInProgress = false;

        return targetLanguages.map((langCode, index) => {
          return {
            language: this.langCodeToName(langCode),
            translation: resolvedTranslations[index].translation,
            transliteration: resolvedTranslations[index].transliteration
          };
        });
      })
      .catch(err => {
        this.lastError = err.data.error;
        this.translationInProgress = false;
        return this.$q.reject(this.lastError);
      });
  }

  private langCodeToName(langCode: string): string {
    return this.targetLanguages
      .find(x => x.code === langCode)
      .name;
  }
}

angular
  .module('googleTranslate1xAppInternal')
  .service('translateManager', TranslateManager);
