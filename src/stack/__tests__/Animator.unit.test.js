/* eslint-env browser */

import Animator from '../Animator';

let animator;
const duration = 1000;
beforeEach(() => {
  jest.useFakeTimers();
  animator = new Animator();
});

describe('Stack animate method', () => {
  test('animate interval method', () => {
    animator.show({ action: 'pop' }, duration);
  });
});
