import fs from "fs";
import { Hash, createHash } from "crypto";

import { CompileParams } from "./compile";

// Set up directory for compiled contract
const COMPILED_HASH_DIR = "../compiled-hash";
if (!fs.existsSync(COMPILED_HASH_DIR)) fs.mkdirSync(COMPILED_HASH_DIR);

interface CompiledResult {
  params: CompileParams;
  hash?: string;
  err?: Error;
}

const getCompiledFilepath = (params: CompileParams) => {
  const hash: Hash = createHash("sha256");
  hash.update(JSON.stringify(params));
  const name = hash.digest("hex");

  return `${COMPILED_HASH_DIR}/${name}.json`;
};

export const isCompiledHashExist = (params: CompileParams) => {
  const path = getCompiledFilepath(params);
  return fs.existsSync(path);
};

export const writeCompiledHash = (
  params: CompileParams,
  hash?: string,
  err?: Error
) => {
  const path = getCompiledFilepath(params);
  const compiledResult: CompiledResult = { params, hash, err };
  fs.writeFileSync(path, JSON.stringify(compiledResult), {
    encoding: "utf8",
    flag: "w",
  });
};

export const readCompiledHash = (params: CompileParams): CompiledResult => {
  const path = getCompiledFilepath(params);
  try {
    const compiledResult: CompiledResult = JSON.parse(
      fs.readFileSync(path, "utf-8")
    );
    return compiledResult;
  } catch (err) {
    throw new Error(err);
  }
};
