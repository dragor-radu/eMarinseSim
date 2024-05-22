import express from 'express';
import { getNave } from '../controllers/nave.controller.js';
import { updateNave } from '../controllers/nave.controller.js';

const router = express.Router();

router.get('/getNave', getNave);
router.post('/updateNave', updateNave);

export default router;