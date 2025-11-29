import { Router } from "express";
import {createBook,getAllBooks} from "./book.controller.ts";
import upload from "../middlewares/multer.middleware.ts";
const router = Router();

router.post("/",upload.fields([{name:"coverImage",maxCount:1},{name:"file",maxCount:1}]) ,createBook);
router.get("/",getAllBooks);

export default router;
