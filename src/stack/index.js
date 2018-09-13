import Actions from './Actions';
import Stack from './Stack';
import translate from './translate';

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

  show() {
    return translate(this.container, this.actions.actions, 1000);
  }
}
