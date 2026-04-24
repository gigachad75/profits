const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve Static Files
app.use(express.static(path.join(__dirname)));

// ✅ MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ✅ Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

// ✅ Mock routes for full product compatibility
const authMiddleware = require("./middleware/auth");

app.all("/api/v1/watchlist", authMiddleware, (req, res) => res.json({ success: true, watchlist: [] }));
app.all("/api/v1/onlywatchlist", authMiddleware, (req, res) => res.json({ success: true, watchlist: [] }));
app.all("/api/v1/tradeposition", authMiddleware, (req, res) => res.json({ success: true, positions: [] }));
app.all("/api/v1/chart", authMiddleware, (req, res) => res.json({ success: true, data: [] }));
app.all("/api/v1/execution", authMiddleware, (req, res) => res.json({ success: true, data: [] }));
app.all("/api/v1/ledger", authMiddleware, (req, res) => res.json({ success: true, data: [] }));
app.all("/api/v1/get", authMiddleware, (req, res) => res.json({ success: true, data: [] }));
app.all("/api/v1/Get", authMiddleware, (req, res) => res.json({ success: true, data: [] }));
app.all("/api/v1/chat", authMiddleware, (req, res) => res.json({ success: true, data: [] }));
app.all("/api/v1/addsltgt", authMiddleware, (req, res) => res.json({ success: true }));
app.all("/api/v1/limitmodify", authMiddleware, (req, res) => res.json({ success: true }));
app.all("/api/v1/marginsetting", authMiddleware, (req, res) => res.json({ success: true, data: {} }));
app.all("/api/v1/forgot", (req, res) => res.json({ success: true, message: "OTP sent!" }));
app.all("/api/v1/requestOTP", (req, res) => res.json({ success: true, message: "OTP sent!" }));
app.all("/api/v1/change", authMiddleware, (req, res) => res.json({ success: true }));
app.all("/api/v1/SubNotification", authMiddleware, (req, res) => res.json({ success: true }));
app.all("/api/v1/GetBkgExposure", authMiddleware, (req, res) => res.json({ success: true, data: {} }));
app.all("/api/v1/getLedgerReq", authMiddleware, (req, res) => res.json({ success: true, data: [] }));
app.all("/api/v1/getWithdrawalLimitInfo", authMiddleware, (req, res) => res.json({ success: true, data: {} }));
app.all("/api/v1/mytpipay", authMiddleware, (req, res) => res.json({ success: true, data: {} }));

// ✅ Catch all for Frontend Routing (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
