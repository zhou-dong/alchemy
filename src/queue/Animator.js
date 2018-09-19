import Graph from '../commons/Graph';
import { dynamicWidthHeight } from '../utils';

const peek = ({ cy }, duration) => {
  const lastNode = cy.nodes().first();
  if (!lastNode) return;
  const color = lastNode.style('background-color');
  lastNode.style('background-color', 'orange');
  setTimeout(() => lastNode.style('background-color', color), duration);
};

const offer = (graph, data) => {
  const lastNode = graph.cy.nodes().last();
  const label = `${data}`;

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

const poll = ({ cy }) => {
  const nodes = cy.nodes().toArray();
  const edges = cy.edges().toArray();
  // remove first node
  nodes.forEach(node => cy.remove(node));
  nodes.slice(1).forEach(node => cy.add(node));
  // remove first edge
  edges.forEach(edge => cy.remove(edge));
  edges.slice(1).forEach(edge => cy.add(edge));
};

const execute = (graph, { action, data }, duration) => {
  if (action === 'peek') peek(graph, duration / 2);
  else if (action === 'offer') offer(graph, data);
  else if (action === 'poll') poll(graph);
};

export default class {
  constructor(container) {
    this.graph = new Graph(container);
  }

  show(action, duration) {
    execute(this.graph, action, duration);
  }
}
