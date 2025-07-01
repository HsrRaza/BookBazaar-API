import { Router } from "express";

import { addReviewtoBook, listReviewOfBook , deleteReview } from "../controllers/review.controllers";
import { authMiddleware } from "../middleware/auth.middleware";

const router:Router = Router();

router.route("/books/:bookId/reviews").post(authMiddleware,addReviewtoBook)
router.route("/books/:bookId/reviews").get(authMiddleware,listReviewOfBook)
router.route("/reviews/:id").delete(authMiddleware, deleteReview)
