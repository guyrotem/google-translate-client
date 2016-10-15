/// <reference path="../../../reference.ts" />
'use strict';

class AudioSpeedDashboard {
  /* @ngInject */
  constructor(private tts: Tts) { }

  getTtsSettings(): TtsSettings {
    return this.tts.getSettings();
  }
}

angular
  .module('googleTranslate1xAppInternal')
  .component('audioSpeedDashboard', {

    template: `<div style="padding: 12px 12px 0 12px">
                  <div style="display: inline-block">Play speed</div>
                  <div style="display: inline-block">
                      <input type="range" ng-model="$ctrl.getTtsSettings().speed" min="2" max="10" style="cursor: pointer">
                  </div>
                  <div style="display: inline-block">{{$ctrl.getTtsSettings().speed / 10.0}}</div>
                </div>
                `,

    controller: AudioSpeedDashboard,
    bindings: {
      name: '='
    }
  });
