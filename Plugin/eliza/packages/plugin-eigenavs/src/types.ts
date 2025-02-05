// Operator Data Interface
export interface OperatorData {
  EIGEN_TVL: number;
  ETHx_TVL: number;
  OETH_TVL: number;
  ankrETH_TVL: number;
  beacon_chain_ETH_TVL: number;
  cbETH_TVL: number;
  lsETH_TVL: number;
  mETH_TVL: number;
  num_stakers: number;
  operator_contract_address: string;
  operator_name: string;
  osETH_TVL: number;
  rETH_TVL: number;
  sfrxETH_TVL: number;
  stETH_TVL: number;
  swETH_TVL: number;
  total_TVL: number;
  wBETH_TVL: number;
}

// Operator Metadata Interface
export interface OperatorMetadata {
  name: string;
  description: string;
  logo: string;
  twitter: string;
  website: string;
}

// AVS Data Interface
export interface AVSData {
  EIGEN_TVL: number;
  ETHx_TVL: number;
  OETH_TVL: number;
  ankrETH_TVL: number;
  avs_contract_address: string;
  avs_name: string;
  beacon_chain_ETH_TVL: number;
  cbETH_TVL: number;
  lsETH_TVL: number;
  mETH_TVL: number;
  num_operators: number;
  num_stakers: number;
  osETH_TVL: number;
  rETH_TVL: number;
  sfrxETH_TVL: number;
  stETH_TVL: number;
  swETH_TVL: number;
  total_TVL: number;
  wBETH_TVL: number;
}

// AVS Metadata Interface
export interface AVSMetadata {
  name: string;
  description: string;
  logo: string;
  twitter: string;
  website: string;
}

// Combined Response Types
export interface OperatorResponse {
  data: OperatorData;
  metadata: OperatorMetadata;
}

export interface AVSResponse {
  data: AVSData;
  metadata: AVSMetadata;
}