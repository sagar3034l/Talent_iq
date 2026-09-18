import {Router} from 'express'
import { executeCode } from '../controllers/codeController.js';

const router = Router();


router.post("/",executeCode)

export default router