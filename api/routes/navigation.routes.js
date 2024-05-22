import express from 'express';
import { startProgramCheck } from '../controllers/navigation.controller.js';
const router = express.Router();

router.post('/startProgramCheck', startProgramCheck);

export default router;