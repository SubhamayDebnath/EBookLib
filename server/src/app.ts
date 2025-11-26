import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler.ts";
const app = express();
app.use(express.json());
app.get("/", (req, res) => res.send("Hello World!"));

import userRoutes from "./user/user.routes.ts";
app.use("/api/v1/users", userRoutes);

// global error handler
app.use(globalErrorHandler);

export default app;
