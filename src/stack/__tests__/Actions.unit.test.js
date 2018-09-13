import Actions from '../Actions';

let actions;

beforeEach(() => {
  actions = new Actions();
});

const getLastAction = () => {
  const array = actions.actions;
  return array[array.length - 1];
};

describe('Stack Actions size method', () => {
  test('empty actions', () => {
    expect(actions.size).toBe(0);
  });

  test('actions size after push', () => {
    const size = 10;
    for (let i = 0; i < size; i += 1) {
      actions.push(i);
    }
    expect(actions.size).toBe(size);
  });

  test('actions size after push, pop, peek', () => {
    const pushSize = 10;
    for (let i = 0; i < pushSize; i += 1) {
      actions.push(i);
    }
    const popSize = 5;
    for (let i = 0; i < popSize; i += 1) {
      actions.pop(i);
    }
    const peekSize = 10;
    for (let i = 0; i < peekSize; i += 1) {
      actions.peek(i);
    }
    expect(actions.size).toBe(pushSize + popSize + peekSize);
  });
});

describe('Stack Actions push, peek, pop method', () => {
  test('push method', () => {
    const item = 10;
    actions.push(item);
    expect(actions.size).toBe(1);
    const { action, data } = getLastAction();
    expect(action).toBe('push');
    expect(data).toBe(item);
  });

  test('peek method', () => {
    actions.peek();
    expect(actions.size).toBe(1);
    const { action } = getLastAction();
    expect(action).toBe('peek');
  });

  test('pop method', () => {
    actions.pop();
    expect(actions.size).toBe(1);
    const { action } = getLastAction();
    expect(action).toBe('pop');
  });
});
