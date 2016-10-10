/// <reference path="../../../reference.ts" />
'use strict';
var TranslateManager = (function () {
    /* @ngInject */
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