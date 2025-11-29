import { Router } from "express";
import {createBook} from "./book.controller.ts";
import upload from "../middlewares/multer.middleware.ts";
const router = Router();

router.post("/",upload.fields([{name:"coverImage",maxCount:1},{name:"file",maxCount:1}]) ,createBook);

export default router;
