import Graph, { flash } from '../commons/Graph';
import { dynamicWidthHeight } from '../utils';

const getNodeStyle = (value) => {
  const label = `${value}`;
  return Object.assign(dynamicWidthHeight(label), { label });
};

const addFirstNode = (graph, value) => {
  const style = getNodeStyle(value);
  const x = graph.cy.width() / 2;
  const y = graph.cy.height() / 2;
  graph.addNode({ x, y }, style);
};

const prependNode = (graph, value) => {
  const firstNode = graph.cy.nodes().first();
  const style = getNodeStyle(value);
  const { width } = style;
  const { cy } = graph;
  const { x, y } = firstNode.position();
  const position = { x: x - width * 2, y };
  const nodes = cy.nodes().toArray();
  // remove edges and nodes
  graph.removeElements(cy.edges().toArray());
  graph.removeElements(nodes);
  // prepend node, nodes, edges
  graph.addNode(position, style);
  graph.addElements(nodes);
  graph.addEdges();
};

const prepend = (graph, value) => {
  const firstNode = graph.cy.nodes().first();
  if (!firstNode || !(firstNode.position())) {
    addFirstNode(graph, value);
  } else {
    prependNode(graph, value);
  }
};

const appendNode = (graph, value) => {
  const lastNode = graph.cy.nodes().last();
  const style = getNodeStyle(value);
  const { width } = style;
  const { x, y } = lastNode.position();
  const nodeId = graph.addNode({ x: x + width * 2, y }, style);
  graph.addEdge(lastNode.id(), nodeId);
};

const append = (graph, value) => {
  const lastNode = graph.cy.nodes().last();
  if (!lastNode || !(lastNode.position())) {
    addFirstNode(graph, value);
  } else {
    appendNode(graph, value);
  }
};

const find = ({ cy }, index, duration) => {
  const node = (cy.nodes().toArray())[index];
  if (node) {
    flash(node, duration);
  }
};

const rearrange = (graph) => {
  const { cy } = graph;
  const { x, y } = cy.nodes().first().position();
  cy.nodes().toArray().forEach((node, i) => {
    const width = node.width();
    node.position({ x: x + i * 2 * width, y });
  });
};

const insertNodes = (graph, index, value) => {
  const style = getNodeStyle(value);
  const { cy } = graph;
  const nodes = cy.nodes().toArray();

  graph.removeElements(cy.edges().toArray());
  graph.removeElements(nodes);
  nodes.forEach((node, i) => {
    if (index === i) {
      graph.addNode({ x: 0, y: 0 }, style);
    }
    cy.add(node);
  });

  rearrange(graph);
  graph.addEdges();
};

const insert = (graph, index, value) => {
  if (index === 0) {
    prepend(graph, value);
    return;
  }
  const { length } = graph.cy.nodes();
  if (index > length || index < 0) {
    return;
  }
  if (index === length) {
    append(graph, value);
    return;
  }
  insertNodes(graph, index, value);
};

const deleteHead = (graph) => {
  const { cy } = graph;
  const nodes = cy.nodes().toArray();
  graph.removeElements(cy.edges().toArray());
  graph.removeElements(nodes);
  graph.addElements(nodes.slice(1));
  graph.addEdges();
};

const deleteTail = ({ cy }) => {
//   cy.edges().last().remove();
  cy.nodes().last().remove();
};

const remove = (graph, index) => {
  const { cy } = graph;
  const nodes = cy.nodes().toArray();
  graph.removeElements(cy.edges().toArray());
  graph.removeElements(nodes);
  nodes.forEach((node, i) => {
    if (i !== index) {
      cy.add(node);
    }
  });
  rearrange(graph);
  graph.addEdges();
};

const execute = (graph, { action, index, value }, duration) => {
  if (action === 'prepend') prepend(graph, value);
  else if (action === 'append') append(graph, value);
  else if (action === 'find') find(graph, index, duration);
  else if (action === 'insert') insert(graph, index, value);
  else if (action === 'deleteHead') deleteHead(graph);
  else if (action === 'deleteTail') deleteTail(graph);
  else if (action === 'remove') remove(graph, index);
};

export default class {
  constructor(container) {
    this.graph = new Graph(container);
  }

  show(action, duration) {
    execute(this.graph, action, duration);
  }
}
