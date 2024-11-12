import React from 'react';

const CardTitle = ({ children, className }) => (
  <h3 className={`font-semibold text-lg ${className}`}>
    {children}
  </h3>
);

export default CardTitle;

