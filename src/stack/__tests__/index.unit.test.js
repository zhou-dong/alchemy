/* eslint-env browser */

import Stack from '../index';

let stack;

beforeEach(() => {
  stack = new Stack();
});

const getLastAction = () => {
  const array = stack.actions.actions;
  return array[array.length - 1].action;
};

describe('Stack Index Stack basic method', () => {
  test('stack basic method: push, peek, pop', () => {
    const pushSize = 100;
    for (let i = 0; i < pushSize; i += 1) {
      stack.push(i);
    }
    expect(stack.size).toBe(pushSize);
    const peeked = stack.peek();
    const poped = stack.pop();
    expect(peeked).toBe(pushSize - 1);
    expect(peeked).toBe(poped);
  });
});

describe('Stack Index Actions push, peek, pop method', () => {
  test('push method', () => {
    const item = 10;
    stack.push(item);
    expect(stack.actions.size).toBe(1);
    const { action, data } = getLastAction();
    expect(action).toBe('push');
    expect(data).toBe(item);
  });

  test('peek method', () => {
    stack.peek();
    expect(stack.actions.size).toBe(1);
    const { action } = getLastAction();
    expect(action).toBe('peek');
  });

  test('pop method', () => {
    stack.pop();
    expect(stack.actions.size).toBe(1);
    const { action } = getLastAction();
    expect(action).toBe('pop');
  });
});

describe('Stack Index show method', () => {
  test('show/animation test', () => {
    const pushSize = 10;
    for (let i = 0; i < pushSize; i += 1) {
      stack.push(i);
    }
    jest.useFakeTimers();
    stack.show();
    expect(setInterval).toBeCalled();
  });
});
