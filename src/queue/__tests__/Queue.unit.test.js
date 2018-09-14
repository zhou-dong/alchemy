import Queue from '../Queue';

let queue;

beforeEach(() => {
  queue = new Queue();
});

describe('Queue size method', () => {
  test('empty queue', () => {
    expect(queue.size).toBe(0);
  });

  test('queue size after offer', () => {
    const time = 10;
    for (let i = 0; i < time; i += 1) {
      queue.offer(i);
    }
    expect(queue.size).toBe(time);
  });

  test('queue size after poll', () => {
    const offerTime = 10;
    for (let i = 0; i < offerTime; i += 1) {
      queue.offer(i);
    }
    const pollTime = 5;
    for (let i = 0; i < pollTime; i += 1) {
      queue.poll(i);
    }
    expect(queue.size).toBe(offerTime - pollTime);
  });

  test('queue size after peek', () => {
    const offerTime = 10;
    for (let i = 0; i < offerTime; i += 1) {
      queue.offer(i);
    }
    const pollTime = 5;
    for (let i = 0; i < pollTime; i += 1) {
      queue.poll(i);
    }
    const peekTime = 10;
    for (let i = 0; i < peekTime; i += 1) {
      queue.peek(i);
    }
    expect(queue.size).toBe(offerTime - pollTime);
  });
});

describe('Queue offer, peek and poll method', () => {
  test('offer, poll, peek', () => {
    const size = 10;
    for (let i = 0; i < size; i += 1) {
      queue.offer(i);
    }
    expect(queue.size).toBe(size);
    const peeked = queue.peek();
    expect(peeked).toBe(0);
    const poped = queue.poll();
    expect(peeked).toBe(poped);
  });
});
