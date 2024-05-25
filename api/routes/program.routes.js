import express from 'express';
import { getProgram, addProgram, deleteProgram } from '../controllers/program.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/getProgram', getProgram);
router.post('/addProgram/:id', verifyToken, addProgram);
router.delete('/deleteProgram', deleteProgram);

export default router;