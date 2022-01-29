import React, { useState, useEffect, useMemo } from 'react'
import { Flex, Text, Skeleton, Button, ArrowForwardIcon } from '@pancakeswap/uikit'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { useTranslation } from 'contexts/Localization'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { usePriceCakeBusd } from 'state/farms/hooks'
import Balance from 'components/Balance'
import styled from 'styled-components'
import { fetchCurrentLotteryIdAndMaxBuy, fetchLottery } from 'state/lottery/helpers'
import BigNumber from 'bignumber.js'
import { getBalanceAmount } from 'utils/formatBalance'
import { useSlowRefreshEffect } from 'hooks/useRefreshEffect'

const StyledLink = styled(NextLinkFromReactRouter)`
  width: 100%;
`

const StyledBalance = styled(Balance)`
  background: ${({ theme }) => theme.colors.gradients.gold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const LotteryCardContent = () => {
  const { t } = useTranslation()
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const [loadData, setLoadData] = useState(false)
  const [lotteryId, setLotteryId] = useState<string>(null)
  const [currentLotteryPrize, setCurrentLotteryPrize] = useState<BigNumber>(null)
  const cakePriceBusdAsString = usePriceCakeBusd().toString()

  // const cakePrizesText = t('%cakePrizeInUsd% in XSC prizes this round', { cakePrizeInUsd: cakePriceBusdAsString })
  const cakePrizesText = t('Yield Farming / Staking Online!')
  const [pretext, prizesThisRound] = cakePrizesText.split(cakePriceBusdAsString)

  const cakePriceBusd = useMemo(() => {
    return new BigNumber(cakePriceBusdAsString)
  }, [cakePriceBusdAsString])

  useEffect(() => {
    if (isIntersecting) {
      setLoadData(true)
    }
  }, [isIntersecting])

  useEffect(() => {
    // get current lottery ID
    const fetchCurrentID = async () => {
      const { currentLotteryId } = await fetchCurrentLotteryIdAndMaxBuy()
      setLotteryId(currentLotteryId)
    }

    if (loadData) {
      fetchCurrentID()
    }
  }, [loadData, setLotteryId])

  useSlowRefreshEffect(() => {
    // get public data for current lottery
    const fetchCurrentLotteryPrize = async () => {
      const { amountCollectedInCake } = await fetchLottery(lotteryId)
      const prizeInBusd = cakePriceBusd.times(amountCollectedInCake)
      setCurrentLotteryPrize(prizeInBusd)
    }

    if (lotteryId) {
      fetchCurrentLotteryPrize()
    }
  }, [lotteryId, setCurrentLotteryPrize, cakePriceBusd])

  return (
    <>
      <Flex flexDirection="column" mt="48px">
        <Text color="white" bold fontSize="16px">
          {t('XSC')}
        </Text>
        {pretext && (
          <Text color="white" mt="12px" bold fontSize="16px">
            {pretext}
          </Text>
        )}
        <>
        </>
        <Text color="white" mb="40px">
          {t('Buy XSC with CRYSTAL for extra-low slippage!')}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <StyledLink to="/swap?outputCurrency=0x7155aff27df20f9b0ecf8406a5a60c30043894ec" id="homepage-prediction-cta">
          <Button width="100%">
            <Text bold color="invertedContrast">
              {t('Buy XSC')}
            </Text>
            <ArrowForwardIcon ml="4px" color="invertedContrast" />
          </Button>
        </StyledLink>
      </Flex>
    </>
  )
}

export default LotteryCardContent
