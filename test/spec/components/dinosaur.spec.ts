// /// <reference path="../../../reference.ts" />
// 'use strict';
//
// class DinosaurDriver extends WixBaseViewUnitDriver {
//
//   render(name = '') {
//     this.renderFromTemplate(`<dinosaur name="name"></dinosaur>`, {name});
//   }
//
//   getContainerElement() {
//     return this.findByDataHook('container');
//   }
//
//   getCounterElement() {
//     return this.findByDataHook('counter');
//   }
// }
//
// describe('Component: dinosaur', () => {
//   let driver: DinosaurDriver;
//
//   beforeEach(() => {
//     module('googleTranslate1xAppInternal');
//     driver = new DinosaurDriver();
//   });
//
//   afterEach(() => {
//     driver.disconnectFromBody();
//   });
//
//   it('should display name', () => {
//     driver.render('kukuchumuku');
//     expect(driver.element.text()).toContain('This is kukuchumuku');
//   });
//
//   it('should increase counter on click', () => {
//     driver.render();
//     expect(driver.getCounterElement().text()).toBe('0');
//
//     driver.getContainerElement().click();
//     expect(driver.getCounterElement().text()).toBe('1');
//   });
// });
