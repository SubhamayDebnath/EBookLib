import {config} from "../config/config.js";

// global error handler
const globalErrorHandler = (err,_req,res,_next) => {
  const statusCode = err.statusCode || 500;
  const errorResponse = {
    success: false,
    message: err.message,
  } 
  if (config.environment === "development") {
    errorResponse.stack = err.stack;
  }
  return res.status(statusCode).json(errorResponse);
};

export default globalErrorHandler;
