import { Router } from "express";
import {
	createBook,
	updateBook,
	deleteBook,
    bookStatus,
    getBookById,
	getAllBooks,
} from "./book.controller.ts";
import upload from "../middlewares/multer.middleware.ts";
const router = Router();

router.get("/", getAllBooks);
router.get("/:bookId", getBookById);
router.post("/",upload.fields([{name:"coverImage",maxCount:1},{name:"file",maxCount:1}]) ,createBook);
router.patch("/update/:bookId",upload.fields([{name:"coverImage",maxCount:1},{name:"file",maxCount:1}]) ,updateBook);
router.patch("/disable/:bookId", bookStatus);
router.delete("/delete/:bookId",deleteBook);

export default router;
