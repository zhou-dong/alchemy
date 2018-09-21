import LinkedList from '../LinkedList';

let linkedList;

beforeEach(() => {
  linkedList = new LinkedList();
});

describe('LinkedList', () => {
  test('append to empty LinkedList', () => {
    const value = 1;
    linkedList.append(value);
    expect(linkedList.head.value).toBe(value);
    expect(linkedList.tail.value).toBe(value);
  });

  test('append to LinkedList', () => {
    const size = 10;
    for (let i = 0; i < size; i += 1) {
      linkedList.append(i);
    }
    expect(linkedList.head.value).toBe(0);
    expect(linkedList.tail.value).toBe(size - 1);
  });

  test('prepend to empty LinkedList', () => {
    const value = 1;
    linkedList.prepend(value);
    expect(linkedList.head.value).toBe(value);
    expect(linkedList.tail.value).toBe(value);
  });

  test('prepend to LinkedList', () => {
    const size = 10;
    for (let i = 0; i < size; i += 1) {
      linkedList.prepend(i);
    }
    expect(linkedList.head.value).toBe(size - 1);
    expect(linkedList.tail.value).toBe(0);
  });

  test('insert into empty LinkedList', () => {
    const value = 10;
    linkedList.insert(0, value);
    expect(linkedList.head.value).toBe(value);
    expect(linkedList.tail.value).toBe(value);
  });

  test('insert into LinkedList', () => {
    const size = 10;
    for (let i = 0; i < size; i += 1) {
      linkedList.append(i);
    }
    const index = 3;
    const value = 100;
    linkedList.insert(index, value);
    expect(linkedList.find(index).value).toBe(value);
  });

  test('find head', () => {
    const size = 10;
    for (let i = 0; i < size; i += 1) {
      linkedList.append(i);
    }
    expect(linkedList.find(0).value).toBe(0);
  });

  test('find tail', () => {
    const size = 10;
    for (let i = 0; i < size; i += 1) {
      linkedList.append(i);
    }
    expect(linkedList.find(size - 1).value).toBe(size - 1);
  });

  test('find index', () => {
    const size = 10;
    for (let i = 0; i < size; i += 1) {
      linkedList.append(i);
    }
    for (let i = 0; i < size; i += 1) {
      expect(linkedList.find(i).value).toBe(i);
    }
  });

  test('find out of bound', () => {
    const size = 10;
    for (let i = 0; i < size; i += 1) {
      linkedList.append(i);
    }
    expect(linkedList.find(size)).toBe(null);
  });

  test('deleteHead in empty LinkedList', () => {
    expect(linkedList.deleteHead()).toBe(null);
  });

  test('deleteHead in LinkedList', () => {
    const size = 10;
    for (let i = 0; i < size; i += 1) {
      linkedList.append(i);
    }
    expect(linkedList.deleteHead().value).toBe(0);
    expect(linkedList.head.value).toBe(1);
  });

  test('deleteTail in empty LinkedList', () => {
    expect(linkedList.deleteTail()).toBe(null);
  });

  test('deleteTail', () => {
    const size = 10;
    for (let i = 0; i < size; i += 1) {
      linkedList.append(i);
    }
    expect(linkedList.deleteTail().value).toBe(size - 1);
    expect(linkedList.tail.value).toBe(size - 2);
  });

  test('delete', () => {
    const size = 10;
    for (let i = 0; i < size; i += 1) {
      linkedList.append(i);
    }
    expect(linkedList.delete(3).value).toBe(3);
    expect(linkedList.find(3).value).toBe(4);
  });
});
