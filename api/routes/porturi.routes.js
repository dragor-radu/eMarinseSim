import express from 'express';
import { getPorturi, updatePort } from '../controllers/porturi.controller.js';


const router = express.Router();

router.get('/getPorturi', getPorturi)
router.post('/updatePort', updatePort)

export default router;