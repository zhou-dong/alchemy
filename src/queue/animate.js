import cytoscape from 'cytoscape';

const minWidth = 30;
const minHeight = 30;

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
  const lastNode = cy.nodes().first();
  if (!lastNode) return cy;
  const color = lastNode.style('background-color');
  lastNode.style('background-color', 'orange');
  setTimeout(() => lastNode.style('background-color', color), duration);
  return cy;
};

const dynamicWidthHeight = (obj) => {
  const len = obj.toString().length;
  const width = minWidth + len * 2;
  const height = minHeight + len * 2;
  return { width, height };
};

const createNode = (id, position, style) => (
  {
    group: 'nodes',
    data: { id },
    style: Object.assign(style, dynamicWidthHeight(id)),
    position,
  }
);

const createEdge = (id, source, target) => (
  { group: 'edges', data: { id, source, target } }
);

const offer = (cy, data) => {
  const lastNode = cy.nodes().last();
  const nodeId = `${data}`;
  if (!lastNode || !(lastNode.position())) {
    const { width, height } = dynamicWidthHeight(nodeId);
    return cy.add(createNode(nodeId, { x: width / 2, y: height / 2 }, {}));
  }
  const { x, y } = lastNode.position();
  const width = lastNode.width();
  return cy.add([
    createNode(nodeId, { x: x + width * 2, y }, {}),
    createEdge(`e${data}`, lastNode.id(), nodeId),
  ]);
};

const poll = (cy) => {
  const nodes = cy.nodes().toArray();
  const edges = cy.edges().toArray();
  // remove first node
  nodes.forEach(node => cy.remove(node));
  nodes.slice(1).forEach(node => cy.add(node));
  // remove first edge
  edges.forEach(edge => cy.remove(edge));
  edges.slice(1).forEach(edge => cy.add(edge));
  return cy;
};

const execute = (cy, { action, data }, duration) => {
  if (action === 'peek') peek(cy, duration / 2);
  else if (action === 'offer') offer(cy, data);
  else if (action === 'poll') poll(cy);
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
