import Viz from 'viz.js';
import { Module, render } from 'viz.js/full.render';
import Stack from './SnapshotsStack';

const viz = new Viz({ Module, render });

const defaultStyle = name => `${name}[style=filled,color=grey,shape=circle]`;
const peekStyle = name => `${name}[style=filled,color=yellow,shape=circle]`;
const pushStyle = name => `${name}[style=filled,color=green,shape=circle]`;
const popStyle = name => `${name}[style=filled,color=red,shape=circle]`;

const createRelations = (snapshot) => {
  const { data, item } = snapshot;
  const relations = data.join('->');
  if (!item) return relations;
  if (!relations.length) return item;
  return `${relations}->${item}`;
};

const createGraphNodesStyles = (snapshot) => {
  const { data, action, item } = snapshot;
  const styles = data.map(defaultStyle);
  switch (action) {
    case 'peek':
      styles[styles.length - 1] = peekStyle(data[data.length - 1]);
      break;
    case 'push':
      styles.push(pushStyle(item));
      break;
    case 'pop':
      styles[styles.length - 1] = popStyle(data[data.length - 1]);
      break;
    default:
      break;
  }
  return styles.join(';');
};

const createGraph = (snapshot) => {
  let graph = 'digraph { ';
  graph += createGraphNodesStyles(snapshot);
  graph += ' ';
  graph += createRelations(snapshot);
  return `${graph} }`;
};

const createSvg = async graph => viz.renderString(graph)
  .then(result => result.replace(/(\r\n\t|\n|\r\t)/gm, ''))
  .catch((error) => { throw error; });

export default class extends Stack {
  async createSvgs() {
    return Promise.all(this.createGraphs().map(createSvg));
  }

  createGraphs() {
    return this.snapshots.map(createGraph);
  }
}
