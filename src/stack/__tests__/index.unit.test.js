import Index from '../index';

const size = 5;
const array = () => Array.from({ length: size }, (v, k) => k + 1);

describe('vis test', () => {
  test('create graphs', () => {
    const stack = new Index();
    array().forEach(item => stack.push(item));
    stack.createGraphs();
    // console.log(stack.snapshots);
    // console.log(stack.createGraphs());
  });

  test('create svgs', async () => {
    const stack = new Index();
    array().forEach(item => stack.push(item));
    const svgs = await stack.createSvgs();
    console.log(svgs.length);
  });
});