import React from 'react';
import Cell from './Cell'

const Notebook = () => {
  return (
    <div
      style={{
        height: '422px',
        width: '740px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflowY: 'auto',
        padding: '16px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Content will go here */}
      <Cell/>
    </div>
  );
};

export default Notebook;