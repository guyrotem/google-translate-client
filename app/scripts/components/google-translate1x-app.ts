/// <reference path="../../../reference.ts" />
'use strict';

class GoogleTranslate1xApp {
  private stubValue: boolean;
  /* @ngInject */
  constructor() {
    this.stubValue = false;
  }

  getStub(): boolean {
    return this.stubValue;
  }
}

angular
  .module('googleTranslate1xAppInternal')
  .component('googleTranslate1xApp', {

    templateUrl: 'views/google-translate1x-app.html',
    controller: GoogleTranslate1xApp,
    bindings: {
      name: '='
    }
  });
