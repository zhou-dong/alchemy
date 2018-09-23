import Graph, { flash } from '../commons/Graph';
import { dynamicWidthHeight } from '../utils';

const peek = ({ cy }, duration) => {
  const lastNode = cy.nodes().last();
  if (!lastNode) return;
  flash(lastNode, duration);
};

const push = (graph, data) => {
  const label = `${data}`;
  const { width, height } = dynamicWidthHeight(label);
  const style = { label, width, height };

  const lastNode = graph.cy.nodes().last();
  if (!lastNode || !(lastNode.position())) {
    graph.addNode({ x: width, y: graph.cy.height() / 2 }, style);
  } else {
    const { x, y } = lastNode.position();
    const nodeId = graph.addNode({ x: x + width * 2, y }, style);
    graph.addEdge(nodeId, lastNode.id());
  }
};

const pop = ({ cy }) => {
  cy.edges().last().remove();
  cy.nodes().last().remove();
};

const execute = (graph, { action, data }, duration) => {
  if (action === 'peek') peek(graph, duration / 2);
  else if (action === 'push') push(graph, data);
  else if (action === 'pop') pop(graph);
};

export default class {
  constructor(container) {
    this.graph = new Graph(container);
  }

  show(action, duration) {
    execute(this.graph, action, duration);
  }
}
