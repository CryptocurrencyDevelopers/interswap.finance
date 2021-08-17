import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useWalletModalToggle } from 'state/application/hooks';
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks';
import { TransactionDetails } from 'state/transactions/reducer'
import { shortenAddress, addMaticToMetamask } from 'utils';
import useENSName from 'hooks/useENSName';
import { WalletModal } from 'components';
import { useActiveWeb3React } from 'hooks';
import StatusIcon from 'components/AccountDetails/StatusIcon';
import QuickLogo from 'assets/images/quickLogo.svg';
import { ReactComponent as PolygonIcon } from 'assets/images/Currency/Polygon.svg';
import { ReactComponent as QuickIcon } from 'assets/images/quickIcon.svg';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  header: {
    padding: '0 40px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    minHeight: 88,
    justifyContent: 'space-between',
    '& a': {
      display: 'flex'
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
              marginRight: 8
            }
          },
          '&:last-child': {
            padding: '0 32px'
          },
          '& p': {
            fontSize: 16
          }
        }
      }
    }
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
      color: 'rgba(255, 255, 255, 0.87)'
    }
  },
  mainMenu: {
    display: 'flex',
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
      color: 'white',
      marginRight: 20,
      '&:last-child': {
        marginRight: 0
      }
    },
    [breakpoints.down('sm')]: {
      display: 'none !important'
    }
  },
  accountDetails: {
    border: `1px solid ${palette.divider}`,
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    '& > div': {
      display: 'flex',
      '& button': {
        display: 'none'
      }
    },
    '& img': {
      width: 20,
      marginRight: 6
    }
  }
}));

const newTransactionsFirst = (a: TransactionDetails, b: TransactionDetails) => {
  return b.addedTime - a.addedTime
}

const Header: React.FC = () => {
  const classes = useStyles();
  const { account } = useActiveWeb3React();
  const { ENSName } = useENSName(account ?? undefined)
  const { ethereum } = (window as any);
  const allTransactions = useAllTransactions();
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions]);

  const pending = sortedRecentTransactions.filter((tx: any) => !tx.receipt).map((tx: any) => tx.hash)
  const confirmed = sortedRecentTransactions.filter((tx: any) => tx.receipt).map((tx: any) => tx.hash)
  const isnotMatic = ethereum && ethereum.isMetaMask && Number(ethereum.chainId) !== 137;
  const toggleWalletModal = useWalletModalToggle();
  const menuItems = [
    {
      link: '/',
      text: 'EXCHANGE'
    },
    {
      link: '/',
      text: 'Rewards',
    },
    {
      link: '/',
      text: 'ANALYTICS',
    },
    {
      link: '/',
      text: 'DEVELOPERS',
    },
    {
      link: '/',
      text: 'IDO',
    },
    {
      link: '/',
      text: 'ABOUT'
    }
  ]

  return (
    <Box className={classes.header}>
      <Box>
        <Link to='/'>
          <img src={QuickLogo} alt='QuickLogo' />
        </Link>
        <Box className={classes.networkWrapper}>
          <PolygonIcon />
          <Typography>Polygon</Typography>
        </Box>
      </Box>
      <Box className={classes.mainMenu}>
        {
          menuItems.map((val, index) => (
            <Link to={val.link} key={index}>
              <Typography>{ val.text }</Typography>
            </Link>
          ))
        }
      </Box>
      <Box>
        <Button variant='contained' color='secondary'>
          <QuickIcon />
          <Typography>Buy Quick</Typography>
        </Button>
        {
          account ? 
            <Box className={classes.accountDetails} onClick={toggleWalletModal}><StatusIcon /><Typography>{ shortenAddress(account) }</Typography></Box>
            :
            <Button color='primary' onClick={() => { isnotMatic ? addMaticToMetamask() : toggleWalletModal() }}>
              <Typography>{ isnotMatic ? 'Switch to Matic' : 'Connect' }</Typography>
            </Button>  
        }
      </Box>
      <WalletModal ENSName={ENSName ?? undefined} pendingTransactions={pending} confirmedTransactions={confirmed} />
    </Box>
  );
};

export default Header;