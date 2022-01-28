import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'XSC',
    lpAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec',
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec',
    },
    token: serializedTokens.syrup,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'XSC-ETH LP',
    lpAddresses: {
      97: '',
      56: '0xE84042994905F91164A2975a7DfAc406998d1f34',
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    token: serializedTokens.xsc,
    quoteToken: serializedTokens.eth,
  },
  {
    pid: 1,
    lpSymbol: 'XSC-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xdC5453587b4303F6ddb839c7Bb63005B517Bb55c',
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    token: serializedTokens.xsc,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 5,
    lpSymbol: 'XSC-ATOM LP',
    lpAddresses: {
      97: '',
      56: '0xb62A5fa93275375170f45AB841F1d6F7a9b52a1c',
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    token: serializedTokens.xsc,
    quoteToken: serializedTokens.atom,
  },
  {
    pid: 2,
    lpSymbol: 'XSC-CAKE LP',
    lpAddresses: {
      97: '',
      56: '0x30e3d899b7133Ea67F57c521606be4Ff8366DcF9',
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    token: serializedTokens.xsc,
    quoteToken: serializedTokens.cake_og,
  },

  {
    pid: 3,
    lpSymbol: 'XSC-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xc8458F9b47FCf040F6C9871d9Dfbb0c1d079DC32',
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    token: serializedTokens.xsc,
    quoteToken: serializedTokens.busd,
  },

  {
    pid: 11,
    lpSymbol: 'XSC-CRYSTAL LP',
    lpAddresses: {
      97: '',
      56: '0x202af414409042497161a9ed928330d0925a4693',
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    token: serializedTokens.xsc,
    quoteToken: serializedTokens.crystal,
  },

  {
    pid: 12,
    lpSymbol: 'CRYSTAL-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xB1A01410AEb9c4929Bdb99Ba776f90F142855AF4',
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.crystal,
  },
  {
    pid: 13,
    lpSymbol: 'CRYSTAL-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x0504b6788e880255153f9ee5251D8849B293F38B',
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.crystal,
  },
  {
    pid: 14,
    lpSymbol: 'CRYSTAL-CAKE LP',
    lpAddresses: {
      97: '',
      56: '0x82F3B20FC6Ab23005B355c06dF3dA611f3371f3c',
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    token: serializedTokens.cake_og,
    quoteToken: serializedTokens.crystal,
  },
  {
    pid: 15,
    lpSymbol: 'CRYSTAL-ETH LP',
    lpAddresses: {
      97: '',
      56: '0x7b1de5E16466C5bd644790807302fC17B0343620',
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    token: serializedTokens.eth,
    quoteToken: serializedTokens.crystal,
  },
  {
    pid: 16,
    lpSymbol: 'CRYSTAL-ATOM LP',
    lpAddresses: {
      97: '',
      56: '0x7b1de5E16466C5bd644790807302fC17B0343620',
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    token: serializedTokens.atom,
    quoteToken: serializedTokens.crystal,
  },
]

export default farms
