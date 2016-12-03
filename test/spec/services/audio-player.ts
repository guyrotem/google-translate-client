/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../app/scripts/services/audio-player.ts" />

'use strict';

describe('Service: audioPlayer', () => {

  // load the service's module
  beforeEach(module('googleTranslateClientApp'));

  // instantiate service
  var audioPlayer;
  beforeEach(inject(_audioPlayer_ => {
    audioPlayer = _audioPlayer_;
  }));

  it('should do something', () => {
    expect(!!audioPlayer).toBe(true);
  });

});
