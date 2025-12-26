import express from "express";

const app = express();

app.use(express.json());
app.use((req, res) => {
	return res.status(404).json({ message: "Route not found" });
});

export default app;
