//! Higher order function, gets a parameter as a function and //? return a function
//! Higher order function, gets a parameter as a function and //? return a function
//! Higher order function, gets a parameter as a function and //? return a function
//! Higher order function, gets a parameter as a function and //? return a function

import jwt, { JwtPayload } from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import config from "../config";

export const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(500).json({ message: "You are not allowed!" });
      }
      const decoded = jwt.verify(
        token,
        config.jwtSecret as string
      ) as JwtPayload;

      console.log({ decoded });

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(500).json({
          success: false,
          message: "Unauthenticated user",
        });
      }

      next();
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
};
