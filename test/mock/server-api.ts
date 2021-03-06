/// <reference path="../../typings/index.d.ts" />
'use strict';

angular.module('googleTranslateClientAppMocks', ['ngMockE2E', 'googleTranslateClientAppMocksInternal'])
  .run(($httpBackend: ng.IHttpBackendService, mocksResponseBuilder, mockLanguagesResponse) => {

    let translateApiUrl = '/api/translate';
    let languagesApiUrl = '/api/languages';
    //let ttsApiUrl = '/api/tts';

    $httpBackend.whenGET(languagesApiUrl).respond(mockLanguagesResponse);
    $httpBackend.whenPOST(translateApiUrl).respond((method, url, data: string) => {
      let serverResponse = mocksResponseBuilder(JSON.parse(data));
      return [200, serverResponse];
    });

    $httpBackend.whenGET(/.*/).passThrough();
    $httpBackend.whenPOST(/.*/).passThrough();
    $httpBackend.whenPUT(/.*/).passThrough();
    $httpBackend.whenDELETE(/.*/).passThrough();
  });
