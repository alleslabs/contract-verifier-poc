import util from "util";
import childProcess from "child_process";
import express, { NextFunction, Request, Response, Router } from "express";
import { getCodeIdInfo } from "./utils";
import { AxiosError } from "axios";

const exec = util.promisify(childProcess.exec);
export const verifyRouter: Router = express.Router();

interface VerifyParams {
  chain: string;
  network: string;
  id: string;
}

interface VerifyQueryParams {
  gitUrl?: string;
  fileName?: string;
  optimizer?: string;
  isArm?: string;
  commitHash?: string;
}

verifyRouter.get(
  "/:chain/:network/:id",
  async (
    req: Request<VerifyParams, {}, {}, VerifyQueryParams>,
    res: Response,
    _next: NextFunction
  ) => {
    const { chain, network, id } = req.params;
    const {
      gitUrl,
      fileName,
      optimizer,
      isArm = "false",
      commitHash = "",
    } = req.query;

    if (gitUrl === undefined)
      res
        .status(500)
        .send("Error missing git source url (e.g. gitUrl=https://...)");
    if (fileName === undefined)
      res
        .status(500)
        .send(
          "Error missing file name to be verified (e.g. fileName=contract_name.wasm)"
        );
    if (optimizer === undefined)
      res
        .status(500)
        .send("Error missing optimizer version (e.g. optimizer=0.14.0)");

    try {
      const codeInfo = await getCodeIdInfo(chain, network, id);

      const { stdout } = await exec(
        `./src/verify_script.sh ${gitUrl} ${fileName} ${optimizer} ${isArm.toLowerCase()} ${commitHash}`
      );
      const generatedHash = stdout.trim().split(/\s+/).pop() ?? "";
      res.json({
        uploaded_hash: codeInfo.code_info.data_hash,
        compiled_hash: generatedHash.toUpperCase(),
        verified: codeInfo.code_info.data_hash === generatedHash.toUpperCase(),
      });
    } catch (e) {
      const status = e.response.status;
      const lcdError = e.response.data.message;

      res
        .status(status ?? 500)
        .send(lcdError ? `LCD Error - ${lcdError}` : e.message);
    }
  }
);
