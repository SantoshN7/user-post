import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const authHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["auth-token"];
    if (!token) {
      throw new Error("Auth token missing");
    }
    const verified = jwt.verify(token, "jwt-snachan");
    if (verified) {
      return next();
    } else {
      // Access Denied
      return res.status(401).json({ code: 401, message: "Access denied!" });
    }
  } catch (error: any) {
    // Access Denied
    return res.status(401).json({ code: 401, message: error.message });
  }
};
