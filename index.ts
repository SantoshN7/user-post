import path from "path";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import postRouter from "./controller/postsController";
import authRouter from "./controller/authController";
import { dbConnect } from "./db/connection";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app: Express = express();
// set port
const port = process.env.PORT || 8080;

// *Pre-middleware*
// Parse incoming request bodies in a middleware before your handlers
// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
// set static content path
app.use(express.static(path.join(__dirname, "../public")));
// set viewengin
app.set("view engine", "ejs");
// set views path
app.set("views", "./public/template");

// *controllers*
// auth controller
app.use("/", authRouter);
// post controller
app.use("/posts", postRouter);

app.get("/", (req: Request, res: Response) => {
  res.redirect("/posts");
});

// *Post Middlewares*
app.use(errorHandler);

// *Server start*
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  dbConnect()
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("Database failed to connect !!!", err);
    });
});
