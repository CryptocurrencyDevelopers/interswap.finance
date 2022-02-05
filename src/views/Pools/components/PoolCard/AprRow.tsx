import React from 'react'
import styled from 'styled-components'
import { Flex, TooltipText, IconButton, useModal, CalculateIcon, Skeleton, useTooltip } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import RoiCalculatorModal from 'components/RoiCalculatorModal'
import { DeserializedPool } from 'state/types'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
// import { vaultPoolConfig } from 'config/constants/pools'

const ApyLabelContainer = styled(Flex)`
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`

interface AprRowProps {
  pool: DeserializedPool
  stakedBalance: BigNumber
  performanceFee?: number
}

const AprRow: React.FC<AprRowProps> = ({ pool, stakedBalance, performanceFee = 0 }) => {
  const { t } = useTranslation()
  const {
    stakingToken,
    earningToken,
    isFinished,
    apr,
    rawApr,
    earningTokenPrice,
    stakingTokenPrice,
    userData,
  } = pool

  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO

  const tooltipContent = true
    ? t('APY includes compounding, APR doesn’t. This pool’s CRYSTAL is compounded automatically, so we show APY.')
    : t('This pool’s rewards aren’t compounded automatically, so we show APR')

  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, { placement: 'bottom-start' })

  const apyModalLink = stakingToken.address ? `/swap?outputCurrency=${stakingToken.address}` : '/swap'
  const pts = (stakingToken.symbol === "cake") ? "XSC" : (stakingToken.symbol === "CAKE") ? "XSC" : stakingToken.symbol
  const pss = (earningToken.symbol === "cake") ? "XSC" : (earningToken.symbol === "CAKE") ? "XSC" : earningToken.symbol
  const [onPresentApyModal] = useModal(
    <RoiCalculatorModal
      earningTokenPrice={earningTokenPrice}
      stakingTokenPrice={stakingTokenPrice}
      apr={rawApr}
      linkLabel={t('Get %symbol%', { symbol: stakingToken.symbol })}
      linkHref={apyModalLink}
      stakingTokenBalance={stakedBalance.plus(stakingTokenBalance)}
      stakingTokenSymbol={pts}
      earningTokenSymbol={pss}
      // autoCompoundFrequency={vaultPoolConfig[vaultKey]?.autoCompoundFrequency ?? 0}
      performanceFee={performanceFee}
    />,
  )

  return (
    <Flex alignItems="center" justifyContent="space-between">
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef}>{`${t('APY')}:`}</TooltipText>
      {apr || isFinished ? (
        <ApyLabelContainer alignItems="center" onClick={onPresentApyModal}>
          <Balance
            fontSize="16px"
            isDisabled={isFinished}
            value={isFinished ? 0 : apr}
            decimals={2}
            unit="%"
            onClick={onPresentApyModal}
          />
          {!isFinished && (
            <IconButton variant="text" scale="sm">
              <CalculateIcon color="textSubtle" width="18px" />
            </IconButton>
          )}
        </ApyLabelContainer>
      ) : (
        <Skeleton width="82px" height="32px" />
      )}
    </Flex>
  )
}

export default AprRow
