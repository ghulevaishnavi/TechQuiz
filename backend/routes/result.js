import express from 'express';
// Add this exact line below (don't forget the .js at the end!)
import { CreatemyResult } from '../controllers/resultController.js';

const router = express.Router();

// This line will now work because CreatemyResult is imported
router.post("/save-result", CreatemyResult);

export default router;