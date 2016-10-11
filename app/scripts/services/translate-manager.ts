/// <reference path="../../../reference.ts" />
'use strict';

class TranslateManager {
  private didYouMean: string;
  private translationInProgress: boolean;
  private lastError: string;
  private _isLoading: boolean;

  private translationsCounterFreeze: number;

  /* @ngInject */
  constructor(private googleTranslateApi: GoogleTranslateApi, private $q: ng.IQService,
              private localStorage: LocalStorage, private languagesManager: LanguagesManager) {
    this.didYouMean = null;
    this.translationInProgress = false;
    this.lastError = '';
    this._isLoading = true;

    this.googleTranslateApi.getLanguages()
      .then(results => {
        this.languagesManager.setLanguages(results);
      })
      .catch(() => {
        this.lastError = 'Failed to retrieve languages. Please make sure server is up & running (or set enableMocks==true)';
      })
      .finally(() => {
        this._isLoading = false;
      });
  }

  isLoading(): boolean {
    return this._isLoading;
  }

  getAllTargetLanguages(): TargetLanguageView[] {
    return this.languagesManager.getActiveLanguages();
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

    this.updateLanguageUsageStatistics(targetLanguages);

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
            language: this.languagesManager.langCodeToName(langCode),
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

  private updateLanguageUsageStatistics(targetLangs: string[]) {
    targetLangs.map(this.localStorage.incrementLanguageUsageCount.bind(this.localStorage));
  }
}

angular
  .module('googleTranslate1xAppInternal')
  .service('translateManager', TranslateManager);
