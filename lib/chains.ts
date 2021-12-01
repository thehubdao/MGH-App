import { IChainData } from './types'

export const Chains = {
  ETHEREUM_MAINNET: {
      name: "Ethereum Mainnet",
      chainId: 1,
      chainIdHex: "0x1",
      rpcUrl: "https://mainnet.infura.io/v3/03bfd7b76f3749c8bb9f2c91bdba37f3",
      nativeCurrency: {
          name: "Ethereum",
          symbol: "ETH",
          decimals: 18,
      },
      blockExplorer: "https://etherscan.io",
  },
  ETHEREUM_ROPSTEN: {
      name: "Ethereum Ropsten",
      chainId: 3,
      chainIdHex: "0x3",
      rpcUrl: "https://ropsten.infura.io/v3/03bfd7b76f3749c8bb9f2c91bdba37f3",
      nativeCurrency: {
          name: "Ethereum",
          symbol: "ETH",
          decimals: 18,
      },
      blockExplorer: "https://ropsten.etherscan.io",
  },
  MATIC_MAINNET: {
      name: "Matic Mainnet",
      chainId: 137,
      chainIdHex: "0x89",
      rpcUrl: "https://rpc-mainnet.maticvigil.com/",
      nativeCurrency: {
          name: "Matic",
          symbol: "MATIC",
          decimals: 18,
      },
      blockExplorer: "https://polygonscan.com/",
  },
  MATIC_TESTNET: {
      name: "Matic Testnet Mumbai",
      chainId: 80001,
      chainIdHex: "0x13881",
      rpcUrl: "https://rpc-mainnet.maticvigil.com/",
      nativeCurrency: {
          name: "Matic",
          symbol: "MATIC",
          decimals: 18,
      },
      blockExplorer: "https://mumbai.polygonscan.com",
  },
}

export const supportedChains: IChainData[] = [
  {
    name: "Ethereum Mainnet",
    chainId: 1,
    chainIdHex: "0x1",
    rpcUrl: "https://mainnet.infura.io/v3/03bfd7b76f3749c8bb9f2c91bdba37f3",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorer: "https://etherscan.io",
  },
  {
    name: "Ethereum Ropsten",
    chainId: 3,
    chainIdHex: "0x3",
    rpcUrl: "https://ropsten.infura.io/v3/03bfd7b76f3749c8bb9f2c91bdba37f3",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorer: "https://ropsten.etherscan.io",
  },
  {
    name: "Matic Mainnet",
    chainId: 137,
    chainIdHex: "0x89",
    rpcUrl: "https://rpc-mainnet.maticvigil.com/",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorer: "https://polygonscan.com/",
  },
  {
    name: "Matic Testnet Mumbai",
    chainId: 80001,
    chainIdHex: "0x13881",
    rpcUrl: "https://rpc-mainnet.maticvigil.com/",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorer: "https://mumbai.polygonscan.com",
  },
]
