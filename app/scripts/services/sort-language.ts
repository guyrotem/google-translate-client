/// <reference path="../../../reference.ts" />
'use strict';

class SortLanguage {
  private sortingOptions: LangSortOption[];
  private langOrderingType: number;

  /* @ngInject */
  constructor(private hypeOMeter: HypeOMeter) {
    this.sortingOptions = [
      {
        label: 'ABC',
        id: 0
      },
      {
        label: 'Popularity',
        id: 1
      }
    ];
  }

  getSortingOptions(): LangSortOption[] {
    return this.sortingOptions;
  }

  orderLangsBy(languages: TargetLanguageView[], how: SortingOption): TargetLanguageView[] {
    this.langOrderingType = how;

    switch (how) {
      case SortingOption.ABC:
        return _.sortBy(languages, 'name');
      case SortingOption.Popularity:
        return _.sortBy(languages, (x) => this.getLanguageRank(x));
      default:
        console.error(`What is ${how}?`);
        return [];
    }
  }

  getSelectedOrdering(): SortingOption {
    return this.langOrderingType;
  }

  isSelectedSorting(option: LangSortOption): boolean {
    return this.langOrderingType === option.id;
  }

  private getLanguageRank(language: TargetLanguageView): number {
    return this.hypeOMeter.getLanguageRank(language.code);
  }
}

enum SortingOption {
  ABC = 0,
  Popularity = 1
}

angular
  .module('googleTranslate1xAppInternal')
  .service('sortLanguage', SortLanguage);
