const API_BASE_URL = 'http://localhost:5000/api';

// Customers API
export const fetchCustomers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/customers`);
        if (!response.ok) throw new Error('Failed to fetch customers');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
};

export const createCustomer = async (customerData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Failed to create customer: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
};

export const getCustomerById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/customers/${id}`);
        if (!response.ok) throw new Error('Failed to fetch customer');
        return await response.json();
    } catch (error) {
        console.error('Error fetching customer:', error);
        throw error;
    }
};

// Orders API
export const createOrder = async (orderData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        if (!response.ok) throw new Error('Failed to create order');
        return await response.json();
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const fetchOrders = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        return await response.json();
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

// Guinea Pigs API
export const fetchGuineaPigs = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/guineapigs`);
        if (!response.ok) throw new Error('Failed to fetch guinea pigs');
        return await response.json();
    } catch (error) {
        console.error('Error fetching guinea pigs:', error);
        throw error;
    }
};

export const createGuineaPig = async (pigData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/guineapigs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pigData),
        });
        if (!response.ok) throw new Error('Failed to create guinea pig');
        return await response.json();
    } catch (error) {
        console.error('Error creating guinea pig:', error);
        throw error;
    }
};
