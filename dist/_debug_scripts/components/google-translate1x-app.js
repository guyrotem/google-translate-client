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