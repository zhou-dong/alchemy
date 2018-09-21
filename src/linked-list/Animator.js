import Graph from '../commons/Graph';
import { dynamicWidthHeight } from '../utils';

const flash = (node, duration) => {
  if (!node) return;
  const color = node.style('background-color');
  node.style('background-color', 'orange');
  setTimeout(() => node.style('background-color', color), duration);
};

const removeElements = (cy, elements) => {
  elements.forEach(element => cy.remove(element));
};

const addElements = (cy, elements) => {
  elements.forEach(element => cy.add(element));
};

const addEdges = (graph, nodes) => {
  nodes.forEach((node, i) => {
    if (i < nodes.length - 1) {
      graph.addEdge(node.id(), nodes[i + 1].id());
    }
  });
};

const prependNode = (graph, firstNode, width, style) => {
  const { cy } = graph;
  const { x, y } = firstNode.position();
  const position = { x: x - width * 2, y };
  const nodes = cy.nodes().toArray();
  // remove edges and nodes
  removeElements(cy, cy.edges().toArray());
  removeElements(cy, nodes);
  // prepend node, nodes, edges
  graph.addNode(position, style);
  addElements(cy, nodes);
  addEdges(graph, cy.nodes().toArray());
};

const prepend = (graph, value) => {
  const firstNode = graph.cy.nodes().first();
  const label = `${value}`;

  const { width, height } = dynamicWidthHeight(label);
  const style = { label, width, height };

  if (!firstNode || !(firstNode.position())) {
    graph.addNode({ x: width / 2 + 250, y: height / 2 }, style);
  } else {
    prependNode(graph, firstNode, width, style);
  }
};

const append = (graph, value) => {
  const lastNode = graph.cy.nodes().last();
  const label = `${value}`;

  const { width, height } = dynamicWidthHeight(label);
  const style = { label, width, height };

  if (!lastNode || !(lastNode.position())) {
    graph.addNode({ x: width / 2, y: height / 2 }, style);
  } else {
    const { x, y } = lastNode.position();
    const nodeId = graph.addNode({ x: x + width * 2, y }, style);
    graph.addEdge(lastNode.id(), nodeId);
  }
};

const find = ({ cy }, index, duration) => {
  const node = (cy.nodes().toArray())[index];
  flash(node, duration);
};

const insert = (graph, index, value) => {
  if (index === 0) {
    prepend(graph, value);
    return;
  }
  const { cy } = graph;
  const nodes = cy.nodes().toArray();
  if (index >= nodes.length) {
    return;
  }
  if (index === nodes.length - 1) {
    append(graph, value);
    return;
  }

  removeElements(cy, nodes);

  const label = `${value}`;
  const { width, height } = dynamicWidthHeight(label);
  const style = { label, width, height };

  nodes.forEach((node, i) => {
    if (index === i) {
      graph.addNode({ x: 1, y: 1 }, style);
    }
    cy.add(node);
  });

  const first = cy.nodes().first();
  const { x, y } = first.position();

  cy.nodes().toArray().forEach((node, i) => {
    node.position({ x: x + i * 2 * width, y });
  });

  addEdges(graph, cy.nodes().toArray());
};

const deleteHead = (graph) => {
  const { cy } = graph;
  const nodes = cy.nodes().toArray();
  removeElements(cy, cy.edges().toArray());
  removeElements(cy, nodes);
  addElements(cy, nodes.slice(1));
  addEdges(graph, cy.nodes().toArray());
};

const deleteTail = ({ cy }) => {
//   cy.edges().last().remove();
  cy.nodes().last().remove();
};

const remove = (graph, index) => {
  const { cy } = graph;
  const nodes = cy.nodes().toArray();
  removeElements(cy, cy.edges().toArray());
  removeElements(cy, nodes);
  nodes.forEach((node, i) => {
    if (i !== index) {
      cy.add(node);
    }
  });
  addEdges(graph, cy.nodes().toArray());
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
