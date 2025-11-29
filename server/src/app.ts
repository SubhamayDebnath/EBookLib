import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler.ts";
const app = express();
app.use(express.json());

import userRoutes from "./user/user.routes.ts";
import bookRoutes from "./book/book.routes.ts";
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/books", bookRoutes);

// global error handler
app.use(globalErrorHandler);

export default app;
