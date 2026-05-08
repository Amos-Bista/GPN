const Order = require('../models/order');
const Customer = require('../models/customer');

exports.createOrder = async (req, res) => {
    try {
        const { customer, items, totalAmount, status } = req.body;

        // Validate customer exists
        const customerExists = await Customer.findById(customer);
        if (!customerExists) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        const order = new Order({
            customer,
            items,
            totalAmount,
            status: status || 'pending'
        });

        await order.save();

        // Update customer's totalSpent
        customerExists.totalSpent += totalAmount;
        await customerExists.save();

        // Populate customer data in response
        await order.populate('customer');
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('customer');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('customer');
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};