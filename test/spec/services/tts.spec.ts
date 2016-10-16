/// <reference path="../../../reference.ts" />
'use strict';

describe('Service: tts', () => {
  let tts: Tts, audioPlayer: AudioPlayer;

  beforeEach(() => {
    module('googleTranslate1xAppInternal');

    module({
      audioPlayer: {
        play: angular.noop
      }
    });
  });

  beforeEach(inject((_tts_: Tts, _audioPlayer_: AudioPlayer) => {
    tts = _tts_;
    audioPlayer = _audioPlayer_;
  }));

  it('should play audio from the correct URL', () => {
    spyOn(audioPlayer, 'play');
    tts.getSettings().speed = 2;
    tts.play('perro', 'es');
    expect(audioPlayer.play).toHaveBeenCalledWith('/api/tts?query=perro&language=es&speed=0.2');
  });

});
