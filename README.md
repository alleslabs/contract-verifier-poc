# contract-verifier-poc

## Environment variables

- `PORT` default is 8080

## Usage

### Compiling Params

- `gitUrl` : git url for the source code
- `commitHash` : (optional) commit hash or tag version to be checked out
- `fileName` : file name to be verified
- `optimizer` : optimizer version
- `isArm` : use optimizer arm64 version

### Running

1. run `yarn start:dev`

2. compile code and save the hash

   - http://localhost:8080/compile
   - **Request body** - compiling params

3. check the compile result

   - http://localhost:8080/compile/result
   - **Query params** - compiling params

4. verify with the on-chain code
   - http://localhost:8080/verify/:chain/:network/:code_id
   - **Params**
     - chain - the name of an ecosystem (e.g. osmosis)
     - network - chain id (e.g. osmo-test-5)
     - code_id - code id to be verified
   - **Query params** - compiling params
