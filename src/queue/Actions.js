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

  offer(data) {
    addAction(this.actions, 'offer', data);
  }

  poll() {
    addAction(this.actions, 'poll');
  }

  get size() {
    return this.actions.length;
  }
}
