import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'CRYSTAL',
    lpAddresses: {
      97: '',
      56: '0x4ca6B6b8F10EB17DbD1f8c3F313Eca2F779C6e0B',
    },
    tokenSymbol: 'CRYSTAL',
    tokenAddresses: {
      97: '',
      56: '0x4ca6B6b8F10EB17DbD1f8c3F313Eca2F779C6e0B',
    },
    token: serializedTokens.carbon,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'CRYSTAL-WBNB LP',
    lpAddresses: {
      97: '',
      56: '0xB1A01410AEb9c4929Bdb99Ba776f90F142855AF4',
    },
    tokenSymbol: 'CRYSTAL',
    tokenAddresses: {
      97: '',
      56: '0x4ca6B6b8F10EB17DbD1f8c3F313Eca2F779C6e0B', // token address
    },
    token: serializedTokens.crystal,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 9,
    lpSymbol: 'ETH-CRYSTAL LP',
    lpAddresses: {
      97: '',
      56: '0x7b1de5E16466C5bd644790807302fC17B0343620',
    },
    tokenSymbol: 'CRYSTAL',
    tokenAddresses: {
      97: '',
      56: '0x4ca6B6b8F10EB17DbD1f8c3F313Eca2F779C6e0B', // token address
    },
    token: serializedTokens.crystal,
    quoteToken: serializedTokens.eth,
  },
  {
    pid: 10,
    lpSymbol: 'XSC-CRYSTAL LP',
    lpAddresses: {
      97: '',
      56: '0x202af414409042497161a9ed928330d0925a4693',
    },
    tokenSymbol: 'CRYSTAL',
    tokenAddresses: {
      97: '',
      56: '0x4ca6B6b8F10EB17DbD1f8c3F313Eca2F779C6e0B', // token address
    },
    token: serializedTokens.crystal,
    quoteToken: serializedTokens.xsc,
  },
  {
    pid: 11,
    lpSymbol: 'BUSD-CRYSTAL LP',
    lpAddresses: {
      97: '',
      56: '0x0504b6788e880255153f9ee5251D8849B293F38B',
    },
    tokenSymbol: 'CRYSTAL',
    tokenAddresses: {
      97: '',
      56: '0x4ca6B6b8F10EB17DbD1f8c3F313Eca2F779C6e0B', // token address
    },
    token: serializedTokens.crystal,
    quoteToken: serializedTokens.busd,
  },
  {
    pid: 12,
    lpSymbol: 'CAKE-CRYSTAL LP',
    lpAddresses: {
      97: '',
      56: '0x82F3B20FC6Ab23005B355c06dF3dA611f3371f3c',
    },
    tokenSymbol: 'CRYSTAL',
    tokenAddresses: {
      97: '',
      56: '0x4ca6B6b8F10EB17DbD1f8c3F313Eca2F779C6e0B', // token address
    },
    token: serializedTokens.crystal,
    quoteToken: serializedTokens.cake_og,
  },
  {
    pid: 13,
    lpSymbol: 'ETH-CRYSTAL LP',
    lpAddresses: {
      97: '',
      56: '0x7b1de5E16466C5bd644790807302fC17B0343620',
    },
    tokenSymbol: 'CRYSTAL',
    tokenAddresses: {
      97: '',
      56: '0x4ca6B6b8F10EB17DbD1f8c3F313Eca2F779C6e0B', // token address
    },
    token: serializedTokens.crystal,
    quoteToken: serializedTokens.eth,
  },
  {
    pid: 14,
    lpSymbol: 'BTCb-CRYSTAL LP',
    lpAddresses: {
      97: '',
      56: '0xd3266A70167005AeDf7dCB0a159E939fA622Cf20',
    },
    tokenSymbol: 'CRYSTAL',
    tokenAddresses: {
      97: '',
      56: '0x4ca6B6b8F10EB17DbD1f8c3F313Eca2F779C6e0B', // token address
    },
    token: serializedTokens.crystal,
    quoteToken: serializedTokens.btcb,
  },
]

export default farms
