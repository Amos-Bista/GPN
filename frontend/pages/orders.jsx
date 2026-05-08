import React, { useState, useEffect } from 'react';
import { fetchCustomers, createOrder, fetchOrders } from '../api';
import Table from '../components/table';

const Orders = () => {
    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [items, setItems] = useState([{ name: '', quantity: 1, price: 0 }]);

    useEffect(() => {
        fetchCustomers()
            .then(customers => setCustomers(customers || []))
            .catch(err => console.error('Failed to load customers:', err));
    }, []);


    useEffect(() => {
        fetch()
    }, []);

    const fetch = async () => {
        fetchOrders()
            .then(data => {
                setOrders(Array.isArray(data) ? data : []);
                console.log('Fetched orders:', data);
            })
            .catch(err => console.error('Failed to load orders:', err));
    }

    const addItem = () => setItems([...items, { name: '', quantity: 1, price: 0 }]);

    const calculateTotal = () => items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = {
            customer: selectedCustomer,
            items: items.map(item => ({
                name: item.name,
                quantity: parseInt(item.quantity),
                price: parseFloat(item.price)
            })),
            totalAmount: calculateTotal()
        };
        try {
            await createOrder(orderData);
            alert('Order Created!');
            fetch()
            // Reset form
            setSelectedCustomer('');
            setItems([{ name: '', quantity: 1, price: 0 }]);
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create order');
        }
    };

    const columns = [
        { key: "_id", label: "Order ID" },
        {
            key: "createdAt",
            label: "Date",
            render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleString() : ''
        },
        {
            key: "customer",
            label: "Customer",
            render: (row) => {
                if (!row.customer) return 'N/A';
                return typeof row.customer === 'string' ? row.customer : row.customer.name || row.customer._id || 'N/A';
            }
        },
        {
            key: "items",
            label: "Items",
            render: (row) => Array.isArray(row.items)
                ? row.items.map(item => `${item.name} x${item.quantity}`).join(', ')
                : ''
        },
        { key: "totalAmount", label: "Total ($)" },
        { key: "status", label: "Status" }
    ];

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Create New Order</h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow">
                <label className="block mb-4">
                    Select Customer
                    <select className="w-full border p-2 mt-1" onChange={e => setSelectedCustomer(e.target.value)} required>
                        <option value="">Choose...</option>
                        {customers.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                </label>

                <h3 className="font-bold mb-2">Items</h3>
                {items.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input className="border p-2 flex-grow" placeholder="Item name" value={item.name} onChange={e => {
                            const newItems = [...items];
                            newItems[index].name = e.target.value;
                            setItems(newItems);
                        }} />
                        <input type="number" className="border p-2 w-20" placeholder="Qty" value={item.quantity} onChange={e => {
                            const newItems = [...items];
                            newItems[index].quantity = parseInt(e.target.value) || 1;
                            setItems(newItems);
                        }} />
                        <input type="number" className="border p-2 w-24" placeholder="Price" value={item.price} onChange={e => {
                            const newItems = [...items];
                            newItems[index].price = parseFloat(e.target.value) || 0;
                            setItems(newItems);
                        }} />
                    </div>
                ))}

                <button type="button" onClick={addItem} className="text-blue-500 mb-4">+ Add Item</button>
                <div className="text-xl font-bold mb-4">Total: ${calculateTotal()}</div>
                <button className="w-full bg-blue-600 text-white py-3 rounded">Submit Order</button>
            </form>

            <div style={{ padding: "20px" }}>
                <h2>Orders</h2>

                <Table columns={columns} data={orders} />
            </div>

        </div >
    );
};

export default Orders;