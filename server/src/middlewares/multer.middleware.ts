import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: "uploads/",
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const fileFilter = (req: any, file: any, cb: any) => {
	const allowedExtensions = [".jpeg", ".jpg", ".png", ".pdf"];
	const ext = path.extname(file.originalname).toLowerCase();

	if (!allowedExtensions.includes(ext)) {
		return cb(new Error("Only .jpeg, .jpg, .png, .pdf allowed"));
	}

	cb(null, true);
};

const upload = multer({
	storage,
	limits: { fileSize: 2 * 1024 * 1024 },
	fileFilter,
});

export default upload;
