/// <reference path="../../../reference.ts" />
'use strict';

class Dinosaur {

  /* @ngInject */
  constructor(private translateManager: TranslateManager) { }

  isShowDino() {
    return this.translateManager.isLoading() ||
      this.translateManager.isTranslationInProgress();
  }
}

angular
  .module('googleTranslate1xAppInternal')
  .component('dinosaur', {
    templateUrl: 'views/dinosaur.html',
    controller: Dinosaur
  });
