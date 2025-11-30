import type { Request, Response, NextFunction } from "express";
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
	if (!coverUpload || !bookUpload) {
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
	if (!newBook) {
		throw new AppError(400, "Book not created");
	}
	return res
		.status(201)
		.json(new ApiResponse(201, "Book created successfully", newBook));
});

const updateBook = asyncHandler(async (req: Request, res: Response) => {
	const { title, description, genre } = req.body;
	const { bookId } = req.params;
	const files = req.files as any;
	const updateData: any = {};
	if (title) {
		updateData.title = title;
	}
	if (description) {
		updateData.description = description;
	}
	if (genre) {
		updateData.genre = genre;
	}
	if (files.coverImage) {
		updateData.coverImage = files.coverImage?.[0].path;
	}
	if (files.file) {
		updateData.file = files.file?.[0].path;
	}
	const book = await Book.findById(bookId);
	if (!book) {
		throw new AppError(404, "Book not found");
	}
	if (Object.keys(updateData).length === 0) {
		throw new AppError(400, "No data provided for update");
	}
	const updatedBook = await Book.findByIdAndUpdate(bookId,{ $set: updateData },{ new: true });
	if (!updatedBook) {
		throw new AppError(400, "Book not updated");
	}
	return res.status(200).json(new ApiResponse(200, "Book updated successfully", updatedBook));
});

const bookStatus = asyncHandler(async (req: Request, res: Response) => {
	const { bookId } = req.params;
	if (!bookId) {
		throw new AppError(400, "Book id is required");
	}
	const book = await Book.findById(bookId);
	if (!book) {
		throw new AppError(404, "Book not found");
	}
	const updatedBook = await Book.findByIdAndUpdate(
		bookId,
		{ isActive: !book.isActive },
		{ new: true }
	);
	if (!updatedBook) {
		throw new AppError(400, "Book not updated");
	}
	const statusMessage = updatedBook.isActive ? "enabled" : "disabled";
	return res.status(200).json(new ApiResponse(200, `Book ${statusMessage} successfully`, updatedBook));
});

const deleteBook = asyncHandler(async(req: Request, res: Response) => {
    const { bookId } = req.params;
    if (!bookId) {
        throw new AppError(400, "Book id is required");
    }
    const book = await Book.findById(bookId);
    if (!book) {
        throw new AppError(404, "Book not found");
    }
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
        throw new AppError(400, "Book not deleted");
    }
    return res.status(200).json(new ApiResponse(200, "Book deleted successfully", deletedBook));
});

const getBookById = asyncHandler(async(req: Request, res: Response) => {
    const { bookId } = req.params;
    if (!bookId) {
        throw new AppError(400, "Book id is required");
    }
    const book = await Book.findById(bookId).populate("author");
    if (!book) {
        throw new AppError(404, "Book not found");
    }
    return res.status(200).json(new ApiResponse(200, "Book fetched successfully", book));
})

const getAllBooks = asyncHandler(async (req: Request, res: Response) => {
	const books = await Book.find().sort({ createdAt: -1 }).populate("author");
	return res
		.status(200)
		.json(new ApiResponse(200, "Books fetched successfully", books));
});

export { createBook,updateBook,deleteBook, bookStatus,getBookById, getAllBooks };
