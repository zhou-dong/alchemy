import Actions from './commons/Actions';
import Stack from './stack';
import Queue from './queue';

export default class {
  constructor() {
    this.actions = new Actions();
  }

  play(duration) {
    this.actions.play(duration);
  }

  createStack(container) {
    return new Stack(container, this.actions);
  }

  createQueue(container) {
    return new Queue(container, this.actions);
  }
}
