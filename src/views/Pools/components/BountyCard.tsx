import React, { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  Text,
  Flex,
  HelpIcon,
  Button,
  Heading,
  Skeleton,
  useModal,
  Box,
  useTooltip,
} from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useCakeVault } from 'state/pools/hooks'
import Balance from 'components/Balance'
import BountyModal from './BountyModal'

const StyledCard = styled(Card)`
  width: 100%;
  flex: 1;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 240px;
  }
`

const BountyCard = () => {
  const { t } = useTranslation()
  // const {
  //   estimatedCakeBountyReward,
  //   fees: { callFee },
  // } = useCakeVault()
  const cakePriceBusd = usePriceCakeBusd()

  // const estimatedDollarBountyReward = useMemo(() => {
  //   return new BigNumber(estimatedCakeBountyReward).multipliedBy(cakePriceBusd)
  // }, [cakePriceBusd])

  // const hasFetchedDollarBounty = estimatedDollarBountyReward.gte(0)
  // const hasFetchedCakeBounty = estimatedCakeBountyReward ? estimatedCakeBountyReward.gte(0) : false
  // const dollarBountyToDisplay = hasFetchedDollarBounty ? getBalanceNumber(estimatedDollarBountyReward, 18) : 0
  // const cakeBountyToDisplay = hasFetchedCakeBounty ? getBalanceNumber(estimatedCakeBountyReward, 18) : 0

  const TooltipComponent = ({ fee }: { fee: number }) => (
    <>
      <Text mb="16px">{t('This pool is a decentralized yield farm, and liquidity reward sharing protocol on Binance Smart Chain.')}</Text>
      <Text mb="16px">
        {t(
          'If you need additional service please join us on Telegram ',
        )}<a href="https://t.me/InterswapFinance"> @InterswapFinance</a>
      </Text>
      <Text style={{ fontWeight: 'bold' }}>
        {t('On the Web ')}<a href="https://Interswap.finance"> Interswap.Finance</a>
      </Text>
    </>
  )

  const [onPresentBountyModal] = useModal(<BountyModal TooltipComponent={TooltipComponent} />)

  const { targetRef, tooltip, tooltipVisible } = useTooltip(<TooltipComponent />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })

  return (
    <>
      {tooltipVisible && tooltip}
      <StyledCard>
        <CardBody>
          <Flex flexDirection="column">
            <Flex alignItems="center" mb="12px">
              <Text fontSize="16px" bold color="textSubtle" mr="4px">
                {t('Need Help?')}
              </Text>
              <Box ref={targetRef}>
                <HelpIcon color="textSubtle" />
              </Box>
            </Flex>
          </Flex>
          {/* <Flex alignItems="center" justifyContent="space-between"> */}
            {/* <Flex flexDirection="column" mr="12px">
              <Heading>(
                  <Skeleton height={20} width={96} mb="2px" />
                )
              </Heading>
              (
                <Skeleton height={16} width={62} />
              )
            </Flex> */}
            {/* <Button
              // onClick={onPresentBountyModal}
              scale="sm"
              id="clickClaimVaultBounty"
            >
              {t('Claim')}
            </Button> */}
          {/* </Flex> */}
        </CardBody>
      </StyledCard>
    </>
  )
}

export default BountyCard
