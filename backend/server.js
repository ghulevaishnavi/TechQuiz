import dns from 'node:dns/promises';
dns.setServers(['8.8.8.8', '1.1.1.1']); // Forces Google DNS to fix connection issues

import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { clerkMiddleware } from '@clerk/express';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 4000;

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// ROUTES
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// DB CONNECTION
connectDB();

app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`);
});