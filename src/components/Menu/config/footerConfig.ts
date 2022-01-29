import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Electronero Smart Chain'),
        href: 'https://t.me/electronero',
      },
      {
        label: t('Crystaleum'),
        href: 'https://t.me/crystaleum',
      },
      {
        label: '—',
      },
      {
        label: t('XSC token'),
        href: 'https://electronero.org',
      },
      {
        label: t('CRYSTAL token'),
        href: 'https://crystaleum.org',
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Contact'),
        href: 'https://electronero.org/#contact',
      },
      {
        label: t('Community'),
        href: 'https://t.me/interswapfinance',
      },
      {
        label: t('Troubleshooting Pancakeswap'),
        href: 'https://docs.pancakeswap.finance/help/troubleshooting',
      },
      {
        label: t('Guides'),
        href: 'https://docs.pancakeswap.finance/get-started',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/pancakeswap',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.pancakeswap.finance',
      },
      {
        label: t('Bug Bounty'),
        href: 'https://docs.pancakeswap.finance/code/bug-bounty',
      },
      {
        label: t('Audits'),
        href: 'https://docs.pancakeswap.finance/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited',
      },
      {
        label: t('Careers'),
        href: 'https://docs.pancakeswap.finance/hiring/become-a-chef',
      },
    ],
  },
]
