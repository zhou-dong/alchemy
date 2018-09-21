import Actions from '../commons/Actions';
import LinkedList from './LinkedList';
import Animator from './Animator';

export default class {
  constructor(container, actions) {
    this.list = new LinkedList();
    this.actions = actions || new Actions();
    this.animator = new Animator(container);
  }

  prepend(value) {
    this.addAction('prepend', null, value);
    return this.list.prepend(value);
  }

  append(value) {
    this.addAction('append', null, value);
    return this.list.append(value);
  }

  find(index) {
    this.addAction('find', index);
    return this.list.find(index);
  }

  insert(index, value) {
    this.addAction('insert', index, value);
    return this.list.insert(index, value);
  }

  deleteHead() {
    this.addAction('deleteHead');
    return this.list.deleteHead();
  }

  deleteTail() {
    this.addAction('deleteTail');
    return this.list.deleteTail();
  }

  remove(index) {
    this.addAction('remove', index);
    return this.list.remove(index);
  }

  addAction(action, index, value) {
    this.actions.addAction(this.animator, { action, index, value });
  }

  show(duration) {
    this.actions.play(duration);
  }
}
