import Actions from '../commons/Actions';
import Stack from './Stack';
import Animator from './Animator';

export default class {
  constructor(container, actions) {
    this.stack = new Stack();
    this.actions = actions || new Actions();
    this.animator = new Animator(container);
  }

  peek() {
    this.addAction('peek');
    return this.stack.peek();
  }

  push(item) {
    this.addAction('push', item);
    this.stack.push(item);
  }

  pop() {
    this.addAction('pop');
    return this.stack.pop();
  }

  get size() {
    return this.stack.size;
  }

  addAction(action, data) {
    this.actions.add(this.animator, action, data);
  }

  show(duration) {
    this.actions.play(duration);
  }
}
