/// <reference path="../app.ts" />

'use strict';

module googleTranslateClientApp {
  export class SourceLanguageManager {
    private targetLanguages: TargetLanguageView[];
    private languageAuto: TargetLanguageView;
    private selectedLanguage: TargetLanguageView;

    /* @ngInject */
    constructor() {
      this.languageAuto = {name: 'auto', code: 'auto'};
      this.targetLanguages = [];
      this.selectedLanguage = {name: null, code: 'auto'};
    }

    setLanguages(languages: TargetLanguageServer[]): void {
      this.targetLanguages = _.sortBy(languages, 'name');
      this.targetLanguages.unshift(this.languageAuto);
    }

    getTargetLanguages(): TargetLanguageView[] {
      return this.targetLanguages;
    }

    getSelectedLanguageModel(): TargetLanguageView {
      return this.selectedLanguage;
    }
  }
}

angular.module('googleTranslateClientApp')
  .service('sourceLanguageManager', googleTranslateClientApp.SourceLanguageManager);
