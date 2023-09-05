# contract-verifier-poc

## Environment variables

- `PORT` default is 8080

## Usage

1. run `yarn start:dev`
2. http://localhost:8080/verify/<chain>/<chain-id>/<code-id>?gitUrl=<url>&fileName=<verified-filename>&optimizer=<optimizer-version>&isArm=<boolean>&commitHash=<hash_or_tag_version>
   - Query params
     - `gitUrl` : git url for the source code
     - `fileName` : file name to be verified
     - `optimizer` : optimizer version
     - `isArm` : use optimizer arm64 version
     - `commitHash` : (optional) commit hash or tag version to be checked out
