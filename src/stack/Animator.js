import cytoscape from 'cytoscape';
import { guid } from '../utils';

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
  // label: 'data(id)',
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
  const lastNode = cy.nodes().last();
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
    style,
    position,
  }
);

const createEdge = (id, source, target) => (
  { group: 'edges', data: { id, source, target } }
);

const push = (cy, data) => {
  const lastNode = cy.nodes().last();
  const label = `${data}`;
  const nodeId = guid();

  const { width, height } = dynamicWidthHeight(label);
  const style = { label, width, height };

  if (!lastNode || !(lastNode.position())) {
    return cy.add(createNode(nodeId, { x: width / 2, y: height / 2 }, style));
  }
  const { x, y } = lastNode.position();
  // const width = lastNode.width();
  return cy.add([
    createNode(nodeId, { x: x + width * 2, y }, style),
    createEdge(`e${nodeId}`, nodeId, lastNode.id()),
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

export default class {
  constructor(container) {
    this.cy = initCytoscape(container);
  }

  show(action, duration) {
    execute(this.cy, action, duration);
  }
}
