import express from 'express';
import { getRuta } from '../controllers/rute.controller.js';
const router = express.Router();

router.get('/getRuta', getRuta);

export default router;