/// <reference path="../app.ts" />

'use strict';

module googleTranslateClientApp {
  export class AudioSpeedDashboardCtrl {
    /* @ngInject */
    constructor (private tts: Tts) {

    }

    getTtsSettings(): TtsSettings {
      return this.tts.getSettings();
    }
  }
}

angular.module('googleTranslateClientApp')
  .controller('AudioSpeedDashboardCtrl', googleTranslateClientApp.AudioSpeedDashboardCtrl);
