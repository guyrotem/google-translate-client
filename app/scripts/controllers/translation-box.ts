/// <reference path="../app.ts" />

'use strict';

module googleTranslateClientApp {
  export class TranslationBoxCtrl {

    //translationForm: ng.IFormController;
    targetLanguages: string[];

    input: string;
    private lastResult: TranslationResultView[];

    /* @ngInject */
    constructor(private translateManager: TranslateManager, private sortLanguage: SortLanguage,
                private languagesManager: LanguagesManager, private hypeOMeter: HypeOMeter,
                private translateBoxUi: TranslateBoxUi, private tts: Tts,
                private sourceLanguageManager: SourceLanguageManager) {
      this.lastResult = [];
      this.targetLanguages = [];
      this.translateBoxUi.init();
    }

    getTranslations(): TranslationResultView[] {
      return this.lastResult;
    }

    getTargetLanguageOptions(): TargetLanguageView[] {
      return this.languagesManager.getActiveLanguages();
    }

    clearAllOptions(): void {
      this.targetLanguages = [];
    }

    getLastError(): string {
      return this.translateBoxUi.getLastError();
    }

    isLockSearch(): boolean {
      return !this.input || this.targetLanguages.length === 0 || this.isInProgress();
    }

    isLockUi(): boolean {
      return !this.getTargetLanguageOptions() || this.translateManager.isTranslationInProgress();
    }

    isSortingAllowed(): boolean {
      return !!this.getTargetLanguageOptions();
    }

    getSortingOptions(): LangSortOption[] {
      return this.sortLanguage.getSortingOptions();
    }

    isSelectedSorting(option: LangSortOption): boolean {
      return this.sortLanguage.isSelectedSorting(option);
    }

    isPopularTargetLanguage(lang: TargetLanguageView): boolean {
      return this.hypeOMeter.isPopularTargetLanguage(lang);
    }

    showDidYouMean(): boolean {
      return this.translateManager.getDidYouMeanFix() !== null;
    }

    didYouMean(): string {
      return this.translateManager.getDidYouMeanFix();
    }

    isInProgress(): boolean {
      return this.translateManager.isTranslationInProgress();
    }

    translationsDoneCounter(): number {
      return this.translateManager.translationsDoneCounter();
    }

    orderLangsBy(what: number) {
      this.languagesManager.orderLangsBy(what);
    }

    submit() {
      this.lastResult = [];
      let sourceLanguage = this.sourceLanguageManager.getSelectedLanguageModel().code;

      this.translateBoxUi.translate(
        this.input,
        sourceLanguage,
        this.targetLanguages.filter(x => { return x !== sourceLanguage; })
      )
        .then(result => {
          this.lastResult = result;
        });
    }

    playAudio(result: TranslationResultView): void {
      this.tts.play(result.translation, this.languagesManager.langNameToCode(result.language));
    }
  }
}

angular.module('googleTranslateClientApp')
  .controller('TranslationBoxCtrl', googleTranslateClientApp.TranslationBoxCtrl);
