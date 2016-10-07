/// <reference path="../../../reference.ts" />
'use strict';

class GoogleTranslate1xApp {
  /* @ngInject */
  constructor() {

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
