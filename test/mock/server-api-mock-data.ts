/// <reference path="../../reference.ts" />
'use strict';

angular.module('googleTranslate1xAppMocksInternal', [])
  .service('mocksResponseBuilder', () => {
    let buildTranslationResponse = (translation: string, originalText: string, transliteration: string = ''): TranslationResultServer => {
      return {
        extract: {
          translation: translation,
          actualQuery: originalText,
          resultType: 0,
          transliteration: transliteration,
          synonyms: []
        },
        originalResponse: null
      };
    };

    let singleLang = (targetLang, query) => {
      switch (targetLang) {
        case 'fr':
          return buildTranslationResponse('chien', query);
        case 'ar':
          return buildTranslationResponse('كلب', query, 'kalb');
        case 'es':
          return buildTranslationResponse('perro', query);
        case 'zh-CN':
          return buildTranslationResponse('狗', query, 'Gǒu');
        case 'ru':
          return buildTranslationResponse('собака', query, 'sabaka');
        case 'pt':
          return buildTranslationResponse('cachorro', query);
        case 'en':
          return buildTranslationResponse('dog', query);
        default:
          return buildTranslationResponse('Dog', query);
      }
    };

    return (data: TranslationSubmitServer) => {
      let isSingleLang = !!data.targetLang;

      if (isSingleLang) {
        return singleLang(data.targetLang, data.query);
      } else {
        //  TODO: return the entire array
        return data.targetLangs.map(lang => singleLang(lang, data.query))[0];
      }
    };
  })
  .constant('mockLanguagesResponse', [
    {
      name: 'Arabic',
      code: 'ar'
    },
    {
      name: 'Chinese',
      code: 'zh-CN'
    },
    {
      name: 'English',
      code: 'en'
    },
    {
      name: 'French',
      code: 'fr'
    },
    {
      name: 'Portuguese',
      code: 'pt'
    },
    {
      name: 'Russian',
      code: 'ru'
    },
    {
      name: 'Spanish',
      code: 'es'
    }
  ]);
