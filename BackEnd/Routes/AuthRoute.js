import { Router } from "express";
import {   getUsersForSidebar, login, logout, signup } from "../Controller/AuthController.js";
import protectRoute from "../MiddleWare/ProtectRoutes.js";
import { acceptFriendRequest, getFriendRequests, getFriends, searchFriend, sendFriendRequest } from "../Controller/FriendShipController.js";


const router = Router()

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/getusers').get(protectRoute ,getUsersForSidebar)

router.route('/friends').get(protectRoute ,getFriends)
router.route('/send-friend-request').post(protectRoute ,sendFriendRequest)
router.route('/friend-requests').get(protectRoute ,getFriendRequests)
router.route('/accept-friend-request').post(protectRoute ,acceptFriendRequest)

router.route('/searchFriend').post(protectRoute ,searchFriend)


export default router