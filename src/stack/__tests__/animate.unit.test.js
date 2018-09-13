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

describe('Stack animate method', () => {
  test('animate interval method', () => {
    const pushSize = 10;
    for (let i = 0; i < pushSize; i += 1) {
      actions.push(i);
    }
    animate(undefined, actions.actions);
    // jest.runAllTimers();
    expect(setInterval).toBeCalled();
  });
});
