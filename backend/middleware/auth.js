import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import User from '../model/User.js';

export const protect = ClerkExpressWithAuth();

export const isAdmin = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId;
    
    // Find the user in your MongoDB by their Clerk ID
    const user = await User.findOne({ clerkId: clerkId });

    if (user && user.role === 'admin') {
      next(); // User is admin, allow them to proceed
    } else {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};