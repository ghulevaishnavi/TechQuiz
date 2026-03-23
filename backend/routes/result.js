import express from 'express';
import { CreatemyResult, getMyResults } from '../controllers/resultController.js';

const router = express.Router();

router.post("/save-result", CreatesmyResult);
router.get("/my-result", getMyResult);

export default router;