import express, { NextFunction, Request, Response, Router } from "express";

import {
  CompileParams,
  getCodeIdInfo,
  readCompiledHash,
  validateCompileParams,
} from "./utils";

export const verifyRouter: Router = express.Router();

interface VerifyParams {
  chain: string;
  network: string;
  id: string;
}

verifyRouter.get(
  "/:chain/:network/:id",
  async (
    req: Request<VerifyParams, {}, {}, CompileParams>,
    res: Response,
    _next: NextFunction
  ) => {
    const { chain, network, id } = req.params;
    let params: CompileParams;
    try {
      params = validateCompileParams(req.query);
    } catch (err) {
      return res.status(500).send(err.message);
    }

    console.log("GET Verify request:", params);
    try {
      console.log("getting LCD...");
      const codeInfo = await getCodeIdInfo(chain, network, id);

      console.log("retrieving...");
      const { hash, err } = readCompiledHash(params);
      if (!hash) throw err;

      return res.send({
        uploaded_hash: codeInfo.code_info.data_hash,
        compiled_hash: hash,
      });
    } catch (err) {
      const status = err.response.status;
      const lcdError = err.response.data.message;

      console.log("error -", status ?? 500, lcdError ?? err.message);
      return res
        .status(status ?? 500)
        .send(lcdError ? `LCD Error - ${lcdError}` : err.message);
    }
  }
);
