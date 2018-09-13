import Stack from '../Stack';

let stack;

beforeEach(() => {
  stack = new Stack();
});

describe('Stack size method', () => {
  test('empty stack', () => {
    expect(stack.size).toBe(0);
  });

  test('stack size after push', () => {
    const size = 10;
    for (let i = 0; i < size; i += 1) {
      stack.push(i);
    }
    expect(stack.size).toBe(size);
  });

  test('stack size after pop', () => {
    const pushSize = 10;
    for (let i = 0; i < pushSize; i += 1) {
      stack.push(i);
    }
    const popSize = 5;
    for (let i = 0; i < popSize; i += 1) {
      stack.pop(i);
    }
    expect(stack.size).toBe(pushSize - popSize);
  });

  test('stack size after peek', () => {
    const pushSize = 10;
    for (let i = 0; i < pushSize; i += 1) {
      stack.push(i);
    }
    const popSize = 5;
    for (let i = 0; i < popSize; i += 1) {
      stack.pop(i);
    }
    const peekSize = 10;
    for (let i = 0; i < peekSize; i += 1) {
      stack.peek(i);
    }
    expect(stack.size).toBe(pushSize - popSize);
  });
});

describe('Stack push peek and pop method', () => {
  test('', () => {
    const size = 10;
    for (let i = 0; i < size; i += 1) {
      stack.push(i);
    }
    expect(stack.size).toBe(size);
    const peeked = stack.peek();
    const poped = stack.pop();
    expect(peeked).toBe(size - 1);
    expect(peeked).toBe(poped);
  });
});
