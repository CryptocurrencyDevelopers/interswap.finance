import { SalesSectionProps } from '.'

export const swapSectionData: SalesSectionProps = {
  headingText: 'Interswap with PancakeSwap. Trade anything. No additional fees, no registration necessary.',
  bodyText: 'Trade any tokens you want on Binance Smart Chain in a matter of seconds. It really is that easy. Why? Because we <3 PancakeSwap. The decentralized exchange is provided as a courtesy for our users to transact with billions in liquidity on Binance Smart Chain. Stake and Earn in our Yield Farms and Staking Pools, try them out today! ',
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: 'Trade Now',
    external: false,
  },
  secondaryButton: {
    to: '/pools',
    text: 'Start Staking',
    external: true,
  },
  images: {
    path: '/images/home/trade/',
    attributes: [
      { src: 'BNB', alt: 'BNB token' },
      { src: 'XSC', alt: 'XSC token' },
      { src: 'CAKE', alt: 'CAKE token' },
    ],
  },
}

export const earnSectionData: SalesSectionProps = {
  headingText: 'Earn passive income with crypto.',
  bodyText: 'InterSwap makes it easy to make your crypto work for you.',
  reverse: true,
  primaryButton: {
    to: '/farms',
    text: 'Start Farming',
    external: false,
  },
  secondaryButton: {
    to: 'https://docs.pancakeswap.finance/products/yield-farming',
    text: 'Learn',
    external: true,
  },
  images: {
    path: '/images/home/earn/',
    attributes: [
      { src: 'stonks', alt: 'Stocks chart' },
      { src: 'XSC', alt: 'XSC' },
      { src: 'CRYSTAL', alt: 'CRYSTAL' },
    ],
  },
}

export const cakeSectionData: SalesSectionProps = {
  headingText: 'XSC is the main rewards token for our v1 Yield Farm, and Staking Pools. CRYSTAL is the governance token for our GameFi & NFT operations.',
  bodyText:
    'XSC token is at the core of the InterSwap DeFi ecosystem. CRYSTAL is part of our P2E & PvP GameFi and NFT division. Trade, win, mint, burn, play, farm, spend, stake... and more functions to be announced soon!',
  reverse: false,
  primaryButton: {
    to: '/swap?outputCurrency=0x7155aff27df20f9b0ecf8406a5a60c30043894ec',
    text: 'Buy XSC',
    external: false,
  },
  secondaryButton: {
    to: '/swap?outputCurrency=0x4ca6b6b8f10eb17dbd1f8c3f313eca2f779c6e0b',
    text: 'Buy CRYSTAL',
    external: true,
  },
  images: {
    path: '/images/home/earn/',
    attributes: [
      { src: 'XSC', alt: 'XSC' },
      { src: 'CRYSTAL', alt: 'CRYSTAL' },
    ],
  },
}
