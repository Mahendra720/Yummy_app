const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log("MongoDB connected"))
  .catch(err=> console.log("DB Error:", err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use('/api/address', require('./routes/addressRoutes'));
app.use("/api/payment", require("./routes/paymentRoutes"));



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
