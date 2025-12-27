const validate = (schema) => (req, res, next) => {
	try {
		schema.parse({
			body: req.body,
			params: req.params,
			query: req.query,
		});
		next();
	} catch (error) {
		return res.status(400).json({
			success: false,
			errors: err.errors.map((e) => ({
				field: e.path.join("."),
				message: e.message,
			})),
		});
	}
};
export default validate;