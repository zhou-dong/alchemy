import Actions from './Actions';
import Stack from './Stack';
import animate from './animate';

export default class {
  constructor(container) {
    this.stack = new Stack();
    this.actions = new Actions();
    this.container = container;
  }

  peek() {
    this.actions.peek();
    return this.stack.peek();
  }

  push(item) {
    this.actions.push(item);
    this.stack.push(item);
  }

  pop() {
    this.actions.pop();
    return this.stack.pop();
  }

  get size() {
    return this.stack.size;
  }

  show(duration) {
    return animate(this.container, this.actions.actions, duration);
  }
}
