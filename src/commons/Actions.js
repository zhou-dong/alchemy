class Action {
  constructor(animator, action) {
    this.animator = animator;
    this.action = action;
  }

  show(duration) {
    this.animator.show(this.action, duration);
  }
}

export default class {
  constructor() {
    this.actions = [];
  }

  add(animator, action, data) {
    this.actions.push(new Action(animator, { action, data }));
  }

  play(duration) {
    let i = 0;
    const interval = setInterval(() => {
      if (i === this.actions.length) {
        clearInterval(interval);
        return;
      }
      this.actions[i].show(duration);
      i += 1;
    }, duration);
  }

  get size() {
    return this.actions.length;
  }
}
