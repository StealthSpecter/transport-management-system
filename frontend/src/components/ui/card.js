// src/components/ui/card.js

export const Card = ({ children }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return (
    <div className="p-4">
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return (
    <div className="mb-4">
      {children}
    </div>
  );
};

export const CardTitle = ({ children }) => {
  return (
    <h2 className="text-lg font-semibold text-gray-800">
      {children}
    </h2>
  );
};

