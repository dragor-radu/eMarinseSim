import express from 'express';
import { getNave } from '../controllers/nave.controller.js';

const router = express.Router();

router.get('/getNave', getNave);

export default router;