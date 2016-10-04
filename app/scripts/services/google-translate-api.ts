/// <reference path="../../../reference.ts" />
'use strict';

class GoogleTranslateApi {
  private meaningOfLife: number;

  /* @ngInject */
  constructor() {
    this.meaningOfLife = 42;
  }

  someMethod(): number {
    return this.meaningOfLife;
  }
}

angular
  .module('googleTranslate1xAppInternal')
  .service('googleTranslateApi', GoogleTranslateApi);
