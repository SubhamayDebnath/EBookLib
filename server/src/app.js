import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
import routes from "./routes/index.js";
app.use("/api/v1", routes);
app.use((_req, res) => {
	return res.status(404).json({ message: "Route not found" });
});

export default app;
