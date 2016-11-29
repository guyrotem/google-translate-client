/// <reference path="../app.ts" />

'use strict';

module googleTranslateClientApp {
  export class SourceLangSelectionCtrl {
    model: TargetLanguageView;

    /* @ngInject */
    constructor(private sourceLanguageManager: SourceLanguageManager) {
      this.model = this.sourceLanguageManager.getSelectedLanguageModel();
    }

    getTargetLanguages(): TargetLanguageView[] {
      return this.sourceLanguageManager.getTargetLanguages();
    }
  }
}

angular.module('googleTranslateClientApp')
  .controller('SourceLangSelectionCtrl', googleTranslateClientApp.SourceLangSelectionCtrl);
