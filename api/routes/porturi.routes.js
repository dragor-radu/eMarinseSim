import express from 'express';
import { getPorturi } from '../controllers/porturi.controller.js';

const router = express.Router();

router.get('/getPorturi', getPorturi)

export default router;