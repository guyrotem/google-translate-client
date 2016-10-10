/// <reference path="../../../reference.ts" />
'use strict';
var TranslationBox = (function () {
    /* @ngInject */
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