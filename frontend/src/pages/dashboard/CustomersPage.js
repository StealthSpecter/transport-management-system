import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, [searchTerm]);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`/api/customers?search=${searchTerm}`);
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <input
          type="search"
          placeholder="Search customers..."
          className="rounded-md border border-gray-300 px-3 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {customers.map((customer) => (
          <Card key={customer.id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{customer.name}</h3>
                <p className="text-sm text-gray-500">{customer.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Joined: {new Date(customer.joinDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">Orders: {customer.totalOrders}</p>
                <p className="text-sm text-gray-500">
                  Total Spent: ${customer.totalSpent}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default CustomersPage;
