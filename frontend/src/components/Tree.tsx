import React from 'react';
import Tree from 'react-d3-tree';

const treeData = [
  {
    name: 'Root',
    children: [
      {
        name: 'Child 1',
        children: [
          { name: 'Grandchild 1' },
          { name: 'Grandchild 2' },
        ],
      },
      { name: 'Child 2' },
    ],
  },
];

const TreeGraph = () => {
  return <Tree data={treeData} />;
};

export default TreeGraph;
