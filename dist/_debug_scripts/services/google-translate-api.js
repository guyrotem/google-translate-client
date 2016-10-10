/// <reference path="../../../reference.ts" />
'use strict';
var GoogleTranslateApi = (function () {
    /* @ngInject */
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