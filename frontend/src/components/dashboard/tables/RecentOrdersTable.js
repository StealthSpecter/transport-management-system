import React from 'react';

const RecentOrdersTable = ({ orders }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Order ID</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Customer Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId} className="hover:bg-gray-100">
              <td className="px-4 py-2 text-sm text-gray-600">{order.orderId}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{order.customerName}</td>
              <td className="px-4 py-2 text-sm text-gray-600">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrdersTable;

