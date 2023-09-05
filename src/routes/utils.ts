import axios from "axios";

export interface CodeIdInfoResponse {
  code_info: {
    code_id: string;
    creator: string;
    data_hash: string;
    instantiate_permission: {
      permission: string;
      address: string;
      addresses: string[];
    };
  };
  data: string;
}

export const getCodeIdInfo = async (
  chain: string,
  network: string,
  id: string
): Promise<CodeIdInfoResponse> => {
  const { data } = await axios.get<CodeIdInfoResponse>(
    `https://celatone-api.alleslabs.dev/rest/${chain}/${network}/cosmwasm/wasm/v1/code/${id}`
  );
  return data;
};
