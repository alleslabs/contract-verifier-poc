#!/bin/sh

GIT_URL=$1
FILE_NAME=$2
OPTIMIZER=$3
IS_ARM=$4
COMMIT_HASH=$5

DIR=$(uuidgen)
[ ! -d "~/compiling-contracts" ] && mkdir ~/compiling-contracts

cd ~/compiling-contracts

git clone $GIT_URL $DIR
cd $DIR
if [ "$COMMIT_HASH" != "" ]
then
    echo "test"
    git checkout $COMMIT_HASH
fi

rm -rf artifacts

if [ "$IS_ARM" == "true" ] ; then
    OPTIMIZER=rust-optimizer-arm64:$OPTIMIZER
else
    OPTIMIZER=rust-optimizer:$OPTIMIZER
fi

docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/$OPTIMIZER

grep -m1 $FILE_NAME ./artifacts/checksums.txt | sed -n 's/  .*//p'

cd ..
rm -rf $DIR
