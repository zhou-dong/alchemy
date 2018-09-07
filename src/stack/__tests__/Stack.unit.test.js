/* eslint-disable no-unused-expressions */
import Stack from '../Stack';

let stack;
const number = 15;
const random = max => Math.floor(Math.random() * max) + 1;
const array = () => Array(number).fill(number).map(item => random(item));

beforeEach(() => {
  stack = new Stack();
});

describe('Stack peek method', () => {
  test('peek for empty stack', () => {
    expect(() => stack.peek()).toThrow();
  });
  test('peek from non-empty stack', () => {
    array().forEach((item) => {
      stack.push(item);
      expect(stack.peek()).toBe(item);
    });
  });
});

describe('Stack getter size', () => {
  test('empty stack', () => {
    expect(stack.size).toBe(0);
  });
  test('non empty stack', () => {
    array().forEach((item, index) => {
      stack.push(item);
      expect(stack.size).toBe(index + 1);
    });
  });
});

describe('Stack push method', () => {
  test('push to empty stack', () => {
    stack.push(number);
    expect(stack.size).toBe(1);
    expect(stack.peek()).toBe(number);
  });
  test('push to non-empty stack', () => {
    array().forEach((item) => {
      stack.push(item);
      expect(stack.peek()).toBe(item);
    });
  });
});

describe('Stack pop method', () => {
  test('pop from empty stack', () => {
    expect(() => stack.pop()).toThrow();
  });
  test('pop from non-empty stack', () => {
    const data = array();
    data.forEach(item => stack.push(item));
    for (let i = data.length - 1; i >= 0; i -= 1) {
      expect(stack.pop()).toBe(data[i]);
    }
  });
});

describe('Stack snapshots size', () => {
  test('snapshots length after push', () => {
    array().forEach((item, index) => {
      stack.push(item);
      expect(stack.snapshots).toHaveLength(index + 1);
    });
  });
  test('snapshots length after peek', () => {
    array().forEach(item => stack.push(item));
    const { size } = stack;
    for (let i = 0; i < size; i += 1) {
      stack.peek();
      expect(stack.snapshots).toHaveLength(size + i + 1);
    }
  });
  test('snapshots length after pop', () => {
    array().forEach(item => stack.push(item));
    const { size } = stack;
    for (let i = 0; i < size - 1; i += 1) {
      stack.pop();
      expect(stack.snapshots).toHaveLength(size + i + 1);
    }
  });
});
