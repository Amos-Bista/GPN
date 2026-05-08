import React, { useEffect, useState } from 'react';
import { fetchCustomers, createCustomer } from '../api';
import { Link } from 'react-router-dom';
import Table from '../components/table';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' });
    // const [getcustomers, setGetCustomers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);


    // const getCustomers = async () => {
    //     try {
    //         const res = await fetch("http://localhost:5000/api/customers");

    //         if (!res.ok) {
    //             throw new Error("Failed to fetch customers");
    //         }
    //         // console.log("Response from server:", res);
    //         return await res.json();

    //     } catch (err) {
    //         console.error("Error fetching customers:", err);
    //         return [];
    //     }
    // };


    const fetchData = async () => {
        const data = await fetchCustomers();
        setCustomers(data);
        // console.log("Fetched customers:", data);

    };


    const loadCustomers = async () => {
        try {
            const customers = await fetchCustomers();
            setCustomers(customers || []);
        } catch (error) {
            console.error('Failed to load customers:', error);
            setCustomers([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCustomer(form);
            setForm({ name: '', phone: '', email: '', address: '' });
            fetchData();
            loadCustomers();

            alert('Customer created successfully!');
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const columns = [
        { key: "_id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "phone", label: "Phone" },
        { key: "email", label: "Email" },
        // { key: "address", label: "Address" }
    ];

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Customer Management</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <input className="border p-2 rounded" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                <input className="border p-2 rounded" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
                <input className="border p-2 rounded" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition">Add Customer</button>
            </form>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.map(c => (
                    <div key={c._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-700">{c.name}</h2>
                        <p className="text-gray-500">{c.phone}</p>
                        <div className="mt-4 flex justify-between items-center">
                            <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">Spent: ${c.totalSpent}</span>
                            <Link to={`/customers/${c._id}`} className="text-blue-500 hover:underline">View Details →</Link>
                        </div>
                    </div>
                ))}
            </div> */}


            <div style={{ padding: "20px" }}>
                <h2>Customers</h2>

                <Table columns={columns} data={customers} />
            </div>
        </div>
    );
};

export default Customers;