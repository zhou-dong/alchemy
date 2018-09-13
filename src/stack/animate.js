import cytoscape from 'cytoscape';

const defaultEdgeStyle = {
  width: 1,
  'arrow-scale': 1,
  'line-color': 'gray',
  'target-arrow-color': 'black',
  'target-arrow-shape': 'triangle-backcurve',
  'line-style': 'solid',
  'curve-style': 'bezier',
};

const defaultNodeStyle = {
  label: 'data(id)',
  color: 'white',
  width: 30,
  height: 30,
  'text-halign': 'center',
  'text-valign': 'center',
  'background-color': 'green',
  'font-weight': 'normal',
};

const initCytoscape = (container) => {
  const style = [
    { selector: 'node', style: defaultNodeStyle },
    { selector: 'edge', style: defaultEdgeStyle },
  ];
  const cy = cytoscape({ container, style });
  cy.zoomingEnabled(false);
  return cy;
};

const peek = (cy, duration) => {
  const lastNode = cy.nodes().last();
  if (!lastNode) return cy;
  const color = lastNode.style('background-color');
  lastNode.style('background-color', 'orange');
  setTimeout(() => lastNode.style('background-color', color), duration);
  return cy;
};

const createNode = (id, position, style) => (
  {
    group: 'nodes',
    data: { id },
    position,
    style,
  }
);

const createEdge = (id, source, target) => (
  { group: 'edges', data: { id, source, target } }
);

const push = (cy, data) => {
  const lastNode = cy.nodes().last();
  const nodeId = `${data}`;
  if (!lastNode || !(lastNode.position())) {
    const { width, height } = defaultNodeStyle;
    return cy.add(createNode(nodeId, { x: width / 2 + 1, y: height / 2 + 1 }, {}));
  }
  const { x, y } = lastNode.position();
  const width = lastNode.width();
  return cy.add([
    createNode(nodeId, { x: x + width * 2, y }, {}),
    createEdge(`e${data}`, lastNode.id(), nodeId),
  ]);
};

const pop = (cy) => {
  cy.edges().last().remove();
  cy.nodes().last().remove();
  return cy;
};

const execute = (cy, { action, data }, duration) => {
  if (action === 'peek') peek(cy, duration / 2);
  else if (action === 'push') push(cy, data);
  else if (action === 'pop') pop(cy);
};

export default (container, actions, duration) => {
  const cy = initCytoscape(container);
  let i = 0;
  const interval = setInterval(() => {
    if (i === actions.length) {
      clearInterval(interval);
      return;
    }
    execute(cy, actions[i], duration);
    i += 1;
  }, duration);
};
