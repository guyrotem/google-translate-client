interface TranslationResultServer {
  extract: TranslationResultServerExtract;
  originalResponse: string;
}

interface TranslationResultServerExtract {
  translation: string;
  actualQuery: string;
  resultType: number;
  transliteration?: string;
  synonyms: string[];
}
