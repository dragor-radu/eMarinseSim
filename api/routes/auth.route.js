import express from 'express';
import { signin, signout, addAdmin } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signin", signin);
router.post("/addAdmin", addAdmin);
router.get("/signout", signout);

export default router;