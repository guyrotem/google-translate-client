/// <reference path="../../../reference.ts" />
'use strict';

describe('Service: audio', () => {
  let audio: AudioPlayer;

  beforeEach(() => {
    module('googleTranslate1xAppInternal');
  });

  beforeEach(inject((_audioPlayer_: AudioPlayer) => {
    audio = _audioPlayer_;
  }));

  it('should do something', () => {
    // expect(audio.play('test')).toBe(42);
  });

});
