'use strict';

export class MainPage {
  navigate() {
    browser.get('/');
  }

  getTitle() {
    return $('h3');
  }
}
