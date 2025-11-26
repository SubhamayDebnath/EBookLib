import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler.ts";
const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

// global error handler
app.use(globalErrorHandler);

export default app;
