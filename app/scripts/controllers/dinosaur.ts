/// <reference path="../app.ts" />

'use strict';

module googleTranslateClientApp {
  export class DinosaurCtrl {

    /* @ngInject */
    constructor(private translateManager: TranslateManager, private languagesManager: LanguagesManager) { }

    isShowDino() {
      return this.languagesManager.isLoading() ||
        this.translateManager.isTranslationInProgress();
    }
  }
}

angular.module('googleTranslateClientApp')
  .controller('DinosaurCtrl', googleTranslateClientApp.DinosaurCtrl);
