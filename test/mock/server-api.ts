/// <reference path="../../reference.ts" />
'use strict';

angular.module('googleTranslate1xAppMocks', ['ngMockE2E'])
  .run(($httpBackend: ng.IHttpBackendService, languages2) => {

    let translateApiUrl = '/api/translate';
    let languagesApiUrl = '/api/languages';

    let translateResponse = {
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
  })
  .constant('languages2', [
    {
      name: 'Chinese',
      code: 'zh'
    },
    {
      name: 'English',
      code: 'en'
    },
    {
      name: 'French',
      code: 'fr'
    },
    {
      name: 'Portuguese',
      code: 'pt'
    },
    {
      name: 'Russian',
      code: 'ru'
    },
    {
      name: 'Spanish',
      code: 'es'
    }
  ]);
