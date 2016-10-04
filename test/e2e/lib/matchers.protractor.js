'use strict';

beforeEach(function () {
  jasmine.addMatchers({
    toHaveClass: () => ({compare: (actual, expected) => {
      let ret = {pass: actual.getAttribute('class').then(function (classes) {
        var pass = !!(classes || '').match('(^|\\s)' + expected + '(\\s|$)');
        ret.message = pass ? '\'' + classes + '\' contained class \'' + expected + '\'' :
                             '\'' + classes + '\' did not contain class \'' + expected + '\'';
        return pass;
      })};
      return ret;
    }})
  });
});
