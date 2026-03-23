import { users } from "@clerk/clerk-sdk-node";
import User from "../model/User.js";
import 'dotenv/config';
import { Webhook } from 'svix';

export const clerkWebhook = async (req, res) => {
    try {
        console.log(" WEBHOOK HIT✔ ");
        const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
        
        // Ensure body is a string for Svix verification
        const payload = JSON.stringify(req.body); 
        const headers = req.headers;

        const wh = new Webhook(WEBHOOK_SECRET);
        const evt = wh.verify(payload, {
            "svix-id": headers["svix-id"],
            "svix-timestamp": headers["svix-timestamp"],
            "svix-signature": headers["svix-signature"],
        });

        const { type, data } = evt;
        console.log("EVENT TYPE:", type);

        if (type === "user.created") {
            // ERROR FIX: Correct property is .email_address
            const primaryEmail = data.email_addresses?.find(
                (e) => e.id === data.primary_email_address_id
            )?.email_address || "";

            const role = primaryEmail === "ghulevaishzzz2004@gmail.com"
                ? "admin" : "user";

            await User.findOneAndUpdate(
                { clerkId: data.id },
                {
                    clerkId: data.id,
                    email: primaryEmail,
                    // ERROR FIX: Used backticks (`) for template literals
                    fullName: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
                    role: role
                },
                { upsert: true, new: true }
            );
        }

        if (type === "session.created") {
            console.log("LOGIN DETECTED");
            await User.findOneAndUpdate(
                { clerkId: data.user_id },
                {
                    clerkId: data.user_id,
                    isLoggedIn: true
                },
                { upsert: true, new: true }
            );
        }

        if (type === "session.ended") {
            console.log("LOGOUT DETECTED");
            // ERROR FIX: Separated the Filter and the Update objects
            await User.findOneAndUpdate(
                { clerkId: data.user_id }, // Filter
                { isLoggedIn: false }      // Update
            );
        }

        if (type === "session.removed") {
            console.log("LOGOUT DETECTED");
            await User.findOneAndUpdate(
                { clerkId: data.user_id },
                { isLoggedIn: false }
            );
        }

        res.status(200).json({ success: true });

    } catch (err) {
        console.log("WEBHOOK ERROR:", err.message);
        res.status(400).json({
            error: "Webhook Error"
        });
    }
}