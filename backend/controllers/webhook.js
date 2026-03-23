import User from "../model/User.js";
import 'dotenv/config';
import { Webhook } from 'svix';

export const clerkWebhook = async (req, res) => {
    try {
        const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

        if (!WEBHOOK_SECRET) {
            throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env');
        }

        // Get the headers and body
        const headerPayload = req.headers;
        const payload = JSON.stringify(req.body);

        // Create a new Svix instance with your secret
        const wh = new Webhook(WEBHOOK_SECRET);

        let evt;

        // Verify the payload with the headers
        try {
            evt = wh.verify(payload, headerPayload);
        } catch (err) {
            console.error('Error verifying webhook:', err);
            return res.status(400).json({ success: false, message: 'Verification failed' });
        }

        // Get the ID and type
        const { data, type } = evt;

        // Handle the user.created event
        if (type === 'user.created') {
            const newUser = new User({
                _id: data.id,
                name: `${data.first_name} ${data.last_name}`,
                email: data.email_addresses[0].email_address,
                imageUrl: data.image_url,
            });

            await newUser.save();
            console.log('User saved to MongoDB ✅');
            return res.json({ success: true, message: 'User created' });
        }

        res.json({ success: true });

    } catch (error) {
        console.error('Webhook Error:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}