const createAction = (action, data) => {
  const result = { action };
  if (data !== undefined) {
    result.data = data;
  }
  return result;
};

const addAction = (actions, action, data) => {
  actions.push(createAction(action, data));
};

export default class {
  constructor() {
    this.actions = [];
  }

  peek() {
    addAction(this.actions, 'peek');
  }

  push(data) {
    addAction(this.actions, 'push', data);
  }

  pop() {
    addAction(this.actions, 'pop');
  }

  get size() {
    return this.actions.length;
  }
}
