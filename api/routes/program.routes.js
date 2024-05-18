import express from 'express';
import { getProgram } from '../controllers/program.controller.js';
const router = express.Router();

router.get('/getProgram', getProgram);

export default router;