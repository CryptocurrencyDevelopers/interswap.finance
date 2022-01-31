import React, { useState, useMemo } from 'react';
import { TransactionResponse } from '@ethersproject/providers';
import { Box, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useStakingInfo, useOldStakingInfo } from 'state/stake/hooks';
import { JSBI, TokenAmount, Pair } from '@uniswap/sdk';
import { unwrappedToken } from 'utils/wrappedCurrency';
import { usePairContract, useStakingContract } from 'hooks/useContract';
import { useDerivedStakeInfo } from 'state/stake/hooks';
import { useTransactionAdder } from 'state/transactions/hooks';
import { useTokenBalance } from 'state/wallet/hooks';
import { CurrencyLogo } from 'components';
import { Link } from 'react-router-dom';
import { useActiveWeb3React } from 'hooks';
import useTransactionDeadline from 'hooks/useTransactionDeadline';
import { useApproveCallback, ApprovalState } from 'hooks/useApproveCallback';
import { getAPYWithFee, returnTokenFromKey } from 'utils';

const useStyles = makeStyles(({ palette }) => ({
  inputVal: {
    backgroundColor: palette.secondary.contrastText,
    borderRadius: '10px',
    height: '50px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& input': {
      flex: 1,
      background: 'transparent',
      border: 'none',
      boxShadow: 'none',
      outline: 'none',
      fontSize: 16,
      fontWeight: 600,
      color: palette.text.primary,
    },
    '& p': {
      cursor: 'pointer',
    },
  },
  buttonToken: {
    backgroundColor: palette.grey.A400,
    borderRadius: '10px',
    height: '50px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  buttonClaim: {
    backgroundImage:
      'linear-gradient(280deg, #64fbd3 0%, #00cff3 0%, #0098ff 10%, #004ce6 100%)',
    borderRadius: '10px',
    height: '50px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'white',
  },
}));

const FarmLPCardDetails: React.FC<{
  pair: Pair | null | undefined;
  dQuicktoQuick: number;
  stakingAPY: number;
}> = ({ pair, dQuicktoQuick, stakingAPY }) => {
  const classes = useStyles();
  const { palette, breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('xs'));
  const [stakeAmount, setStakeAmount] = useState('');
  const [attemptStaking, setAttemptStaking] = useState(false);
  const [attemptUnstaking, setAttemptUnstaking] = useState(false);
  const [attemptClaiming, setAttemptClaiming] = useState(false);
  const [approving, setApproving] = useState(false);
  const [unstakeAmount, setUnStakeAmount] = useState('');

  const stakingInfos = useStakingInfo(pair);
  const oldStakingInfos = useOldStakingInfo(pair);
  const stakingInfo = useMemo(
    () =>
      stakingInfos && stakingInfos.length > 0
        ? stakingInfos[0]
        : oldStakingInfos && oldStakingInfos.length > 0
        ? oldStakingInfos[0]
        : null,
    [stakingInfos, oldStakingInfos],
  );

  const token0 = stakingInfo ? stakingInfo.tokens[0] : undefined;
  const token1 = stakingInfo ? stakingInfo.tokens[1] : undefined;

  const { account, library, chainId } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();

  const currency0 = token0 ? unwrappedToken(token0) : undefined;
  const currency1 = token1 ? unwrappedToken(token1) : undefined;
  const baseTokenCurrency = stakingInfo
    ? unwrappedToken(stakingInfo.baseToken)
    : null;
  const empty = unwrappedToken(returnTokenFromKey('EMPTY'));
  const quickPriceUSD = stakingInfo?.quickPrice;

  // get the color of the token
  const baseToken =
    baseTokenCurrency === empty ? token0 : stakingInfo?.baseToken;

  const userLiquidityUnstaked = useTokenBalance(
    account ?? undefined,
    stakingInfo?.stakedAmount.token,
  );

  let valueOfMyStakedAmountInBaseToken: TokenAmount | undefined;
  let valueOfUnstakedAmountInBaseToken: TokenAmount | undefined;
  if (stakingInfo && stakingInfo.totalSupply && pair && baseToken) {
    valueOfMyStakedAmountInBaseToken = new TokenAmount(
      baseToken,
      JSBI.divide(
        JSBI.multiply(
          JSBI.multiply(
            stakingInfo.stakedAmount.raw,
            pair.reserveOf(baseToken).raw,
          ),
          JSBI.BigInt(2), // this is b/c the value of LP shares are ~double the value of the WETH they entitle owner to
        ),
        stakingInfo.totalSupply.raw,
      ),
    );

    if (userLiquidityUnstaked) {
      valueOfUnstakedAmountInBaseToken = new TokenAmount(
        baseToken,
        JSBI.divide(
          JSBI.multiply(
            JSBI.multiply(
              userLiquidityUnstaked.raw,
              pair.reserveOf(baseToken).raw,
            ),
            JSBI.BigInt(2),
          ),
          stakingInfo.totalSupply.raw,
        ),
      );
    }
  }

  // get the USD value of staked WETH
  const USDPrice = stakingInfo?.usdPrice;

  const valueOfMyStakedAmountInUSDC =
    valueOfMyStakedAmountInBaseToken &&
    USDPrice?.quote(valueOfMyStakedAmountInBaseToken);

  const valueOfUnstakedAmountInUSDC =
    valueOfUnstakedAmountInBaseToken &&
    USDPrice?.quote(valueOfUnstakedAmountInBaseToken);

  let apyWithFee: number | string = 0;

  if (
    stakingInfo &&
    stakingInfo.perMonthReturnInRewards &&
    stakingAPY &&
    stakingAPY > 0
  ) {
    apyWithFee = getAPYWithFee(stakingInfo.perMonthReturnInRewards, stakingAPY);

    if (apyWithFee > 100000000) {
      apyWithFee = '>100000000';
    } else {
      apyWithFee = Number(apyWithFee.toFixed(2)).toLocaleString();
    }
  }

  const stakingContract = useStakingContract(stakingInfo?.stakingRewardAddress);

  const { parsedAmount: unstakeParsedAmount } = useDerivedStakeInfo(
    unstakeAmount,
    stakingInfo?.stakedAmount.token,
    stakingInfo?.stakedAmount,
  );

  const onWithdraw = async () => {
    if (stakingInfo && stakingContract && unstakeParsedAmount) {
      setAttemptUnstaking(true);
      await stakingContract
        .withdraw(`0x${unstakeParsedAmount.raw.toString(16)}`, {
          gasLimit: 300000,
        })
        .then(async (response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Withdraw deposited liquidity`,
          });
          try {
            await response.wait();
            setAttemptUnstaking(false);
          } catch (error) {
            setAttemptUnstaking(false);
          }
        })
        .catch((error: any) => {
          setAttemptUnstaking(false);
          console.log(error);
        });
    }
  };

  const onClaimReward = async () => {
    if (stakingContract && stakingInfo && stakingInfo.stakedAmount) {
      setAttemptClaiming(true);
      await stakingContract
        .getReward({ gasLimit: 350000 })
        .then(async (response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Claim accumulated rewards`,
          });
          try {
            await response.wait();
            setAttemptClaiming(false);
          } catch (error) {
            setAttemptClaiming(false);
          }
        })
        .catch((error: any) => {
          setAttemptClaiming(false);
          console.log(error);
        });
    }
  };

  const { parsedAmount } = useDerivedStakeInfo(
    stakeAmount,
    stakingInfo?.stakedAmount.token,
    userLiquidityUnstaked,
  );
  const deadline = useTransactionDeadline();
  const [approval, approveCallback] = useApproveCallback(
    parsedAmount,
    stakingInfo?.stakingRewardAddress,
  );

  const dummyPair = stakingInfo
    ? new Pair(
        new TokenAmount(stakingInfo.tokens[0], '0'),
        new TokenAmount(stakingInfo.tokens[1], '0'),
      )
    : null;
  const pairContract = usePairContract(
    stakingInfo && stakingInfo.lp && stakingInfo.lp !== ''
      ? stakingInfo.lp
      : dummyPair?.liquidityToken.address,
  );

  const onStake = async () => {
    if (stakingContract && parsedAmount && deadline) {
      setAttemptStaking(true);
      stakingContract
        .stake(`0x${parsedAmount.raw.toString(16)}`, {
          gasLimit: 350000,
        })
        .then(async (response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Deposit liquidity`,
          });
          try {
            await response.wait();
            setAttemptStaking(false);
          } catch (error) {
            setAttemptStaking(false);
          }
        })
        .catch((error: any) => {
          setAttemptStaking(false);
          console.log(error);
        });
    } else {
      throw new Error(
        'Attempting to stake without approval or a signature. Please contact support.',
      );
    }
  };

  const onAttemptToApprove = async () => {
    if (!pairContract || !library || !deadline)
      throw new Error('missing dependencies');
    const liquidityAmount = parsedAmount;
    if (!liquidityAmount) throw new Error('missing liquidity amount');
    setApproving(true);
    try {
      await approveCallback();
      setApproving(false);
    } catch (e) {
      setApproving(false);
    }
  };

  const earnedUSD =
    Number(stakingInfo?.earnedAmount.toSignificant()) *
    dQuicktoQuick *
    Number(quickPriceUSD);

  const earnedUSDStr =
    earnedUSD < 0.001 && earnedUSD > 0
      ? '< $0.001'
      : '$' + earnedUSD.toLocaleString();

  return (
    <Box
      width='100%'
      mt={2.5}
      pl={isMobile ? 2 : 4}
      pr={isMobile ? 2 : 4}
      pt={2}
      display='flex'
      flexDirection='row'
      flexWrap='wrap'
      borderTop='1px solid #444444'
      alignItems='center'
      justifyContent='space-between'
    >
      {stakingInfo && (
        <>
          <Box
            minWidth={250}
            width={isMobile ? 1 : 0.3}
            color={palette.text.secondary}
            my={stakingInfo.ended ? 0 : 1.5}
          >
            {!stakingInfo.ended && (
              <>
                <Box
                  display='flex'
                  flexDirection='row'
                  alignItems='flex-start'
                  justifyContent='space-between'
                >
                  <Typography variant='body2'>In Wallet:</Typography>
                  <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='flex-end'
                    justifyContent='flex-start'
                  >
                    <Typography variant='body2'>
                      {userLiquidityUnstaked
                        ? userLiquidityUnstaked.toSignificant(2)
                        : 0}{' '}
                      LP{' '}
                      <span>
                        (
                        {valueOfUnstakedAmountInUSDC
                          ? Number(
                              valueOfUnstakedAmountInUSDC.toSignificant(2),
                            ) > 0 &&
                            Number(
                              valueOfUnstakedAmountInUSDC.toSignificant(2),
                            ) < 0.001
                            ? '< $0.001'
                            : `$${valueOfUnstakedAmountInUSDC.toSignificant(2)}`
                          : '$0'}
                        )
                      </span>
                    </Typography>
                    <Link
                      to={`/pools?currency0=${
                        token0?.symbol?.toLowerCase() === 'wmatic'
                          ? 'ETH'
                          : token0?.address
                      }&currency1=${
                        token1?.symbol?.toLowerCase() === 'wmatic'
                          ? 'ETH'
                          : token1?.address
                      }`}
                      style={{ color: palette.primary.main }}
                    >
                      Get {currency0?.symbol} / {currency1?.symbol} LP
                    </Link>
                  </Box>
                </Box>
                <Box className={classes.inputVal} mb={2} mt={2} p={2}>
                  <input
                    placeholder='0.00'
                    value={stakeAmount}
                    onChange={(evt: any) => {
                      setStakeAmount(evt.target.value);
                    }}
                  />
                  <Typography
                    variant='body2'
                    style={{
                      color:
                        userLiquidityUnstaked &&
                        userLiquidityUnstaked.greaterThan('0')
                          ? palette.primary.main
                          : palette.text.hint,
                    }}
                    onClick={() => {
                      if (
                        userLiquidityUnstaked &&
                        userLiquidityUnstaked.greaterThan('0')
                      ) {
                        setStakeAmount(userLiquidityUnstaked.toExact());
                      } else {
                        setStakeAmount('');
                      }
                    }}
                  >
                    MAX
                  </Typography>
                </Box>
                <Box
                  className={
                    !approving &&
                    Number(!attemptStaking && stakeAmount) > 0 &&
                    Number(stakeAmount) <=
                      Number(userLiquidityUnstaked?.toExact())
                      ? classes.buttonClaim
                      : classes.buttonToken
                  }
                  mb={2}
                  mt={2}
                  p={2}
                  onClick={async () => {
                    if (
                      !approving &&
                      !attemptStaking &&
                      Number(stakeAmount) > 0 &&
                      Number(stakeAmount) <=
                        Number(userLiquidityUnstaked?.toExact())
                    ) {
                      if (approval === ApprovalState.APPROVED) {
                        onStake();
                      } else {
                        onAttemptToApprove();
                      }
                    }
                  }}
                >
                  <Typography variant='body1'>
                    {attemptStaking
                      ? 'Staking LP Tokens...'
                      : approval === ApprovalState.APPROVED
                      ? 'Stake LP Tokens'
                      : approving
                      ? 'Approving...'
                      : 'Approve'}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
          <Box
            minWidth={250}
            width={isMobile ? 1 : 0.3}
            my={stakingInfo.ended ? 0 : 1.5}
            color={palette.text.secondary}
          >
            <Box
              display='flex'
              flexDirection='row'
              alignItems='flex-start'
              justifyContent='space-between'
            >
              <Typography variant='body2'>My deposits:</Typography>
              <Typography variant='body2'>
                {stakingInfo.stakedAmount.toSignificant(2)} LP{' '}
                <span>
                  (
                  {valueOfMyStakedAmountInUSDC
                    ? Number(valueOfMyStakedAmountInUSDC.toSignificant(2)) >
                        0 &&
                      Number(valueOfMyStakedAmountInUSDC.toSignificant(2)) <
                        0.001
                      ? '< $0.001'
                      : `$${valueOfMyStakedAmountInUSDC.toSignificant(2)}`
                    : '$0'}
                  )
                </span>
              </Typography>
            </Box>
            <Box className={classes.inputVal} mb={2} mt={4.5} p={2}>
              <input
                placeholder='0.00'
                value={unstakeAmount}
                onChange={(evt: any) => {
                  setUnStakeAmount(evt.target.value);
                }}
              />
              <Typography
                variant='body2'
                style={{
                  color:
                    stakingInfo.stakedAmount &&
                    stakingInfo.stakedAmount.greaterThan('0')
                      ? palette.primary.main
                      : palette.text.hint,
                }}
                onClick={() => {
                  if (
                    stakingInfo.stakedAmount &&
                    stakingInfo.stakedAmount.greaterThan('0')
                  ) {
                    setUnStakeAmount(stakingInfo.stakedAmount.toExact());
                  } else {
                    setUnStakeAmount('');
                  }
                }}
              >
                MAX
              </Typography>
            </Box>
            <Box
              className={
                !attemptUnstaking &&
                Number(unstakeAmount) > 0 &&
                Number(unstakeAmount) <=
                  Number(stakingInfo.stakedAmount.toExact())
                  ? classes.buttonClaim
                  : classes.buttonToken
              }
              mb={2}
              mt={2}
              p={2}
              onClick={() => {
                if (
                  !attemptUnstaking &&
                  Number(unstakeAmount) > 0 &&
                  Number(unstakeAmount) <=
                    Number(stakingInfo.stakedAmount.toExact())
                ) {
                  onWithdraw();
                }
              }}
            >
              <Typography variant='body1'>
                {attemptUnstaking
                  ? 'Unstaking LP Tokens...'
                  : 'Unstake LP Tokens'}
              </Typography>
            </Box>
          </Box>
          <Box
            minWidth={250}
            my={1.5}
            width={isMobile ? 1 : 0.3}
            color={palette.text.secondary}
          >
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='space-between'
            >
              <Box mb={1}>
                <Typography variant='body2'>Unclaimed Rewards:</Typography>
              </Box>
              <Box mb={1}>
                <CurrencyLogo currency={returnTokenFromKey('QUICK')} />
              </Box>
              <Box mb={0.5}>
                <Typography variant='body1' color='textSecondary'>
                  {stakingInfo.earnedAmount.toSignificant(2)}
                  <span>&nbsp;dQUICK</span>
                </Typography>
              </Box>
              <Box mb={1}>
                <Typography variant='body2'>{earnedUSDStr}</Typography>
              </Box>
            </Box>
            <Box
              className={
                !attemptClaiming && stakingInfo.earnedAmount.greaterThan('0')
                  ? classes.buttonClaim
                  : classes.buttonToken
              }
              mb={2}
              p={2}
              onClick={() => {
                if (
                  !attemptClaiming &&
                  stakingInfo.earnedAmount.greaterThan('0')
                ) {
                  onClaimReward();
                }
              }}
            >
              <Typography variant='body1'>
                {attemptClaiming ? 'Claiming...' : 'Claim'}
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default FarmLPCardDetails;