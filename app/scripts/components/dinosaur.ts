/// <reference path="../../../reference.ts" />
'use strict';

class Dinosaur {

  /* @ngInject */
  constructor(private translateManager: TranslateManager, private languagesManager: LanguagesManager) { }

  isShowDino() {
    return this.languagesManager.isLoading() ||
      this.translateManager.isTranslationInProgress();
  }
}

angular
  .module('googleTranslate1xAppInternal')
  .component('dinosaur', {
    templateUrl: 'views/dinosaur.html',
    controller: Dinosaur
  });
