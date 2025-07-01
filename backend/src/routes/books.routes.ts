import { Router } from "express";
import { addBook, getAllBooks , getBookById, updateBook, deleteBook} from "../controllers/books.controllers";
import { authMiddleware } from "../middleware/auth.middleware";

const router:Router = Router()

router.route("/books").post(authMiddleware,addBook)
router.route("/books").get(authMiddleware, getAllBooks)
router.route("/books/:id").get(authMiddleware, getBookById)
router.route("/books/:id").patch(authMiddleware, updateBook)
router.route("/books/:id").delete(authMiddleware, deleteBook)