import { NextFunction, RequestHandler, Request, Response } from "express";

// Wraps controller handlers in try-catch block
export const tryCatch =
  (controllerFn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllerFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
