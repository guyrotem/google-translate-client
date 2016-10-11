/// <reference path="../../../reference.ts" />
'use strict';

describe('Service: hypeOMeter', () => {
  let hypeOMeter: HypeOMeter;

  beforeEach(() => {
    module('googleTranslate1xAppInternal');
  });

  beforeEach(inject((_hypeOMeter_: HypeOMeter) => {
    hypeOMeter = _hypeOMeter_;
  }));

  it('should do something', () => {
    hypeOMeter.loadRankings([{code: 'fr', name: 'French'}, {code: 'iw', name: 'Hebrew'}]);
    expect(hypeOMeter.getLanguageRank('fr')).toBe(0);
  });

});
