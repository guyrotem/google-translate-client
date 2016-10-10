/// <reference path="../../reference.ts" />
'use strict';
angular.module('googleTranslate1xAppMocks', ['ngMockE2E'])
    .run(["$httpBackend", "languages2", function ($httpBackend, languages2) {
    var translateApiUrl = '/api/translate';
    var languagesApiUrl = '/api/languages';
    var translateResponse = {
        extract: {
            translation: 'одежьда'
        },
        originalResponse: JSON.stringify([[['одежьда']]])
    };
    $httpBackend.whenPOST(translateApiUrl).respond(200, translateResponse);
    $httpBackend.whenGET(languagesApiUrl).respond(200, languages2);
    $httpBackend.whenGET(/.*/).passThrough();
    $httpBackend.whenPOST(/.*/).passThrough();
    $httpBackend.whenPUT(/.*/).passThrough();
    $httpBackend.whenDELETE(/.*/).passThrough();
}])
    .constant('languages2', [
    {
        name: 'English',
        code: 'en'
    },
    {
        name: 'Portuguese',
        code: 'pt'
    },
    {
        name: 'Spanish',
        code: 'es'
    },
    {
        name: 'French',
        code: 'fr'
    },
    {
        name: 'Russian',
        code: 'ru'
    },
    {
        name: 'Chinese',
        code: 'zh'
    }
]);
//# sourceMappingURL=server-api.js.map