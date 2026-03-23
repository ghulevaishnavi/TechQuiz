import express from 'express';
import { clerkWebhook } from '../controllers/webhook.js';

const router = express.Router();

// We use express.raw so the webhook can verify the signature correctly
router.post("/webhook/clerk", 
    express.raw({ type: "application/json" }), 
    clerkWebhook
);

export default router;