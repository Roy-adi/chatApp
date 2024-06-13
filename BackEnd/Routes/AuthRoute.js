import { Router } from "express";
import { getUsersForSidebar, login, logout, signup } from "../Controller/AuthController.js";
import protectRoute from "../MiddleWare/ProtectRoutes.js";


const router = Router()

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/getusers').get(protectRoute ,getUsersForSidebar)

export default router