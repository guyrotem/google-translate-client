/// <reference path="../../../reference.ts" />
'use strict';

class Tts {
  private ttsUrl: string;
  private settings: TtsSettings;

  /* @ngInject */
  constructor(private audioPlayer: AudioPlayer) {
    this.ttsUrl = '/api/tts';
    this.settings = {
      speed: 10
    };
  }

  play(query: string, lang: string): void {
    this.audioPlayer.play(`${this.ttsUrl}?query=${query}&targetLang=${lang}&speed=${this.settings.speed / 10.0}`);
  }

  getSettings(): TtsSettings {
    return this.settings;
  }
}

interface TtsSettings {
  speed: number;
}

angular
  .module('googleTranslate1xAppInternal')
  .service('tts', Tts);
