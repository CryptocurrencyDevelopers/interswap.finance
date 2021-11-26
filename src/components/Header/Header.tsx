import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Button, Typography, useMediaQuery } from '@material-ui/core';
import cx from 'classnames';
import Hamburger from 'hamburger-react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useWalletModalToggle } from 'state/application/hooks';
import {
  isTransactionRecent,
  useAllTransactions,
} from 'state/transactions/hooks';
import { TransactionDetails } from 'state/transactions/reducer';
import { shortenAddress, addMaticToMetamask } from 'utils';
import useENSName from 'hooks/useENSName';
import { WalletModal } from 'components';
import { useActiveWeb3React } from 'hooks';
import QuickLogo from 'assets/images/quickLogo.svg';
import { ReactComponent as ThreeDotIcon } from 'assets/images/ThreeDot.svg';
import { ReactComponent as LightIcon } from 'assets/images/LightIcon.svg';
import WalletIcon from 'assets/images/WalletIcon.png';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  header: {
    padding: '0 40px',
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    minHeight: 88,
    zIndex: 3,
    justifyContent: 'space-between',
    '& a': {
      display: 'flex',
    },
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      zIndex: 2,
      '&:last-child': {
        '& button': {
          height: 40,
          borderRadius: 20,
          '&:first-child': {
            padding: '0 16px',
            marginRight: 16,
            '& svg': {
              width: 20,
              height: 20,
              marginRight: 8,
            },
          },
          '&:last-child': {
            padding: '0 32px',
          },
          '& p': {
            fontSize: 16,
          },
        },
      },
    },
    [breakpoints.down('xs')]: {
      padding: '0 16px',
    },
  },
  networkWrapper: {
    marginLeft: 16,
    padding: '0 12px',
    height: 26,
    borderRadius: 13,
    display: 'flex',
    alignItems: 'center',
    background: palette.primary.dark,
    '& p': {
      marginLeft: 6,
      textTransform: 'uppercase',
      fontSize: 13,
      color: 'rgba(255, 255, 255, 0.87)',
    },
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  mainMenu: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    '& .menuItem': {
      borderRadius: 10,
      cursor: 'pointer',
      position: 'relative',
      '& .subMenu': {
        display: 'none',
        position: 'absolute',
        left: 0,
        top: 14,
        background: '#1b1e29',
        borderRadius: 10,
        padding: '14px 0',
        '& > a': {
          padding: '10px 24px',
          '&:hover': {
            color: 'white',
          },
        },
      },
      '&:hover': {
        background: '#1b1e29',
        '& .subMenu': {
          display: 'block',
        },
      },
    },
    '& a': {
      textDecoration: 'none',
      padding: '7.5px 24px',
      marginRight: 12,
      color: '#696c80',
      borderRadius: 10,
      '& p': {
        letterSpacing: 'normal',
      },
      '&.active': {
        color: '#ebecf2',
        background: '#1b1e29',
      },
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
  accountDetails: {
    border: `solid 1px #3e4252`,
    padding: '0 16px',
    height: 36,
    cursor: 'pointer',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& p': {
      fontSize: 14,
      fontWeight: 600,
    },
    '& img': {
      width: 20,
      marginLeft: 8,
    },
  },
  mobileMenuWrapper: {
    background: 'white',
    position: 'absolute',
    top: 80,
    left: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& a': {
      textDecoration: 'none',
    },
    '& button': {
      width: 'calc(100% - 24px)',
      margin: '8px 12px',
    },
  },
  mobileMenuItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '4px 0',
    height: 32,
    width: '100%',
    '& p': {
      color: palette.primary.dark,
    },
    '& svg, & img': {
      width: 32,
      height: 32,
      marginRight: 8,
    },
  },
  menuTransition: {
    height: 0,
    transition: 'height 0.5s',
    overflow: 'auto',
  },
  menuOpen: {
    height: 'calc(100vh - 80px)',
  },
  connectButton: {
    width: 152,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 600,
    color: 'white',
    cursor: 'pointer',
    position: 'relative',
    '&:hover $wrongNetworkContent': {
      display: 'block',
    },
  },
  primary: {
    backgroundColor: '#004ce6',
  },
  danger: {
    backgroundColor: '#ff5252',
  },
  wrongNetworkContent: {
    background: '#1b1e29',
    borderRadius: 10,
    padding: 24,
    display: 'none',
    '& p': {
      color: '#b6b9cc',
      fontSize: 14,
      lineHeight: 1.57,
      marginBottom: 20,
    },
    '& div': {
      width: '100%',
      height: 36,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      border: 'solid 1px #448aff',
      color: '#448aff',
      fontSize: 14,
      fontWeight: 600,
    },
  },
}));

const newTransactionsFirst = (a: TransactionDetails, b: TransactionDetails) => {
  return b.addedTime - a.addedTime;
};

const Header: React.FC = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { account } = useActiveWeb3React();
  const { ENSName } = useENSName(account ?? undefined);
  const { ethereum } = window as any;
  const theme = useTheme();
  const allTransactions = useAllTransactions();
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
  }, [allTransactions]);

  const pending = sortedRecentTransactions
    .filter((tx: any) => !tx.receipt)
    .map((tx: any) => tx.hash);
  const confirmed = sortedRecentTransactions
    .filter((tx: any) => tx.receipt)
    .map((tx: any) => tx.hash);
  const isnotMatic =
    ethereum && ethereum.isMetaMask && Number(ethereum.chainId) !== 137;
  const mobileWindowSize = useMediaQuery(theme.breakpoints.down('sm'));
  const toggleWalletModal = useWalletModalToggle();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = [
    {
      link: '/swap',
      text: 'Swap',
    },
    {
      link: '/pools',
      text: 'Pool',
    },
    {
      link: '/farm',
      text: 'Farm',
    },
    {
      link: '/dragons',
      text: 'Dragons Den',
    },
    {
      link: '/analytics',
      text: 'Analytics',
    },
  ];

  const outLinks = [
    {
      link: '/',
      text: 'Governance',
    },
    {
      link: '/',
      text: 'Docs',
    },
    {
      link: '/',
      text: 'For Developers',
    },
    {
      link: '/',
      text: 'Help & Tutorials',
    },
    {
      link: '/',
      text: 'Knowledge Base',
    },
    {
      link: '/',
      text: 'News',
    },
  ];

  return (
    <Box className={classes.header}>
      <WalletModal
        ENSName={ENSName ?? undefined}
        pendingTransactions={pending}
        confirmedTransactions={confirmed}
      />
      <Link to='/'>
        <img src={QuickLogo} alt='QuickLogo' />
      </Link>
      {!mobileWindowSize && (
        <Box className={classes.mainMenu}>
          {menuItems.map((val, index) => (
            <Link
              to={val.link}
              key={index}
              className={val.link === pathname ? 'active' : 'menuItem'}
            >
              <Typography variant='body2'>{val.text}</Typography>
            </Link>
          ))}
          <Box display='flex' className='menuItem'>
            <ThreeDotIcon />
            <Box
              position='absolute'
              top={32}
              left={0}
              width={209}
              paddingTop={10}
            >
              <Box className='subMenu'>
                {outLinks.map((item, ind) => (
                  <a href={item.link} key={ind}>
                    <Typography variant='body2'>{item.text}</Typography>
                  </a>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {mobileWindowSize ? (
        <Hamburger toggled={menuOpen} toggle={setMenuOpen} />
      ) : (
        <Box>
          <Box
            width={36}
            height={36}
            display='flex'
            alignItems='center'
            justifyContent='center'
            marginRight={1}
          >
            <LightIcon />
          </Box>
          {account ? (
            <Box className={classes.accountDetails} onClick={toggleWalletModal}>
              <Typography>{shortenAddress(account)}</Typography>
              <img src={WalletIcon} alt='Wallet' />
            </Box>
          ) : (
            <Box
              className={cx(
                classes.connectButton,
                isnotMatic ? classes.danger : classes.primary,
              )}
              onClick={() => {
                if (!isnotMatic) {
                  toggleWalletModal();
                }
              }}
            >
              {isnotMatic ? 'Wrong Network' : 'Connect Wallet'}
              {isnotMatic && (
                <Box
                  position='absolute'
                  top={36}
                  width={272}
                  right={0}
                  paddingTop='18px'
                >
                  <Box className={classes.wrongNetworkContent}>
                    <Typography variant='body2'>
                      Please switch your wallet to Polygon Network.
                    </Typography>
                    <Box onClick={addMaticToMetamask}>Switch to Matic</Box>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
      {mobileWindowSize && (
        <Box
          className={cx(
            classes.mobileMenuWrapper,
            classes.menuTransition,
            menuOpen && classes.menuOpen,
          )}
        >
          {menuItems.map((val, index) => (
            <Box key={index} className={classes.mobileMenuItemWrapper}>
              <Link to={val.link} key={index}>
                <Typography variant='body2'>{val.text}</Typography>
              </Link>
            </Box>
          ))}
          {account ? (
            <Box
              className={classes.mobileMenuItemWrapper}
              onClick={toggleWalletModal}
            >
              <img src={WalletIcon} alt='Wallet' />
              <Typography variant='body2'>{shortenAddress(account)}</Typography>
            </Box>
          ) : (
            <Button
              color='primary'
              onClick={() => {
                isnotMatic ? addMaticToMetamask() : toggleWalletModal();
              }}
            >
              <Typography variant='body2'>
                {isnotMatic ? 'Switch to Matic' : 'Connect Wallet'}
              </Typography>
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Header;