import Result from "../model/Result.js";
import { getAuth } from "@clerk/express";

// Create a result
export const CreatemyResult = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    // This creates a new entry in your Results collection
    const result = await Result.create({
      ...req.body, // This includes score, quizId, etc., from the frontend
      userId       // Attaches the Clerk User ID to the result
    });

    res.json(result);

  } catch (err) {
    console.log("CREATE RESULT ERROR:", err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}


//to get result for that logged-in user
export const getMyResults = async (req,res) => {
    const { userId } = getAuth(req);
    const results = await Result.find({ userId });

    res.json(results);
}