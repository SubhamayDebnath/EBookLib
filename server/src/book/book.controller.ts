import type { Request, Response, NextFunction } from "express";
import { config } from "../config/config.ts";
import asyncHandler from "../utils/asyncHandler.ts";
import AppError from "../utils/appError.ts";
import ApiResponse from "../utils/apiResponseHandler.ts";
import { uploadFile } from "../helper/upload.ts";
import Book from "./book.model.ts";

const createBook = asyncHandler(async (req: Request, res: Response) => {
	const { title, description, genre } = req.body;
	const authorId = "";
	const files = req.files as any;
    if (!title || !description || !genre || !files.coverImage || !files.file) {
        throw new AppError(400, "All fields are required");
    }
	const bookCoverImage = files.coverImage?.[0].path;
	const bookPDF = files.file?.[0].path;
	const coverUpload = await uploadFile(bookCoverImage, {
		folder: "books-covers",
	});

	const bookUpload = await uploadFile(bookPDF, {
		folder: "books-pdf",
		isPDF: true,
	});
    if(!coverUpload || !bookUpload){
        throw new AppError(400, "Book not created");
    }
    const newBook = await Book.create({
        title,
        description,
        author: authorId,
        genre,
        coverImage: coverUpload.secure_url,
        file: bookUpload.secure_url,

    });
    if(!newBook){
        throw new AppError(400, "Book not created");
    }
    return res.status(201).json(new ApiResponse(201, "Book created successfully", newBook));

});

export { createBook };
