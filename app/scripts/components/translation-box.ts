/// <reference path="../../../reference.ts" />
'use strict';

class TranslationBox {

  //translationForm: ng.IFormController;
  targetLanguages: string[];

  input: string;
  private lastResult: TranslationResultView[];

  /* @ngInject */
  constructor(private translateManager: TranslateManager, private sortLanguage: SortLanguage,
              private languagesManager: LanguagesManager, private hypeOMeter: HypeOMeter) {
    this.lastResult = [];
    this.targetLanguages = [];
  }

  getTranslations(): TranslationResultView[] {
    return this.lastResult;
  }

  getTargetLanguageOptions(): TargetLanguageView[] {
    return this.translateManager.getAllTargetLanguages();
  }

  getLastError(): string {
    return this.translateManager.getLastError();
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
    let sourceLanguage = 'auto';

    this.translateManager.translate(
      this.input,
      sourceLanguage,
      this.targetLanguages.filter(x => { return x !== sourceLanguage; })
    )
      .then(result => {
        this.lastResult = result;
      });
  }
}

angular
  .module('googleTranslate1xAppInternal')
  .component('translationBox', {

    templateUrl: 'views/translation-box.html',

    controller: TranslationBox,
    bindings: { }
  });
