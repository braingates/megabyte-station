import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./scripts/db.js";

import authRoutes from "./scripts/auth.js";
import paymentRoutes from "./scripts/payment.js";
import adminRoutes from "./scripts/admin.js";


/*
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));

import orderRoutes from "./scripts/order.js";

app.use("/api", orderRoutes);

const res = await fetch("https://your-backend.com/api/buy-data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    phone: "024XXXXXXX",
    network: "MTN",
    bundle: "2GB",
    amount: 10
  })
});

const data = await res.json();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));



// Redirect to Paystack
window.location.href = data.paymentUrl;

const res = await fetch(`https://your-backend.com/api/status/${reference}`);
const data = await res.json();

console.log(data.deliveryStatus);

const express = require("express");
const app = express();
app.post("/pay", '...')


app.post("/track-order", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "No query provided" });
  }

  try {
    // Example using MongoDB
    const order = await Order.findOne({
      $or: [
        { orderId: query },
        { phone: query }
      ]
    });

    if (!order) {
      return res.json({ order: null });
    }

    res.json({
      order: {
        orderId: order.orderId,
        network: order.network,
        bundle: order.bundle,
        phone: order.phone,
        status: order.status
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


await Order.create({
  orderId: "ORD-" + Date.now(),
  phone,
  network,
  bundle,
  amount,
  status: "pending"
});

mongoose.connect(process.env.MONGO_URI)

app.use(cors());


https://your-api.onrender.com/track-order





app.post("/track-order", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "No query" });
  }

  try {
    // Normalize phone (VERY IMPORTANT)
    let formattedQuery = query.trim();

    if (formattedQuery.startsWith("+233")) {
      formattedQuery = "0" + formattedQuery.slice(4);
    }

    const order = await Order.findOne({
      $or: [
        { orderId: query },
        { phone: query },
        { phone: formattedQuery }
      ]
    });

    if (!order) {
      return res.json({ order: null });
    }

    res.json({
      order: {
        orderId: order.orderId,
        phone: order.phone,
        network: order.network,
        bundle: order.bundle,
        status: order.status
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



app.post("/create-order", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: "Failed to save order" });
  }
});

app.listen(5000) */


require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: "https://your-frontend-name.netlify.app",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

const PAYSTACK_SECRET = process.env.sk_test_ed37b618bded8755bd24369a777a66dd9b7749b3;

// ==========================
// INITIATE PAYMENT
// ==========================

require("dotenv").config();
app.post("/pay", async (req, res) => {
  try {
    const { email, amount, phone, network } = req.body;

    if (!email || !amount) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: Math.round(amount * 100), // convert to kobo/pesewas
        metadata: {
          phone,
          network
        }
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Payment initialization failed" });
  }
});

// ==========================
// VERIFY PAYMENT (IMPORTANT)
// ==========================
app.get("/verify/:reference", async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`
        }
      }
    );

    res.json(response.data);

  } catch (err) {
    res.status(500).json({ error: "Verification failed" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

//https://yourdomain.com/pay
status: "pending"
status: "paid"

const API_BASE =
  location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://your-backend-url.com";


    const mongoose = require("mongoose");

mongoose.connect(process.env. al-pcJFJFVQJuUBYQvQxKXkHp0HTbxbIKNxQnJ-HNHYCT7)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("MongoDB error:", err));

  app.post("/pay", async (req, res) => {
  try {
    // your payment logic here

    res.json({ success: true });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Payment failed"
    });
  }
});


app.listen(5000, () => console.log("Server running on port 5000"));

app.get("/", (req, res) => {
  res.send("Backend is alive ✅");
});

app.get("/", (req, res) => {
  res.send("Backend is alive ✅");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

/* ==========================
   MONGODB CONNECTION
========================== */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.error("MongoDB error:", err));

/* ==========================
   ORDER MODEL
========================== */
const OrderSchema = new mongoose.Schema({
  orderId: String,
  phone: String,
  network: String,
  bundle: String,
  amount: Number,
  status: {
    type: String,
    default: "pending" // pending, success, failed
  },
  reference: String
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);

/* ==========================
   PAYSTACK INIT PAYMENT
========================== */
app.post("/pay", async (req, res) => {
  try {
    const { email, amount, phone, network, bundle } = req.body;

    if (!email || !amount || !phone) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const reference = "ORD-" + Date.now();

    // Save order BEFORE payment
    const newOrder = await Order.create({
      orderId: reference,
      phone,
      network,
      bundle,
      amount,
      reference
    });

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // convert to pesewas
        reference,
        callback_url: `${process.env.BASE_URL}/verify/${reference}`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);

  } catch (err) {
    console.error("PAY ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Payment initialization failed" });
  }
});

/* ==========================
   VERIFY PAYMENT
========================== */
app.get("/verify/:reference", async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    const data = response.data.data;

    if (data.status === "success") {
      await Order.findOneAndUpdate(
        { reference },
        { status: "success" }
      );

      return res.send("Payment successful ✅");
    } else {
      await Order.findOneAndUpdate(
        { reference },
        { status: "failed" }
      );

      return res.send("Payment failed ❌");
    }

  } catch (err) {
    console.error(err);
    res.send("Verification error");
  }
});

/* ==========================
   ORDER TRACKING
========================== */
app.post("/track-order", async (req, res) => {
  const { query } = req.body;

  try {
    const order = await Order.findOne({
      $or: [
        { orderId: query },
        { phone: query }
      ]
    });

    if (!order) {
      return res.json({ status: null });
    }

    res.json({
      status: order.status,
      network: order.network,
      bundle: order.bundle,
      phone: order.phone
    });

  } catch (err) {
    res.status(500).json({ error: "Tracking error" });
  }
});

/* ==========================
   SERVER
========================== */
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} 🚀`);
});


const cors = require("cors");

app.use(cors({
  origin: [
    "http://127.0.0.1:5000",
    "http://localhost:5000"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(cors());

const API_BASE_URL = "https://megabyte-api.onrender.com";

app.post("/pay") 

/*await fetch(`${API_BASE_URL}/pay`, {
  method: "POST",

app.use(cors());
app.use(express.json());*/






let orders = [];

app.post("/create-order", (req, res) => {
  const { phone, network, bundle, amount } = req.body;

  const order = {
    id: "ORD-" + Date.now(),
    phone,
    network,
    bundle,
    amount,
    paymentStatus: "pending",
    deliveryStatus: "pending",
    createdAt: new Date()
  };

  orders.push(order);

  res.json(order);
});

app.post("/pay", async (req, res) => {
  const { email, amount, phone, orderId } = req.body;

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100,
        metadata: { orderId, phone }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});


app.post("/webhook", async (req, res) => {
  const event = req.body;

  if (event.event === "charge.success") {
    const orderId = event.data.metadata.orderId;

    const order = orders.find(o => o.id === orderId);

    if (!order) return res.sendStatus(200);

    // ✅ MARK AS PAID
    order.paymentStatus = "completed";

    // ✅ NOW PROCESS VENDOR
    processOrder(order);
  }

  res.sendStatus(200);
});


import { vendors } from "./vendors.js";

async function processOrder(order) {
  const vendorList = vendors[order.network];

  // Sort by cheapest price
  const sorted = vendorList.sort((a, b) => {
    return a.priceMap[order.bundle] - b.priceMap[order.bundle];
  });

  for (const vendor of sorted) {
    try {
      const plan = vendor.bundleMap[order.bundle];

      const res = await axios.post(
        vendor.url,
        {
          phone: order.phone,
          plan
        },
        {
          headers: { Authorization: `Bearer ${vendor.key}` }
        }
      );

      // SUCCESS
      order.deliveryStatus = "delivered";
      order.vendorUsed = vendor.name;

      return;

    } catch (err) {
      console.log(`Vendor ${vendor.name} failed`);
    }
  }

  // ALL FAILED
  order.deliveryStatus = "failed";
}



setInterval(() => {
  console.log("Checking pending orders...");

  orders.forEach(order => {
    if (order.paymentStatus === "completed" && order.deliveryStatus === "pending") {
      processOrder(order);
    }
  });

}, 60000);


app.post("/track-order", (req, res) => {
  const { query } = req.body;

  const order = orders.find(o =>
    o.id === query || o.phone === query
  );

  if (!order) {
    return res.json({ status: null });
  }

  res.json({
    status: order.deliveryStatus,
    network: order.network,
    bundle: order.bundle,
    phone: order.phone
  });
});




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(cors({
  origin: "https://your-frontend-url.netlify.app"
}));

app.use(express.json());