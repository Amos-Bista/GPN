require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Load all models to ensure they're registered with Mongoose
require('./models/customer');
require('./models/guineapig');
require('./models/order');
require('./controllers/customerController');
require('./controllers/orderController');

const app = express();
app.use(cors());
app.use(express.json());

// Native MongoDB driver helper (optional)
// const { connectDB } = require('./db');
// connectDB().catch(console.error);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ MongoDB Connection Error:", err));

mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB Connected");
});

mongoose.connection.on("error", (err) => {
    console.log("❌ MongoDB Connection Error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.log("⚠️ MongoDB Disconnected");
});



app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/guineapigs', require('./routes/guineapigRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));