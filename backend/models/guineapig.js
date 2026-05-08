const mongoose = require('mongoose');

const GuineaPigSchema = new mongoose.Schema({
    name: { type: String, required: true },
    breed: { type: String },
    color: { type: String },
    birthDate: { type: Date },
    soldDate: { type: Date },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    notes: { type: String }
});

module.exports = mongoose.model('GuineaPig', GuineaPigSchema);