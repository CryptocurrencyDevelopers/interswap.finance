import { MenuItemsType, DropdownMenuItemType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { nftsBaseUrl } from 'views/Nft/market/constants'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: (t: ContextApi['t']) => ConfigMenuItemsType[] = (t) => [
  {
    label: t('Trade'),
    icon: 'Swap',
    href: '/swap',
    showItemsOnMobile: false,
    items: [
      {
        label: t('Exchange'),
        href: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
      },
    ],
  },
  {
    label: t('Earn'),
    href: '/farms',
    icon: 'Earn',
    items: [
      {
        label: t('Farms'),
        href: '/farms',
      },
      {
        label: t('Pools'),
        href: '/pools',
      },
    ],
  },
  {
    label: t('Win'),
    href: '/prediction',
    icon: 'Trophy',
    items: [
      {
        label: t('Trading Competition'),
        href: '/competition',
      },
      {
        label: t('Prediction (BETA)'),
        href: '/prediction',
      },
      {
        label: t('Lottery'),
        href: '/lottery',
      },
    ],
  },
  {
    label: t('NFT'),
    href: `${nftsBaseUrl}`,
    icon: 'Nft',
    items: [
      {
        label: t('Overview'),
        href: `${nftsBaseUrl}`,
      },
      {
        label: t('Collections'),
        href: `${nftsBaseUrl}/collections`,
      },
      {
        label: t('Activity'),
        href: `${nftsBaseUrl}/activity`,
      },
    ],
  },
  {
    label: '',
    href: '/info',
    icon: 'More',
    hideSubNav: true,
    items: [
      {
        label: t('Info (Pancakeswap)'),
        href: '/info',
      },
      // {
      //   label: t('IFO'),
      //   href: '/ifo',
      // },
      // {
      //   label: t('Voting'),
      //   href: '/voting',
      // },
      {
        type: DropdownMenuItemType.DIVIDER,
      },
      {
        label: t('Webnero'),
        href: 'https://webnero.electronero.org',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      // {
      //   label: t('Leaderboard'),
      //   href: '/teams',
      // },
      {
        type: DropdownMenuItemType.DIVIDER,
      },
      {
        label: t('Electronero'),
        href: 'https://electronero.org',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t('Pulse'),
        href: 'https://electroneropulse.org',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t('Litenero'),
        href: 'https://litenero.org',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t('Goldnero'),
        href: 'https://goldnero.org',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      // {
      //   label: t('Docs'),
      //   href: 'https://docs.interswap.finance',
      //   type: DropdownMenuItemType.EXTERNAL_LINK,
      // },
    ],
  },
]

export default config
