'use strict';

try {
  angular.module('googleTranslate1xPreload');
} catch (e) {
  angular.module('googleTranslate1xPreload', []);
}

angular.module('googleTranslate1xPreload').run(['$templateCache', function ($templateCache) {
  'use strict';

  $templateCache.put('views/translation-box.html',
    "<div>\n" +
    "  <form name='$ctrl.translationForm' ng-submit='$ctrl.submit()'>\n" +
    "    <div class='div'>\n" +
    "      <div>\n" +
    "        <span>Target Languages:</span>\n" +
    "        <ui-select multiple ng-disabled='!$ctrl.getTargetLanguageOptions()' ng-model='$ctrl.targetLanguages' theme='bootstrap'>\n" +
    "          <ui-select-match placeholder='Spanish, French, Bengali, ...'>\n" +
    "            {{ $item.name }}\n" +
    "          </ui-select-match>\n" +
    "          <ui-select-choices repeat='targetLanguage.code as targetLanguage in $ctrl.getTargetLanguageOptions() | filter:$select.search'>\n" +
    "            {{ targetLanguage.name }}\n" +
    "          </ui-select-choices>\n" +
    "        </ui-select>\n" +
    "      </div>\n" +
    "      <div class='translation-input'>\n" +
    "        <div>Text</div>\n" +
    "        <input autocomplete='off' name='input' ng-disabled='!$ctrl.getTargetLanguageOptions()' ng-model='$ctrl.input' placeholder=\"{{$ctrl.getTargetLanguageOptions() ? 'where is the bus stop?' : ''}}\">\n" +
    "        <span>\n" +
    "          <button ng-disabled='$ctrl.isLockSearch()' type='submit' value='Translate!'>\n" +
    "            GO!\n" +
    "          </button>\n" +
    "        </span>\n" +
    "        <span ng-if='$ctrl.isInProgress()'>\n" +
    "          {{$ctrl.translationsDoneCounter()}} / {{$ctrl.targetLanguages.length}}\n" +
    "        </span>\n" +
    "      </div>\n" +
    "      <div class='translation-error' ng-show='!!$ctrl.getLastError()'>{{ $ctrl.getLastError() }}</div>\n" +
    "      <div class='did-you-mean' ng-if='$ctrl.showDidYouMean()'>\n" +
    "        <span>Did you mean...</span>\n" +
    "        <span>{{ $ctrl.didYouMean() }}</span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class='output-languages'>\n" +
    "      <div class='translation-results' ng-repeat='translationItem in $ctrl.getTranslations()'>\n" +
    "        <div class='result-language'>{{translationItem.language}}</div>\n" +
    "        <div class='result-value'>{{translationItem.translation}}</div>\n" +
    "        <div class='result-transliteration'>{{translationItem.transliteration}}</div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n"
  );
}]);