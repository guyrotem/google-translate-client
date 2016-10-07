/// <reference path="../../../reference.ts" />
'use strict';

class TranslationBox {

  translationForm: ng.IFormController;
  targetLanguages: string[];

  input: string;
  private lastResult: TranslationResultView[];

  /* @ngInject */
  constructor(private translateManager: TranslateManager) {
    this.lastResult = [];
    this.targetLanguages = [];
  }

  getTranslations(): TranslationResultView[] {
    return this.lastResult;
  }

  getTargetLanguageOptions(): TargetLanguageView[] {
    return this.translateManager.getAllTargetLanguages();
  }

  isLockSearch(): boolean {
    return !this.input || this.targetLanguages.length == 0
  }

  submit() {
    this.lastResult = [];
    let sourceLanguage = 'en';

    this.translateManager.translate(
      this.input,
      sourceLanguage,
      this.targetLanguages.filter(x => {return x !== sourceLanguage;})
    )
      .then(result => {
        this.lastResult = result;
      });
  }
}

angular
  .module('googleTranslate1xAppInternal')
  .component('translationBox', {

    templateUrl: 'views/translation-box.html',

    controller: TranslationBox,
    bindings: { }
  });
