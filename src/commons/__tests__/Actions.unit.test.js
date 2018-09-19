import Actions from '../Actions';

let actions;

beforeEach(() => {
  actions = new Actions();
});

describe('commons actions test', () => {
  test('add method', () => {
    const size = 10;
    for (let i = 0; i < size; i += 1) {
      actions.add(null, 'push', i);
    }
    expect(actions.size).toBe(size);
  });

  test('size method', () => {
    actions.add(null, 'push', 10);
    expect(actions.size).toBe(1);
  });

  test('Action properties', () => {
    const value = 10;
    actions.add(null, 'push', value);
    const { action, data } = actions.actions[0].action;
    expect(action).toBe('push');
    expect(data).toBe(value);
  });
});
