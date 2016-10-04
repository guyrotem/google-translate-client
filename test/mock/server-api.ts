/// <reference path="../../reference.ts" />
'use strict';

angular.module('googleTranslate1xAppMocks', ['ngMockE2E'])
  .run(($httpBackend: ng.IHttpBackendService) => {
    $httpBackend.whenGET(/.*/).passThrough();
    $httpBackend.whenPOST(/.*/).passThrough();
    $httpBackend.whenPUT(/.*/).passThrough();
    $httpBackend.whenDELETE(/.*/).passThrough();
  });
