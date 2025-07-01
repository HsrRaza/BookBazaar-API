import {Router}  from "express"
import { authMiddleware } from "../middleware/auth.middleware"
import { addItemToCart, deleteItemFromCart, changeQuantity, getCart } from "../controllers/cart.controllers"

const router:Router = Router()

router.route("/").post(authMiddleware, addItemToCart)
router.route("/").delete(authMiddleware,deleteItemFromCart)
router.route("/").patch(authMiddleware,changeQuantity)
router.route("/").get(authMiddleware, getCart)

export default router 