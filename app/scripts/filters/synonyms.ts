/// <reference path="../../../reference.ts" />
'use strict';

class Synonyms {
  /* @ngInject */
  constructor() {
    //
  }

  filter(input: string[]): string {
    return input.slice(1).join(', ');
  }
}

angular
  .module('googleTranslate1xAppInternal')
  .filter('synonyms', $injector => {
    let synonyms = $injector.instantiate(Synonyms);
    return synonyms.filter.bind(synonyms);
  });
