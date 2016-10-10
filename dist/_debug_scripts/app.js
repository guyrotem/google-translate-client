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