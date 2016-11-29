/// <reference path="../app.ts" />

'use strict';

module googleTranslateClientApp {
  export function synonymsFilterFactory(): Function {
    return synonymsFilter;
  }

  function synonymsFilter(input: string[], originalText): string {
    return input
      .filter((x) => x !== originalText)
      .join(', ');
  }
}

angular.module('googleTranslateClientApp')
  .filter('synonyms', googleTranslateClientApp.synonymsFilterFactory);