/// <reference path="../../../reference.ts" />
'use strict';

class SourceLangSelection {
  model: TargetLanguageView;

  /* @ngInject */
  constructor(private sourceLanguageManager: SourceLanguageManager) {
    this.model = this.sourceLanguageManager.getSelectedLanguageModel();
  }

  getTargetLanguages(): TargetLanguageView[] {
    return this.sourceLanguageManager.getTargetLanguages();
  }
}

angular
  .module('googleTranslate1xAppInternal')
  .component('sourceLangSelection', {

    templateUrl: 'views/source-lang-selection.html',
    controller: SourceLangSelection
  });
