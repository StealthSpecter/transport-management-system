import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const OrderSummaryCard = ({ order }) => {
  // Add default value if order is undefined
  if (!order) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Loading order details...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Total: ${order.total}</p>
        {/* Add other order details here */}
      </CardContent>
    </Card>
  );
};

export default OrderSummaryCard;
