// import { VaultKey } from 'state/types'
import tokens, { serializeTokens } from './tokens'
import { SerializedPoolConfig, PoolCategory } from './types'

const serializedTokens = serializeTokens()


const pools: SerializedPoolConfig[] = [
  {
    sousId: 0,
    stakingToken: serializedTokens.xsc,
    earningToken: serializedTokens.xsc,
    contractAddress: {
      97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      56: '0xbc33C8AD9756b669F5ABFe6cE9B9Cb132C3Aff47',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '30',
    sortOrder: 0,
    deployedBlockNumber: 1,
    isFinished: false,
  },    
]

export default pools
