import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchCustomers = async () => {
    const response = await API.get('/customers');
    return response.data;
};
export const fetchCustomer = async (id) => {
    const response = await API.get(`/customers/${id}`);
    return response.data;
};
export const createCustomer = async (data) => {
    const response = await API.post('/customers', data);
    return response.data;
};
export const createOrder = async (data) => {
    try {
        const response = await API.post('/orders', data);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Failed to create order');
    }
};
export const createGP = async (data) => {
    const response = await API.post('/guineapigs', data);
    return response.data;
};
export const fetchOrders = async () => {
    const response = await API.get('/orders');
    return response.data;
}; 