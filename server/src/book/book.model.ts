import { Schema, model } from "mongoose";
import type { BookType } from "./book.types.ts";
const bookSchema = new Schema<BookType>(
	{
		title: {
			type: String,
			required: [true, "title is required"],
			trim: true,
		},
		description: {
			type: String,
			required: [true, "description is required"],
			trim: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			required: [true, "author is required"],
			ref: "User",
		},
		genre: {
			type: String,
			required: [true, "genre is required"],
			trim: true,
		},
		coverImage: {
			type: String,
			required: [true, "image is required"],
			trim: true,
		},
		file: {
			type: String,
			required: [true, "file is required"],
			trim: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

const Book = model<BookType>("Book", bookSchema);

export default Book;