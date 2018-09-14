import Actions from './Actions';
import Queue from './Queue';
import animate from './animate';

export default class {
  constructor(container) {
    this.queue = new Queue();
    this.actions = new Actions();
    this.container = container;
  }

  peek() {
    this.actions.peek();
    return this.queue.peek();
  }

  offer(item) {
    this.actions.offer(item);
    this.queue.offer(item);
  }

  poll() {
    this.actions.poll();
    return this.queue.poll();
  }

  get size() {
    return this.queue.size;
  }

  show(duration) {
    animate(this.container, this.actions.actions, duration);
  }
}
