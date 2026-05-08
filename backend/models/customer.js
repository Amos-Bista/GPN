const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String },
    address: { type: String },
    totalSpent: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

CustomerSchema.virtual('guineapigs', {
    ref: 'GuineaPig',
    localField: '_id',
    foreignField: 'owner'
});

CustomerSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'customer'
});

module.exports = mongoose.model('Customer', CustomerSchema);