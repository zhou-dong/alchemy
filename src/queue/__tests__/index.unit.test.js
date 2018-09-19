/* eslint-env browser */

import Queue from '../index';

let queue;

beforeEach(() => {
  queue = new Queue();
});

const getLastAction = () => {
  const array = queue.actions.actions;
  return array[array.length - 1].action;
};

describe('Queue Index queue basic method', () => {
  test('queue basic method: offer, peek, poll', () => {
    const offerSize = 100;
    for (let i = 0; i < offerSize; i += 1) {
      queue.offer(i);
    }
    expect(queue.size).toBe(offerSize);
    const peeked = queue.peek();
    const polled = queue.poll();
    expect(peeked).toBe(0);
    expect(peeked).toBe(polled);
  });
});

describe('Queue Index Actions offer, peek, poll method', () => {
  test('offer method', () => {
    const item = 10;
    queue.offer(item);
    expect(queue.actions.size).toBe(1);
    const { action, data } = getLastAction();
    expect(action).toBe('offer');
    expect(data).toBe(item);
  });

  test('peek method', () => {
    queue.peek();
    expect(queue.actions.size).toBe(1);
    const { action } = getLastAction();
    expect(action).toBe('peek');
  });

  test('poll method', () => {
    queue.poll();
    expect(queue.actions.size).toBe(1);
    const { action } = getLastAction();
    expect(action).toBe('poll');
  });
});

describe('Queue Index show method', () => {
  test('show/animation test', () => {
    const pushSize = 10;
    for (let i = 0; i < pushSize; i += 1) {
      queue.offer(i);
    }
    jest.useFakeTimers();
    queue.show();
    expect(setInterval).toBeCalled();
  });
});
