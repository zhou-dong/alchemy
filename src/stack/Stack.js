import SnapshotNode from "./SnapshotNode"

export default class {
    constructor() {
        this.data = [];
        this.snapshots = [];
    }

    peek() {
        this._assertEmpty();
        const data = this.data;
        this._addPeekSnapshot();
        return data[data.length - 1];
    }

    push(item) {
        this.data.push(item);
        this._addPushSnapshot(item);
    }

    pop() {
        this._assertEmpty();
        const value = this.data.pop()
        this._addPopSnapshot()
        return value;
    }

    get size() {
        return this.data.length;
    }

    _addPeekSnapshot(){
        const snapshot = this._getLastSnapshot();
        snapshot[snapshot.length - 1].action = "peek";
        this.snapshots.push(snapshot);
    }

    _addPushSnapshot(item) {
        const snapshots = this.snapshots;
        const newNode = new SnapshotNode(item, "push");
        if (snapshots.length === 0) {
            snapshots.push([newNode]);
        } else {
            const snapshot = this._getLastSnapshot();
            snapshot.push(newNode);
            snapshots.push(snapshot);
        }
    }

    _addPopSnapshot() {
        const snapshot = this._getLastSnapshot();
        snapshot.pop();
        if(snapshot.length > 0){
            this.snapshots.push(snapshot);
        }
    }

    _getLastSnapshot() {
        const snapshots = this.snapshots;
        return snapshots[snapshots.length - 1].map(item => new SnapshotNode(item.value, null));
    }   

    _assertEmpty() {
        if (this.size === 0){
            throw "stack is empty";
        }
    }
}
