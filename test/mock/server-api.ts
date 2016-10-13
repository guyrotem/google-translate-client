/// <reference path="../../reference.ts" />
'use strict';

angular.module('googleTranslate1xAppMocks', ['ngMockE2E', 'googleTranslate1xAppMocksInternal'])
  .run(($httpBackend: ng.IHttpBackendService, mocksResponseBuilder, mockLanguagesResponse) => {

    let translateApiUrl = '/api/translate';
    let languagesApiUrl = '/api/languages';

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
