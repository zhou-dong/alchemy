
import Viz from 'viz.js';
import { Module, render } from 'viz.js/full.render';
import Stack from './Stack';

const viz = new Viz({ Module, render });

// viz.renderString("digraph { a -> b}")
//   .then(result => {
//     // console.log(result);
//   })
//   .catch(error => {
//     // Create a new Viz instance (@see Caveats page for more info)
//     viz = new Viz({ Module, render });

//     // Possibly display the error
//     console.error(error);
//   });

const createNodeStyle = (node) => {
  switch (node.action) {
    case 'push':
      return `${node.value}[style=filled,color=yellow,shape=circle]`;
    case 'peek':
      return `${node.value}[style=filled,color=red,shape=circle]`;
    default:
      return `${node.value}[style=filled,color=green,shape=circle]`;
  }
};

const createRelations = array => array.map(node => node.value).join('->');

const createGraphNodesStyles = array => array.map(node => createNodeStyle(node)).join(';');

const createGraph = (array) => {
  let graph = 'digraph { ';
  graph += createGraphNodesStyles(array);
  graph += ' ';
  graph += createRelations(array);
  return `${graph} }`;
};

const createSvg = async graph => viz.renderString(graph)
  .then(result => result.replace(/(\r\n\t|\n|\r\t)/gm, ''))
  .catch((error) => { throw error; });

export default class extends Stack {
  // play() {
  //     return this.stack
  // }

  async createSvgs() {
    return Promise.all(this.createGraphs().map(createSvg));
  }

  createGraphs() {
    return this.snapshots.map(createGraph);
  }
}
