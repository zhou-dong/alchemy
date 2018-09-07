import assert from 'assert';
import SnapshotNode from './SnapshotNode';

const getLastSnapshot = snapshots => snapshots[snapshots.length - 1]
  .map(item => new SnapshotNode(item.value, null));

const addPeekSnapshot = (snapshots) => {
  const snapshot = getLastSnapshot(snapshots);
  snapshot[snapshot.length - 1].action = 'peek';
  snapshots.push(snapshot);
};

const addPopSnapshot = (snapshots) => {
  const snapshot = getLastSnapshot(snapshots);
  snapshot.pop();
  if (snapshot.length > 0) {
    snapshots.push(snapshot);
  }
};

const addPushSnapshot = (item, snapshots) => {
  const newNode = new SnapshotNode(item, 'push');
  if (snapshots.length === 0) {
    snapshots.push([newNode]);
  } else {
    const snapshot = getLastSnapshot(snapshots);
    snapshot.push(newNode);
    snapshots.push(snapshot);
  }
};

export default class {
  constructor() {
    this.data = [];
    this.snapshots = [];
  }

  peek() {
    assert(this.size > 0, 'stack is empty');
    const { data } = this;
    addPeekSnapshot(this.snapshots);
    return data[data.length - 1];
  }

  push(item) {
    this.data.push(item);
    addPushSnapshot(item, this.snapshots);
  }

  pop() {
    assert(this.size > 0, 'stack is empty');
    const value = this.data.pop();
    addPopSnapshot(this.snapshots);
    return value;
  }

  get size() {
    return this.data.length;
  }
}
