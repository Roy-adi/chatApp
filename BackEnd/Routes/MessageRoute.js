import { Router } from "express";
import { GetConversation, SendMessage } from "../Controller/MessageController.js";
import protectRoute from "../MiddleWare/ProtectRoutes.js";

const router = Router();

router.route("/send/:id").post(protectRoute, SendMessage);
router.route("/:id").get(protectRoute, GetConversation);

export default router;
