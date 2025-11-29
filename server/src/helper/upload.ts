import cloudinary from "../config/cloudinary.ts";
import fs from "fs";
import path from "path";

interface UploadOptions {
	folder: string;
	isPDF?: boolean;
}

export const uploadFile = async (filePath: string, options: UploadOptions) => {
	const originalName = path.basename(filePath);
	const timestamp = Date.now();
	const fileName = `${timestamp}-${originalName}`;

	try {
		const isPDF = options.isPDF ?? originalName.toLowerCase().endsWith(".pdf");

		const uploadOptions: Record<string, any> = {
			folder: options.folder,
			public_id: fileName,
			resource_type: isPDF ? "raw" : "image",
		};

		if (!isPDF) uploadOptions.format = path.extname(originalName).substring(1);

		const result = await cloudinary.uploader.upload(filePath, uploadOptions);
		return result;
	} catch (error) {
		throw new Error("Failed to upload file to Cloudinary: " + error);
	} finally {
		if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
	}
};
