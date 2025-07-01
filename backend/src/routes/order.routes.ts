import { Router } from "express";
import { createOrder,listOrders,getOrdersById, cancelOrder } from "../controllers/order.controllers";
import { authMiddleware } from "../middleware/auth.middleware";

const router:Router = Router()

router.route("/orders").post(authMiddleware,createOrder)
router.route("/orders").get(authMiddleware, listOrders)
router.route("/orders/:id").get(authMiddleware, getOrdersById)
router.route("/orders/:id").delete(authMiddleware, cancelOrder)