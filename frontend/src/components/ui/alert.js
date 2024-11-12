import React from 'react';

// Basic Alert component
export const Alert = ({ children, type = 'info' }) => {
  const alertStyles = {
    info: 'bg-blue-100 text-blue-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    success: 'bg-green-100 text-green-800',
  };

  return (
    <div className={`p-4 rounded ${alertStyles[type]}`}>
      {children}
    </div>
  );
};

// AlertDescription component
export const AlertDescription = ({ description }) => (
  <p className="text-sm text-gray-700 mt-2">
    {description}
  </p>
);

