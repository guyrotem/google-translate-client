/// <reference path="../app.ts" />

'use strict';

module googleTranslateClientApp {
  export class SortLanguage {
    private sortingOptions: LangSortOption[];
    private langOrderingType: number;

    /* @ngInject */
    constructor(private hypeOMeter: HypeOMeter) {
      this.sortingOptions = [
        {
          label: 'ABC',
          id: SortingOption.ABC
        },
        {
          label: 'Popularity',
          id: SortingOption.Popularity
        },
        {
          label: 'Used recently',
          id: SortingOption.UsedRecently
        }
      ];
    }

    getSortingOptions(): LangSortOption[] {
      return this.sortingOptions;
    }

    orderLangsBy(languages: TargetLanguageView[], how: SortingOption): TargetLanguageView[] {
      if (angular.isUndefined(how)) {
        how = this.langOrderingType;
      }

      this.langOrderingType = how;

      switch (how) {
        case SortingOption.ABC:
          return _.sortBy(languages, 'name');
        case SortingOption.Popularity:
          return _.sortBy(languages, (x) => this.getLanguageRank(x));
        case SortingOption.UsedRecently:
          return _.sortBy(languages.filter((x) => this.wasEverUsed(x)), (x) => -1 * this.getLastUsed(x));
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

    private wasEverUsed(language: TargetLanguageView): boolean {
      return this.getLastUsed(language) > 0;
    }

    private getLastUsed(language: TargetLanguageView): number {
      return this.hypeOMeter.getLanguageLastUsage(language.code);
    }
  }
}

enum SortingOption {
  ABC = 0,
  Popularity = 1,
  UsedRecently = 2
}

angular.module('googleTranslateClientApp')
  .service('sortLanguage', googleTranslateClientApp.SortLanguage);
