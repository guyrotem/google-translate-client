/// <reference path="../app.ts" />

'use strict';

module googleTranslateClientApp {
  export class AudioPlayer {
    private dummy: string;
    /* @ngInject */
    constructor() {
      this.dummy = '';
    }

    play(url: string): void {
      console.log('Playing ' + url);
      let audio = new Audio();
      audio.src = url;
      audio.play();
    }
  }
}

angular.module('googleTranslateClientApp')
  .service('audioPlayer', googleTranslateClientApp.AudioPlayer);
