class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

export default class {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(value) {
    const newNode = new Node(value, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    return this;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }

  find(index) {
    if (!this.head) {
      return null;
    }
    let current = this.head;
    for (let i = 0; i < index && current; i += 1) {
      current = current.next;
    }
    return current;
  }

  insert(index, value) {
    if (index === 0) {
      return this.prepend(value);
    }
    const previous = this.find(index - 1);
    if (!previous) {
      return null;
    }
    const newNode = new Node(value, previous.next);
    previous.next = newNode;
    return newNode;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }
    const { head } = this;
    if (!this.head.next) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }
    return head;
  }

  deleteTail() {
    if (!this.tail) {
      return null;
    }
    const { tail } = this;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return tail;
    }
    let current = this.head;
    while (current.next !== tail) {
      current = current.next;
    }
    current.next = null;
    this.tail = current;
    return tail;
  }

  remove(index) {
    if (index === 0) {
      return this.deleteHead();
    }
    const previous = this.find(index - 1);
    if (!previous) {
      return null;
    }
    const deleted = previous.next;
    if (deleted) {
      previous.next = previous.next.next;
    }
    return deleted;
  }
}
