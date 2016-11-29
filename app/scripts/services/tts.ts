/// <reference path="../app.ts" />

'use strict';

module googleTranslateClientApp {
  export class Tts {
    private ttsUrl: string;
    private settings: TtsSettings;

    /* @ngInject */
    constructor(private audioPlayer: AudioPlayer) {
      this.ttsUrl = 'https://google-translate-proxy.herokuapp.com/api/tts';
      this.settings = {
        speed: 10
      };
    }

    play(query: string, lang: string): void {
      this.audioPlayer.play(`${this.ttsUrl}?query=${query}&language=${lang}&speed=${this.settings.speed / 10.0}`);
    }

    getSettings(): TtsSettings {
      return this.settings;
    }
  }
}

angular.module('googleTranslateClientApp')
  .service('tts', googleTranslateClientApp.Tts);
