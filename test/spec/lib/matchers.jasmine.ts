/// <reference path="../../../reference.ts" />
'use strict';

declare module jasmine {
  interface Matchers {
    toEqualData(expected: any): boolean;
    toHaveBeenCalledOnce(): boolean;
    toBeOneOf(...expected: any[]): boolean;
    toHaveClass(expected: string): boolean;
  }
}

beforeEach(function () {
  jasmine.addMatchers({
    toEqualData: () => ({compare: (actual, expected) => {
      return {pass: angular.equals(actual, expected)};
    }}),

    toHaveBeenCalledOnce: () => ({compare: (actual) => {
      let msg = 'Expected spy ' + actual.identity + ' to have been called once, but was ',
          count = actual.calls.count();
      if (count === 1) {
        return {pass: true, message: msg.replace('to have', 'not to have') + 'called once.'};
      } else {
        return {pass: false, message: count === 0 ? msg + 'never called.' :
                                                    msg + 'called ' + count + ' times.'};
      }
    }}),

    toBeOneOf: () => ({compare: (actual, ...expected) => {
      return {pass: expected.indexOf(actual) !== -1};
    }}),

    toHaveClass: () => ({compare: (actual, expected) => {
      let msg = 'Expected \'' + angular.mock.dump(this.actual) + '\' to have class \'' + expected + '\'.';
      let pass = actual.hasClass ? actual.hasClass(expected) : angular.element(actual).hasClass(expected);
      return {pass, message: pass ? msg.replace('to have', 'not to have') : msg};
    }})
  });
});
