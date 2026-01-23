import express from "express";
import { protectRoute } from "../middlwares/protectRoute.js";
import {getActiveSessions,getRecentSesions,getSessionById,createSession,endSession,joinSession} from "../controllers/sessionController.js"

const router = express.Router();

router.post("/",protectRoute,createSession);
router.get('/active',protectRoute,getActiveSessions);
router.get('/my-recent-session',protectRoute,getRecentSesions);
router.get("/:id",protectRoute,getSessionById);
router.post("/:id/join",protectRoute,joinSession);
router.post("/:id/end",protectRoute,endSession);

export default router;



