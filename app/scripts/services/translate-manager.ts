/// <reference path="../app.ts" />

'use strict';

module googleTranslateClientApp {
  export class TranslateManager {
    private didYouMean: string;
    private translationInProgress: boolean;

    private translationsCounterFreeze: number;

    /* @ngInject */
    constructor(private googleTranslateApi: GoogleTranslateApi, private $q: ng.IQService,
                private localStorage: LocalStorage, private languagesManager: LanguagesManager,
                private hypeOMeter: HypeOMeter) {
      this.didYouMean = null;
      this.translationInProgress = false;
    }

    getDidYouMeanFix(): string {
      return this.didYouMean;
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
      this.translationsCounterFreeze = this.googleTranslateApi.resolvedCounter;

      this.hypeOMeter.updateLanguageUsageStatistics(targetLanguages);

      let promiseMap: ng.IPromise<TranslationResultServerExtract>[] =
        targetLanguages.map(l => this.googleTranslateApi.translate(originalText, sourceLanguage, l));

      return this.$q.all(promiseMap)
        .then((resolvedTranslations: TranslationResultServerExtract[]) => {
          if (resolvedTranslations[0].actualQuery
            && resolvedTranslations[0].actualQuery.trim() !== originalText.trim()) {
            this.didYouMean = resolvedTranslations[0].actualQuery;
          }

          this.translationInProgress = false;

          return targetLanguages.map((langCode, index) => {
            return {
              language: this.languagesManager.langCodeToName(langCode),
              translation: resolvedTranslations[index].translation,
              transliteration: resolvedTranslations[index].transliteration,
              synonyms: resolvedTranslations[index].synonyms
            };
          });
        })
        .catch(err => {
          this.translationInProgress = false;
          return this.$q.reject(err.data.error);
        });
    }
  }
}

angular.module('googleTranslateClientApp')
  .service('translateManager', googleTranslateClientApp.TranslateManager);
