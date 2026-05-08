const Customer = require('../models/customer');

exports.createCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json(customer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate('guineapigs').populate('orders');
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id).populate('guineapigs').populate('orders');
        if (!customer) return res.status(404).json({ error: 'Not found' });
        res.json(customer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};