import express, { Express } from "express";
import multer from "multer";
// import cors from "cors";
// import helmet from "helmet";
import { compileRouter } from "./routes/compile";
import { verifyRouter } from "./routes/verify";

const app: Express = express();
const upload = multer();

// // Express middleware to secure your apps by setting various HTTP headers, which mitigate common attack vectors.
// app.use(helmet());
// // Express middleware to enable CORS with various options.
// app.use(cors());

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.any());
app.use(express.static("public"));

app.use("/compile", compileRouter);
app.use("/verify", verifyRouter);

export default app;
