import cytoscape from 'cytoscape';
import { guid } from '../utils';

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

const defaultStyle = [
  { selector: 'node', style: defaultNodeStyle },
  { selector: 'edge', style: defaultEdgeStyle },
];

const createEdge = (id, source, target, style) => (
  { group: 'edges', data: { id, source, target }, style }
);

const createNode = (id, position, style) => (
  {
    group: 'nodes',
    data: { id },
    style,
    position,
  }
);

export const flash = (node, duration) => {
  const color = node.style('background-color');
  node.style('background-color', 'orange');
  setTimeout(() => node.style('background-color', color), duration);
};

export default class {
  constructor(container, style) {
    this.cy = cytoscape({ container, style: style || defaultStyle });
    this.cy.zoomingEnabled(false);
  }

  addEdge(source, target, style) {
    const id = guid();
    this.cy.add(createEdge(id, source, target, style));
    return id;
  }

  addNode(position, style) {
    const id = guid();
    this.cy.add(createNode(id, position, style));
    return id;
  }

  removeElements(elements) {
    elements.forEach(element => this.cy.remove(element));
  }

  removeEdges(edges = this.cy.edges().toArray()) {
    this.removeElements(edges);
  }

  addElements(elements) {
    elements.forEach(element => this.cy.add(element));
  }

  addEdges(nodes = this.cy.nodes().toArray()) {
    nodes.forEach((node, i) => {
      if (i < nodes.length - 1) {
        this.addEdge(node.id(), nodes[i + 1].id());
      }
    });
  }
}
