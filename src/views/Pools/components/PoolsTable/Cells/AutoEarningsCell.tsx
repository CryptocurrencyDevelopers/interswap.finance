import React from 'react'
import styled from 'styled-components'
import { Skeleton, Text, useTooltip, HelpIcon, Flex, Box, useMatchBreakpoints } from '@pancakeswap/uikit'
import { DeserializedPool } from 'state/types'
import Balance from 'components/Balance'
import { useTranslation } from 'contexts/Localization'
import { convertSharesToCake, getCakeVaultEarnings } from 'views/Pools/helpers'
import { differenceInHours } from 'date-fns'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { getInterestBreakdown } from 'utils/compoundApyHelpers'
import BaseCell, { CellContent } from './BaseCell'

interface AutoEarningsCellProps {
  pool: DeserializedPool
  account: string
}

const StyledCell = styled(BaseCell)`
  flex: 4.5;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 120px;
  }
`

const HelpIconWrapper = styled.div`
  align-self: center;
`

const getAutoEarningsInterestBreakdown = (
  pool: DeserializedPool,
  userShares: BigNumber,
  pricePerFullShare: BigNumber,
  performanceFeeAsDecimal: number,
) => {
  const { stakingTokenPrice, earningTokenPrice, rawApr } = pool
  const autoCompoundFrequency = 0
  return getInterestBreakdown({
    principalInUSD: 0,
    apr: rawApr,
    earningTokenPrice,
    compoundFrequency: autoCompoundFrequency,
    performanceFee: performanceFeeAsDecimal,
  })
}

const getAutoEarningsRoiTimePeriod = (timePeriod: number, interestBreakdown, earningTokenPrice) => {
  const hasInterest = Number.isFinite(interestBreakdown[timePeriod])
  const roiTokens = hasInterest ? interestBreakdown[timePeriod] : 0
  return hasInterest ? roiTokens * earningTokenPrice : 0
}

const AutoEarningsCell: React.FC<AutoEarningsCellProps> = ({ pool, account }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { earningTokenPrice } = pool

  const labelText = t('Recent XSC profit')
  const lastActionInMs = 0
  const hourDiffSinceLastAction = differenceInHours(Date.now(), lastActionInMs)


  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Text bold>
        {' XSC'}
      </Text>
      <Text>{t('Earned since your last action')}:</Text>
      <Text>{new Date(lastActionInMs).toLocaleString()}</Text>
      <Text>{t('At this rate, you would earn')}:</Text>
    </>,
    { placement: 'bottom' },
  )

  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="textSubtle" textAlign="left">
          {labelText}
        </Text>
        <>
            {tooltipVisible && tooltip}
            <Flex>
              <Box mr="8px" height="32px">
                <Balance
                  mt="4px"
                  bold={!isMobile}
                  fontSize={isMobile ? '14px' : '16px'}
                  color={'textDisabled'}
                  decimals={1}
                  value={0}
                />
                <Text mt="4px" fontSize="12px" color="textDisabled">
                0 USD
              </Text>
              </Box>
            </Flex>
          </>
      </CellContent>
    </StyledCell>
  )
}

export default AutoEarningsCell
