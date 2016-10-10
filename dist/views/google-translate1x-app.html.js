'use strict';

try {
  angular.module('googleTranslate1xPreload');
} catch (e) {
  angular.module('googleTranslate1xPreload', []);
}

angular.module('googleTranslate1xPreload').run(['$templateCache', function ($templateCache) {
  'use strict';

  $templateCache.put('views/google-translate1x-app.html',
    "<div class='container'>\n" +
    "  <div class='translate-box'>\n" +
    "    <h1>\n" +
    "      Google Translate Client\n" +
    "    </h1>\n" +
    "    <h5 class='powered-by-google'>powered by Google®</h5>\n" +
    "    <translation-box name='abc'></translation-box>\n" +
    "  </div>\n" +
    "</div>\n"
  );
}]);