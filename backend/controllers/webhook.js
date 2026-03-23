import User from "../model/User.js";
import 'dotenv/config';
import { Webhook } from 'svix';

export const clerkWebhook = async (req, res) => {
    try {
        console.log(" WEBHOOK HIT✔ ");
        const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
        const payload = req.body.toString();
        const headers = req.headers;

        const wh = new Webhook(WEBHOOK_SECRET);
        const evt = wh.verify(payload, {
            "svix-id": headers["svix-id"],
            "svix-timestamp": headers["svix-timestamp"],
            "svix-signature": headers["svix-signature"],
        });
        const { type, data } = evt;
        console.log("EVENT TYPE:", type);
    }

    catch (error) {

    }
}