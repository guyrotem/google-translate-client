/// <reference path="../../../reference.ts" />
'use strict';

class AudioPlayer {
  private dummy: string;
  /* @ngInject */
  constructor() {
    this.dummy = '';
  }

  play(url: string): void {
    console.log('Playing ' + url);
    var audio = new Audio(url);
    audio.play();
  }
}

angular
  .module('googleTranslate1xAppInternal')
  .service('audioPlayer', AudioPlayer);
