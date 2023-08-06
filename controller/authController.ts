import express, { Request, Response } from "express";
import { tryCatch } from "../utils/tryCatch";
import { AppError } from "../utils/appError";
import User from "../model/User";
import * as jwt from "jsonwebtoken";
import { authHandler } from "../middleware/authHandler";

const authRouter = express.Router();

authRouter.get("/login", (req: Request, res: Response) => {
  res.render("login");
});

authRouter.get("/signup", (req: Request, res: Response) => {
  res.render("signup");
});

authRouter.post(
  "/login",
  tryCatch(async (req: Request, res: Response) => {
    const userData = req.body;
    if (!userData || !userData.email || !userData.password) {
      throw new AppError(403, "Incomplete Input.");
    }
    const user = await User.findOne({
      email: userData.email,
      password: userData.password,
    });
    if (!user) {
      throw new AppError(404, "User not found.");
    }
    const clientData = { userId: user.id, email: user.email };
    const jwtToken = jwt.sign(clientData, "jwt-snachan", { expiresIn: "1h" });
    res.cookie("auth-token", jwtToken).send(clientData);
  })
);

authRouter.post(
  "/signup",
  tryCatch(async (req: Request, res: Response) => {
    const userData = req.body;
    if (!userData || !userData.email || !userData.password) {
      throw new AppError(403, "Incomplete Input.");
    }
    const existingEmail = await User.exists({ email: userData.email });
    if (existingEmail) {
      throw new AppError(409, "User with email already exists.");
    }
    await User.create({ email: userData.email, password: userData.password });
    res.status(200).json({ message: "Signup successfully." });
  })
);

authRouter.use(authHandler);

authRouter.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("auth-token");
  res.sendStatus(200);
});

export default authRouter;
