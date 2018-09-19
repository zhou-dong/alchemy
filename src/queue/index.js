import Actions from '../commons/Actions';
import Queue from './Queue';
import Animate from './Animator';

export default class {
  constructor(container, actions) {
    this.queue = new Queue();
    this.actions = actions || new Actions();
    this.animator = new Animate(container);
  }

  peek() {
    this.addAction('peek');
    return this.queue.peek();
  }

  offer(item) {
    this.addAction('offer', item);
    this.queue.offer(item);
  }

  poll() {
    this.addAction('poll');
    return this.queue.poll();
  }

  get size() {
    return this.queue.size;
  }

  addAction(action, data) {
    this.actions.add(this.animator, action, data);
  }

  show(duration) {
    this.actions.play(duration);
  }
}
