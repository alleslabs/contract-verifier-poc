import { exec } from "child_process";
import express, { NextFunction, Request, Response, Router } from "express";

import {
  CompileParams,
  readCompiledHash,
  validateCompileParams,
  writeCompiledHash,
} from "./utils";

export const compileRouter: Router = express.Router();

compileRouter.post(
  "/",
  async (
    req: Request<{}, {}, CompileParams, {}>,
    res: Response,
    _next: NextFunction
  ) => {
    let params: CompileParams;
    try {
      params = validateCompileParams(req.body);
    } catch (err) {
      return res.status(500).send(err.message);
    }

    console.log("POST Compile request:", params);
    try {
      console.log("compiling contract...");
      exec(
        `./src/verify_script.sh ${params.gitUrl} ${params.commitHash} ${params.fileName} ${params.optimizer} ${params.isArm}`,
        (_error, stdout, stderr) => {
          if (stderr) console.log(stderr);

          const generatedHash = stdout.trim().split(/\s+/).pop() ?? "";

          console.log("complete");
          writeCompiledHash(params, generatedHash.toUpperCase(), undefined);
        }
      );
    } catch (err) {
      writeCompiledHash(params, undefined, err);
    }
    res.send("submitted!");
  }
);

compileRouter.get(
  "/result",
  async (
    req: Request<{}, {}, {}, CompileParams>,
    res: Response,
    _next: NextFunction
  ) => {
    let params: CompileParams;
    try {
      params = validateCompileParams(req.query);
    } catch (err) {
      return res.status(500).send(err.message);
    }

    console.log("GET Compile Result request:", params);
    try {
      console.log("reading result...");
      return res.json(readCompiledHash(params));
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }
);
