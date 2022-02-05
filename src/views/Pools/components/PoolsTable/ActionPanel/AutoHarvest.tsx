import React from 'react'
import { Text, Flex, TooltipText, useTooltip, Skeleton, Heading } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { DeserializedPool } from 'state/types'
import { ActionContainer, ActionTitles, ActionContent } from './styles'

interface AutoHarvestActionProps extends DeserializedPool {
  userDataLoaded: boolean
}

const AutoHarvestAction: React.FunctionComponent<AutoHarvestActionProps> = ({
  userDataLoaded,
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Subtracted automatically from each yield harvest and burned.'),
    { placement: 'bottom-start' },
  )

  const actionTitle = (
    <Text fontSize="12px" bold color="secondary" as="span" textTransform="uppercase">
      {t('Recent XSC profit')}
    </Text>
  )

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <ActionContent>
          <Heading>0</Heading>
        </ActionContent>
      </ActionContainer>
    )
  }

  if (!userDataLoaded) {
    return (
      <ActionContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <ActionContent>
          <Skeleton width={180} height="32px" marginTop={14} />
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer isAutoVault>
      <ActionTitles>{actionTitle}</ActionTitles>
      <ActionContent>
        <Flex flex="1" pt="16px" flexDirection="column" alignSelf="flex-start">
          <>
                <Heading color="textDisabled">0</Heading>
                <Text fontSize="12px" color="textDisabled">
                  0 USD
                </Text>
          </>
        </Flex>
        <Flex flex="1.3" flexDirection="column" alignSelf="flex-start" alignItems="flex-start">
          <Flex mb="2px" justifyContent="space-between" alignItems="center">
            {tooltipVisible && tooltip}
            <TooltipText ref={targetRef} small>
              {t('Performance Fee')}
            </TooltipText>
            <Flex alignItems="center">
              <Text ml="4px" small>
                {0}%
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </ActionContent>
    </ActionContainer>
  )
}

export default AutoHarvestAction
