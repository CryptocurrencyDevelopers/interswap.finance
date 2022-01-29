import { useEffect, useState } from 'react'

type ApiResponse = {
   binancecoin: {
    [usd: string]: string
  }
}

/**
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/pancakeswap/gatsby-pancake-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */
const api = 'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd'

const useGetCGPriceData = () => {
  const [data, setData] = useState<ApiResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api)
        // get bnb price    
        const res: ApiResponse = await response.json()      /// => res.data.price
        // @ts-ignore
        // eslint-disable-next-line no-console
        console.log("bnb: ",res.binancecoin.usd)
        setData(res.binancecoin.usd)
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}

export default useGetCGPriceData