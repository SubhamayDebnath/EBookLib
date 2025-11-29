import { Types } from "mongoose";

export interface BookType {
	_id: string;
	title: string;
	description: string;
	author: Types.ObjectId;
	genre: string;
	coverImage: string;
	file: string;
	isActive?: boolean;
}
