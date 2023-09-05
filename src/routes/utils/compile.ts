export interface CompileParams {
  gitUrl?: string;
  commitHash?: string;
  fileName?: string;
  optimizer?: string;
  isArm?: string;
}

export const validateCompileParams = (params: CompileParams): CompileParams => {
  const { gitUrl, commitHash, fileName, optimizer, isArm } = params;

  if (!gitUrl)
    throw new Error("Error missing git source url (e.g. gitUrl=https://...)");
  if (!commitHash)
    throw new Error(
      "Error missing commit hash / tag for reference (e.g. commitHash=...)"
    );
  if (!fileName)
    throw new Error(
      "Error missing file name to be verified (e.g. fileName=contract_name.wasm)"
    );
  if (!optimizer)
    throw new Error("Error missing optimizer version (e.g. optimizer=0.14.0)");

  return {
    gitUrl,
    commitHash,
    fileName,
    optimizer,
    isArm: isArm !== undefined ? "true" : "false",
  };
};
