import BasicStack from './BasicStack';

const addSnapshot = (collection, action, item) => {
  const { snapshots, data } = collection;
  const snapshot = { data: Array.from(data), action };
  if (item) {
    snapshot.item = item;
  }
  snapshots.push(snapshot);
};

export default class extends BasicStack {
  constructor() {
    super();
    this.snapshots = [];
  }

  peek() {
    addSnapshot(this, 'peek');
    return super.peek();
  }

  push(item) {
    addSnapshot(this, 'push', item);
    super.push(item);
  }

  pop() {
    addSnapshot(this, 'pop');
    return super.pop();
  }
}
