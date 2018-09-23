import Graph, { flash } from '../commons/Graph';
import { dynamicWidthHeight } from '../utils';

const peek = ({ cy }, duration) => {
  const lastNode = cy.nodes().first();
  if (lastNode) {
    flash(lastNode, duration);
  }
};

const offer = (graph, data) => {
  const lastNode = graph.cy.nodes().last();
  const label = `${data}`;

  const { width, height } = dynamicWidthHeight(label);
  const style = { label, width, height };

  if (!lastNode || !(lastNode.position())) {
    graph.addNode({ x: width, y: graph.cy.height() / 2 }, style);
  } else {
    const { x, y } = lastNode.position();
    const nodeId = graph.addNode({ x: x + width * 2, y }, style);
    graph.addEdge(lastNode.id(), nodeId);
  }
};

const poll = (graph) => {
  const nodes = graph.cy.nodes().toArray();
  graph.removeEdges();
  graph.removeElements(nodes);
  graph.addElements(nodes.slice(1));
  graph.addEdges();
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
