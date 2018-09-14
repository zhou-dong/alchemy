export default class {
  constructor() {
    this.data = [];
  }

  peek() {
    return this.data[0];
  }

  offer(item) {
    this.data.push(item);
  }

  poll() {
    return this.data.shift();
  }

  get size() {
    return this.data.length;
  }
}
