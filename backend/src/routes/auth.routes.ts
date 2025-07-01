import { Router } from "express";

import {
    registerUser,
    verifyEmail,
    loginUser,
    logoutUser,
    getUser
    


} from "../controllers/auth.controllers"

const router: Router = Router()

router.route("/register").post(registerUser)
router.route("/register").post(loginUser)
router.route("/me").get(getUser)

