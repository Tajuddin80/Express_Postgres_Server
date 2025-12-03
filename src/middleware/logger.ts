import { NextFunction, Request, Response } from "express";

//! Logger middlewar
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log("Inside the logger");
  next();
};

export default logger;
