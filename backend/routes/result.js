import express from 'express';
import { CreatesmyResult, getMyResult } from '../controllers/resultController';

const router = express.Router();

router.post("/save-result", CreatesmyResult);
router.get("/my-result", getMyResult);

export default router;