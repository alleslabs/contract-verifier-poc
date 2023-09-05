import express, { Express } from "express";
// import cors from "cors";
// import helmet from "helmet";
import { verifyRouter } from "./routes/verify";

const app: Express = express();

// // Express middleware to secure your apps by setting various HTTP headers, which mitigate common attack vectors.
// app.use(helmet());
// // Express middleware to enable CORS with various options.
// app.use(cors());

app.use(express.json());
app.use("/verify", verifyRouter);

export default app;
