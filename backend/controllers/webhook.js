import User from "../model/User.js";
import 'dotenv/config';
import {webhook} from 'svix';

export const clerkWebhook = async (req,res) => {
try {
    console.log("WEBHOOK HIT ✔ ");
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    const payload = req.body.toString();
    const headers = req.headers;

    const wh = new Webhook( WEBHOOK_SECRET);
}
catch (error) {

}
}