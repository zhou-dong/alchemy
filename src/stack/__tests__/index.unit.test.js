/* eslint-env browser */

import Index from '../index';

describe('main describe', () => {
  test('main test', () => {
    const index = new Index();
    for (let i = 0; i < 10; i += 1) {
      index.push(i);
    }
    document.body.innerHTML = '<div id="alchemy"></div>';
    const config = { container: document.getElementById('alchemy') };
    index.translate(config);
  });
});
