/* eslint-env browser */

import Animator from '../Animator';

// const dom = new JSDOM('<!doctype html><html><body><div id="alchemy"></div></body></html>');
// document.body.innerHTML = '<div id="alchemy">1</div>';
let animator;
const duration = 1000;

beforeEach(() => {
  jest.useFakeTimers();
  animator = new Animator();
});

describe('Queue animate method', () => {
  test('animate interval method', () => {
    animator.show({ action: 'poll' }, duration);
  });
});
