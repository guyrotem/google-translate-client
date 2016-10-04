/// <reference path="../../../reference.ts" />
'use strict';

class GoogleTranslate1xApp {
  clicks: number;
  name: string;

  /* @ngInject */
  constructor(private googleTranslateApi: GoogleTranslateApi) {
    this.clicks = 0;
  }

  onClick() {
    this.clicks++;
    return this.googleTranslateApi.someMethod()
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
