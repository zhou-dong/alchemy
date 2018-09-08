import assert from 'assert';

const addSnapshot = (collection, action, item) => {
  const { snapshots, data } = collection;
  const snapshot = { data: Array.from(data), action };
  if (item) {
    snapshot.item = item;
  }
  snapshots.push(snapshot);
};

export default class {
  constructor() {
    this.data = [];
    this.snapshots = [];
  }

  peek() {
    assert(this.size > 0, 'stack is empty');
    addSnapshot(this, 'peek');
    return this.data[this.data.length - 1];
  }

  push(item) {
    addSnapshot(this, 'push', item);
    this.data.push(item);
  }

  pop() {
    assert(this.size > 0, 'stack is empty');
    addSnapshot(this, 'pop');
    return this.data.pop();
  }

  get size() {
    return this.data.length;
  }
}
