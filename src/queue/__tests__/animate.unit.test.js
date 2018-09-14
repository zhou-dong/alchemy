/* eslint-env browser */

import animate from '../animate';
import Actions from '../Actions';

// const dom = new JSDOM('<!doctype html><html><body><div id="alchemy"></div></body></html>');
// document.body.innerHTML = '<div id="alchemy">1</div>';
let actions;

beforeEach(() => {
  jest.useFakeTimers();
  actions = new Actions();
});

describe('Queue animate method', () => {
  test('animate interval method', () => {
    const offerSize = 10;
    for (let i = 0; i < offerSize; i += 1) {
      actions.offer(i);
    }
    animate(undefined, actions.actions);
    // jest.runAllTimers();
    expect(setInterval).toBeCalled();
  });
});
