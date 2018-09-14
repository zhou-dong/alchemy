import Actions from '../Actions';

let actions;

beforeEach(() => {
  actions = new Actions();
});

const getLastAction = () => {
  const array = actions.actions;
  return array[array.length - 1];
};

describe('Queue Actions size method', () => {
  test('empty actions', () => {
    expect(actions.size).toBe(0);
  });

  test('actions size after offer', () => {
    const size = 10;
    for (let i = 0; i < size; i += 1) {
      actions.offer(i);
    }
    expect(actions.size).toBe(size);
  });

  test('actions size after offer, poll, peek', () => {
    const offerSize = 10;
    for (let i = 0; i < offerSize; i += 1) {
      actions.offer(i);
    }
    const pollSize = 5;
    for (let i = 0; i < pollSize; i += 1) {
      actions.poll(i);
    }
    const peekSize = 10;
    for (let i = 0; i < peekSize; i += 1) {
      actions.peek(i);
    }
    expect(actions.size).toBe(offerSize + pollSize + peekSize);
  });
});

describe('Queue Actions offer, peek, poll method', () => {
  test('offer method', () => {
    const item = 10;
    actions.offer(item);
    expect(actions.size).toBe(1);
    const { action, data } = getLastAction();
    expect(action).toBe('offer');
    expect(data).toBe(item);
  });

  test('peek method', () => {
    actions.peek();
    expect(actions.size).toBe(1);
    const { action } = getLastAction();
    expect(action).toBe('peek');
  });

  test('poll method', () => {
    actions.poll();
    expect(actions.size).toBe(1);
    const { action } = getLastAction();
    expect(action).toBe('poll');
  });
});
