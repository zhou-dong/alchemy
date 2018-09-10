import cytoscape from 'cytoscape';

const initCytoscape = (container) => {
  // const cy = cytoscape({
  //   renderer: {
  //     name: 'null',
  //   },
  //   container,
  // elements: {
  //   nodes: [
  //     { data: { id: 'n1', foo: 'one', weight: 0.25 }, classes: 'odd one' },
  //     { data: { id: 'n2', foo: 'two', weight: 0.5 }, classes: 'even two' },
  //     { data: { id: 'n3', foo: 'three', weight: 0.75 }, classes: 'odd three' },
  //     { data: { id: 'n4', parent: 'n5', foo: 'bar' } },
  //     { data: { id: 'n5' } },
  //   ],

  //   edges: [
  //   //   { data: { id: 'n1n2', source: 'n1', target: 'n2', weight: 0.33 }, classes: 'uh' },
  //     { data: { id: 'n1n2', source: 'n1', target: 'n2' }, classes: 'uh' },
  //     { data: { id: 'n2n3', source: 'n2', target: 'n3' }, classes: 'huh' },
  //     { data: { id: 'n1n1', source: 'n1', target: 'n1' } },
  //   ],
  // },
  // });
  const cy = cytoscape({
    container: document.getElementById('alchemy'),
    scratch: { _foo: 'bar' },
    style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          'background-color': 'yellow',
          label: 'data(id)',
        },
      },
      {
        selector: 'edge',
        style: {
          width: 3,
          'arrow-scale': 2,
          'source-arrow-fill': 'filled',
          'line-color': 'red',
          'target-arrow-color': 'black',
          'target-arrow-shape': 'triangle-backcurve',
          'line-style': 'solid',
          'curve-style': 'bezier',
        },
      },
    ],
  });

  cy.zoomingEnabled(false);

  return cy;
};

const peek = (cy) => {
  const lastNode = cy.nodes().last();
  if (lastNode) {
    lastNode.style('background-color', 'cyan');
  }
  return cy;
};

const push = (cy, data) => {
  const lastNode = cy.nodes().last();
  const nodeId = `n${data}`;
  const edgeId = `e${data}`;
  if (lastNode && lastNode.position()) {
    const { x, y } = lastNode.position();
    return cy.add([
      { group: 'nodes', data: { id: nodeId }, position: { x: x + 100, y } },
      { group: 'edges', data: { id: edgeId, source: lastNode.id(), target: nodeId } },
    ]);
  }

  const x = 100;
  const y = 100;
  return cy.add([
    { group: 'nodes', data: { id: nodeId }, renderedPosition: { x, y } },
  ]);
};

const pop = (cy) => {
  cy.edges().last().remove();
  cy.nodes().last().remove();
  return cy;
};

const execute = (cy, i, actions) => {
  switch (actions[i].action) {
    case 'peek':
      peek(cy);
      break;
    case 'push':
      push(cy, actions[i].data);
      break;
    case 'pop':
      pop(cy);
      break;
    default:
      break;
  }
};

export default (container, actions, milliseconds) => {
  const cy = initCytoscape(container);
  // cy.add([
  //   { group: 'nodes', data: { id: 'nn0' }, position: { x: 100, y: 100 } },
  //   { group: 'nodes', data: { id: 'nn1' }, position: { x: 300, y: 200 } },
  //   { group: 'edges', data: { id: 'ee0', source: 'nn0', target: 'nn1' } },
  // ]);

  let i = 0;
  const interval = setInterval(() => {
    if (i === actions.length) {
      clearInterval(interval);
      return;
    }
    // console.log(cy.nodes.length);
    execute(cy, i, actions);
    i += 1;
  }, milliseconds);
};
