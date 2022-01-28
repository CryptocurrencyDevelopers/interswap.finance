import React from 'react'
import { Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'
import PageSection from 'components/PageSection'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import Container from 'components/Layout/Container'
import { PageMeta } from 'components/Layout/Page'
import Hero from './components/Hero'
import { swapSectionData, earnSectionData, cakeSectionData } from './components/SalesSection/data'
import MetricsSection from './components/MetricsSection'
import SalesSection from './components/SalesSection'
import WinSection from './components/WinSection'
import FarmsPoolsRow from './components/FarmsPoolsRow'
import Footer from './components/Footer'
import CakeDataRow from './components/CakeDataRow'
import { WedgeTopLeft, InnerWedgeWrapper, OuterWedgeWrapper, WedgeTopRight } from './components/WedgeSvgs'
import UserBanner from './components/UserBanner'
import FarmAuctionsBanner from './components/Banners/FarmAuctionsBanner'

const showBanner = false;
const HomeBanner = ({ account }: { account: string }) => {
  if (!showBanner) {
    return null
  }

  return (
    <Flex
      pt={[account ? '220px' : '0', null, null, account ? '76px' : '0']}
      mt={[account ? '0' : '-16px', null, null, account ? '0' : '-48px']}
      pb="24px"
    >
      <FarmAuctionsBanner />
    </Flex>
  )
}

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;
  .body {
    z-index:-1;
    background: radial-gradient(circle at bottom, navy 0, black 100%);
    height: 100%;
    width: 100%;
    overflow: hidden !important;
  }
  
  .space {
    z-index:0;
    height: 100%;
    width: 100%;
    animation: space 11s ease-out infinite;
    background: rgba(128, 0, 128, 0.1) center / 200px 200px round;
    bottom: 0;
    overflow: hidden !important;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }  
  .spaces {
    z-index:0;
    height: 100%;
    width: 100%;
    animation: space 11s ease-out infinite;
    background: rgba(249,183,80,1) center / 200px 200px round;
    bottom: 0;
    overflow: hidden !important;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
  .spaced {
    z-index:0;
    height: 100%;
    width: 100%;
    animation: space 31s ease-out infinite;
    background: rgba(60,0,102,1) center / 200px 200px round;
    bottom: 0;
    overflow: hidden !important;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
  
  .stars1 {
    z-index:1;
    height: 100%;
    width: 100%;
    overflow: hidden !important;
    animation: space 11s ease-out infinite;
    background-image: 
      radial-gradient(1px 1px at 25px 5px, white, rgba(255, 255, 255, 0)), 
      radial-gradient(1px 1px at 50px 25px, white, rgba(255, 255, 255, 0)), 
      radial-gradient(1px 1px at 125px 20px, white, rgba(255, 255, 255, 0)), 
      radial-gradient(1.5px 1.5px at 50px 75px, white, rgba(255, 255, 255, 0)), 
      radial-gradient(2px 2px at 15px 125px, white, rgba(255, 255, 255, 0)), 
      radial-gradient(2.5px 2.5px at 110px 80px, white, rgba(255, 255, 255, 0));
  }
  
  .stars2 {
    z-index:1;
    height: 100%;
    width: 100%;
    overflow: hidden !important;
    animation: space 22s ease-in infinite;
    background-image: 
      radial-gradient(1px 1px at 75px 125px, white, rgba(255, 255, 255, 0)), 
      radial-gradient(1px 1px at 100px 75px, white, rgba(255, 255, 255, 0)), 
      radial-gradient(1.5px 1.5px at 199px 100px, white, rgba(255, 255, 255, 0)), 
      radial-gradient(2px 2px at 20px 50px, white, rgba(255, 255, 255, 0)), 
      radial-gradient(2.5px 2.5px at 100px 5px, white, rgba(255, 255, 255, 0)), 
      radial-gradient(2.5px 2.5px at 5px 5px, white, rgba(255, 255, 255, 0));
  }
  .containers {
    z-index:-1;
    width: 100%;
    height: 100%;
  }
  .zbutton {
    z-index:100;
  }
  .stars3 {
    z-index:1;
    height: 100%;
    width: 100%;
    animation: space 45s ease-in-out infinite;
    background-image: 
      radial-gradient(1px 1px at 10px 10px, white, rgba(255, 255, 255, 0)), 
      radial-gradient(1px 1px at 150px 150px, white, rgba(255, 255, 255, 0)), 
      radial-gradient(1.5px 1.5px at 60px 170px, white, rgba(255, 255, 255, 0)), 
      radial-gradient(1.5px 1.5px at 175px 180px, white, rgba(255, 255, 255, 0)), 
      radial-gradient(2px 2px at 195px 95px, white, rgba(255, 255, 255, 0)), 
      radial-gradient(2.5px 2.5px at 95px 145px, white, rgba(255, 255, 255, 0));
    overflow: hidden !important;
  }
  
  @keyframes space {
    5% {
      height: 100%;
      width: 100%;
      opacity: 0.05;
    }
    10% {
      height: 100%;
      width: 100%;
      opacity: 0.35;
    }
    20% {
      height: 100%;
      width: 100%;
      opacity: 0.15;
    }
    30% {
      height: 100%;
      width: 100%;
      opacity: 0.25;
    }
    40% {
      height: 100%;
      width: 100%;
      opacity: 0.75;
    }
    50% {
      height: 100%;
      width: 100%;
      opacity: 0.25;
    }
    60% {
      height: 100%;
      width: 100%;
      opacity: 0.80;
    }
    70% {
      height: 100%;
      width: 100%;
      opacity: 0.30;
    }
    80% {
      height: 100%;
      width: 100%;
      opacity: 0.98;
    }
    90% {
      height: 100%;
      width: 100%;
      opacity: 0.88;
    }
    95% {
      height: 100%;
      width: 100%;
      opacity: 0.95;
    }
    100% {
      height: 100%;
      width: 100%;
      opacity: 0.99;
    }
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  }
`

const UserBannerWrapper = styled(Container)`
  z-index: 1;
  position: absolute;
  width: 100%;
  top: 0;
  overflow: hidden;
  left: 50%;
  transform: translate(-50%, 0);
  padding-left: 0px;
  padding-right: 0px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const Home: React.FC = () => {
  const { theme } = useTheme()
  const { account } = useWeb3React()

  const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '968px' }

  return (
    <>
      <PageMeta />
      <StyledHeroSection 
        innerProps={{ style: { margin: '0', width: '100%' } }}
        
        index={2}
        hasCurvedDivider={false}
      >  
        {account && (
          <UserBannerWrapper >
            <UserBanner />
          </UserBannerWrapper>
        )}
        <HomeBanner account={account} />
        <Hero />
      </StyledHeroSection>
      <PageSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        background={
          theme.isDark
            ? 'linear-gradient(180deg, #09070C 22%, #201335 100%)'
            : 'linear-gradient(180deg, #FFFFFF 22%, #D7CAEC 100%)'
        }
        index={2}
        hasCurvedDivider={false}
      >
        <MetricsSection />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={theme.colors.background}
        index={2}
        hasCurvedDivider={false}
      >
        <OuterWedgeWrapper>
          <InnerWedgeWrapper top fill={theme.isDark ? '#201335' : '#D8CBED'}>
            <WedgeTopLeft />
          </InnerWedgeWrapper>
        </OuterWedgeWrapper>
        <SalesSection {...swapSectionData} />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={theme.colors.gradients.cardHeader}
        index={2}
        hasCurvedDivider={false}
      >
        <OuterWedgeWrapper>
          <InnerWedgeWrapper width="150%" top fill={theme.colors.background}>
            <WedgeTopRight />
          </InnerWedgeWrapper>
        </OuterWedgeWrapper>
        <SalesSection {...earnSectionData} />
        <FarmsPoolsRow />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={
          theme.isDark
            ? 'linear-gradient(180deg, #0B4576 0%, #091115 100%)'
            : 'linear-gradient(180deg, #6FB6F1 0%, #EAF2F6 100%)'
        }
        index={2}
        hasCurvedDivider={false}
      >
        <WinSection />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={theme.colors.background}
        index={2}
        hasCurvedDivider={false}
      >
        <SalesSection {...cakeSectionData} />
        <CakeDataRow />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background="linear-gradient(180deg, #7645D9 0%, #5121B1 100%)"
        index={2}
        hasCurvedDivider={false}
      >
        <Footer />
      </PageSection>
    </>
  )
}

export default Home
