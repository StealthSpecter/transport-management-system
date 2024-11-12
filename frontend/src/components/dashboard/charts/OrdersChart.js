import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
export const OrdersChart = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>Orders Overview</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

