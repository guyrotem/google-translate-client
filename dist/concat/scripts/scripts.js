/// <reference path="../../reference.ts" />
'use strict';
//add services, directives, controllers, filters, etc. in this module
//avoid adding module dependencies for this module
angular
    .module('googleTranslate1xAppInternal', ['googleTranslate1xPreload']);
//add module dependencies & config and run blocks in this module
//load only the internal module in tests and mock any module dependency
//the only exception to load this module in tests in to test the config & run blocks
angular
    .module('googleTranslate1xApp', ['googleTranslate1xAppInternal', 'ui.select', 'ngSanitize'])
    .config(function () {
    return;
});
//# sourceMappingURL=app.js.map
'use strict';

try {
  angular.module('googleTranslate1xPreload');
} catch (e) {
  angular.module('googleTranslate1xPreload', []);
}

angular.module('googleTranslate1xPreload').run(['$templateCache', function ($templateCache) {
  'use strict';

  $templateCache.put('views/google-translate1x-app.html',
    "<div class='container'>\n" +
    "  <div class='translate-box'>\n" +
    "    <h1>\n" +
    "      Google Translate Client\n" +
    "    </h1>\n" +
    "    <h5 class='powered-by-google'>powered by Google®</h5>\n" +
    "    <translation-box name='abc'></translation-box>\n" +
    "  </div>\n" +
    "</div>\n"
  );
}]);
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
/// <reference path="../../../reference.ts" />
'use strict';
var GoogleTranslate1xApp = (function () {
    /* @ngInject */
    function GoogleTranslate1xApp() {
        this.stubValue = false;
    }
    GoogleTranslate1xApp.prototype.getStub = function () {
        return this.stubValue;
    };
    return GoogleTranslate1xApp;
}());
angular
    .module('googleTranslate1xAppInternal')
    .component('googleTranslate1xApp', {
    templateUrl: 'views/google-translate1x-app.html',
    controller: GoogleTranslate1xApp,
    bindings: {
        name: '='
    }
});
//# sourceMappingURL=google-translate1x-app.js.map
/// <reference path="../../../reference.ts" />
'use strict';
var GoogleTranslateApi = (function () {
    /* @ngInject */
    GoogleTranslateApi.$inject = ["$http"];
    function GoogleTranslateApi($http) {
        this.$http = $http;
        this.resolvedCounter = 0;
    }
    GoogleTranslateApi.prototype.translate = function (originalText, sourceLanguage, targetLanguage) {
        var _this = this;
        var data = {
            query: originalText,
            sourceLang: sourceLanguage,
            targetLang: targetLanguage
        };
        return this.$http.post('/api/translate', data)
            .then(function (response) { return response.data; })
            .then(function (data) {
            _this.resolvedCounter++;
            console.log(data.extract);
            return data.extract;
        });
    };
    GoogleTranslateApi.prototype.getLanguages = function () {
        return this.$http.get('/api/languages')
            .then(function (resposne) { return resposne.data; });
    };
    return GoogleTranslateApi;
}());
angular
    .module('googleTranslate1xAppInternal')
    .service('googleTranslateApi', GoogleTranslateApi);
//# sourceMappingURL=google-translate-api.js.map
/// <reference path="../../../reference.ts" />
'use strict';
var TranslationBox = (function () {
    /* @ngInject */
    TranslationBox.$inject = ["translateManager"];
    function TranslationBox(translateManager) {
        this.translateManager = translateManager;
        this.lastResult = [];
        this.targetLanguages = [];
    }
    TranslationBox.prototype.getTranslations = function () {
        return this.lastResult;
    };
    TranslationBox.prototype.getTargetLanguageOptions = function () {
        return this.translateManager.getAllTargetLanguages();
    };
    TranslationBox.prototype.getLastError = function () {
        return this.translateManager.getLastError();
    };
    TranslationBox.prototype.isLockSearch = function () {
        return !this.input || this.targetLanguages.length === 0 || this.isInProgress();
    };
    TranslationBox.prototype.showDidYouMean = function () {
        return this.translateManager.getDidYouMeanFix() !== null;
    };
    TranslationBox.prototype.didYouMean = function () {
        return this.translateManager.getDidYouMeanFix();
    };
    TranslationBox.prototype.isInProgress = function () {
        return this.translateManager.isTranslationInProgress();
    };
    TranslationBox.prototype.translationsDoneCounter = function () {
        return this.translateManager.translationsDoneCounter();
    };
    TranslationBox.prototype.submit = function () {
        var _this = this;
        this.lastResult = [];
        var sourceLanguage = 'auto';
        this.translateManager.translate(this.input, sourceLanguage, this.targetLanguages.filter(function (x) { return x !== sourceLanguage; }))
            .then(function (result) {
            _this.lastResult = result;
        });
    };
    return TranslationBox;
}());
angular
    .module('googleTranslate1xAppInternal')
    .component('translationBox', {
    templateUrl: 'views/translation-box.html',
    controller: TranslationBox,
    bindings: {}
});
//# sourceMappingURL=translation-box.js.map
/// <reference path="../../../reference.ts" />
'use strict';
var TranslateManager = (function () {
    /* @ngInject */
    TranslateManager.$inject = ["googleTranslateApi", "$q"];
    function TranslateManager(googleTranslateApi, $q) {
        var _this = this;
        this.googleTranslateApi = googleTranslateApi;
        this.$q = $q;
        this.sourceLanguages = {
            auto: 'Auto',
            en: 'English',
            es: 'Spanish',
            fr: 'French'
        };
        this.didYouMean = null;
        this.translationInProgress = false;
        this.lastError = '';
        this.googleTranslateApi.getLanguages()
            .then(function (result) {
            _this.targetLanguages = result;
        })
            .catch(function (err) {
            _this.lastError = 'Failed to retrieve languages. Please make sure server is up & running (or set enableMocks==true)';
        });
    }
    TranslateManager.prototype.getAllTargetLanguages = function () {
        return this.targetLanguages;
    };
    TranslateManager.prototype.getAllTargetLanguageCodes = function () {
        return _.map(this.targetLanguages, function (x) { return x.code; });
    };
    TranslateManager.prototype.getDidYouMeanFix = function () {
        return this.didYouMean;
    };
    TranslateManager.prototype.getLastError = function () {
        return this.lastError;
    };
    TranslateManager.prototype.isTranslationInProgress = function () {
        return this.translationInProgress;
    };
    TranslateManager.prototype.translationsDoneCounter = function () {
        return this.googleTranslateApi.resolvedCounter - this.translationsCounterFreeze;
    };
    TranslateManager.prototype.translate = function (originalText, sourceLanguage, targetLanguages) {
        var _this = this;
        this.didYouMean = null;
        this.translationInProgress = true;
        this.lastError = '';
        this.translationsCounterFreeze = this.googleTranslateApi.resolvedCounter;
        var promiseMap = targetLanguages.map(function (l) { return _this.googleTranslateApi.translate(originalText, sourceLanguage, l); });
        return this.$q.all(promiseMap)
            .then(function (resolvedTranslations) {
            if (resolvedTranslations[0].actualQuery !== originalText) {
                _this.didYouMean = resolvedTranslations[0].actualQuery;
            }
            _this.translationInProgress = false;
            return targetLanguages.map(function (langCode, index) {
                return {
                    language: _this.langCodeToName(langCode),
                    translation: resolvedTranslations[index].translation,
                    transliteration: resolvedTranslations[index].transliteration
                };
            });
        })
            .catch(function (err) {
            _this.lastError = err.data.error;
            _this.translationInProgress = false;
            return _this.$q.reject(_this.lastError);
        });
    };
    TranslateManager.prototype.langCodeToName = function (langCode) {
        return this.targetLanguages
            .find(function (x) { return x.code === langCode; })
            .name;
    };
    return TranslateManager;
}());
angular
    .module('googleTranslate1xAppInternal')
    .service('translateManager', TranslateManager);
//# sourceMappingURL=translate-manager.js.map

