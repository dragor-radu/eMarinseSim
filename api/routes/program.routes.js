import express from 'express';
import { getProgram, addProgram, deleteProgram } from '../controllers/program.controller.js';
const router = express.Router();

router.get('/getProgram', getProgram);
router.post('/addProgram', addProgram);
router.delete('/deleteProgram', deleteProgram);

export default router;