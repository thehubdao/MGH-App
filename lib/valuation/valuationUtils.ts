import { Metaverse } from '../enums'
import { ellipseAddress } from '../utilities'
import { ICoinPrices, IPriceCard } from './valuationTypes'

export const convertETHPrediction = (
  coinPrices: ICoinPrices,
  ethPrediction: number
) => {
  const ethUSD = coinPrices.ethereum.usd
  const sandUSD = coinPrices['the-sandbox'].usd
  const usdPrediction = ethPrediction * ethUSD
  const sandPrediction = usdPrediction / sandUSD
  return { ethPrediction, usdPrediction, sandPrediction }
}

export const convertMANAPrediction = (
  coinPrices: ICoinPrices,
  manaPrediction: number
) => {
  const ethUSD = coinPrices.ethereum.usd
  const manaUSD = coinPrices.decentraland.usd
  const usdPrediction = manaPrediction * manaUSD
  const ethPrediction = usdPrediction / ethUSD
  return { ethPrediction, usdPrediction, manaPrediction }
}

// Get Price Predictions for Single Land Asset
export const getLandData = async (tokenID: number, metaverse: Metaverse) => {
  try {
    const predictionRes = await fetch('/api/getLandData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tokenID: tokenID,
        metaverse: metaverse,
      }),
    })
    const data = await predictionRes.json()
    return data
  } catch (e) {
    console.log(e)
  }
}

/* Formatting a Land Asset received from OpenSea into our Cards.
 The asset: any comes from the OpenSea API*/
export const formatLandAsset = async (asset: any, coinPrices: ICoinPrices) => {
  const formattedAsset = {
    apiData: {
      metaverse: Metaverse.SANDBOX,
      name: asset.name,
      opensea_link: asset.permalink,
      external_link: asset.external_link,
      images: { image_url: asset.image_original_url },
      tokenId: asset.token_id,
    },
    showCard: true,
    processing: false,
  }
  const predictions = await getLandData(
    formattedAsset.apiData.tokenId,
    formattedAsset.apiData.metaverse
  )

  Object.defineProperty(formattedAsset, 'predictions', {
    value: convertETHPrediction(coinPrices, predictions.prices.predicted_price),
  })
  return formattedAsset as IPriceCard
}

// Formatting Token Id if its too long
export const handleTokenID = (tokenID: number) => {
  if (tokenID.toString().length > 6) {
    return ellipseAddress(tokenID.toString(), 3)
  } else {
    return tokenID
  }
}

/* Getting current asset price from OpenSea. (orders: any[]) 
  refers to the array of orders we get from each asset */
export function getBoundaryPrices(orders: any[]) {
  let currentPrice: number | undefined
  let bestOfferedPrice: number | undefined

  let result = {
    current_price: currentPrice,
    best_offered_price: bestOfferedPrice,
  }

  if (orders !== undefined) {
    for (let order of orders) {
      let value = getPrice(order)
      if (order.side == 0)
        result.best_offered_price = result.best_offered_price
          ? Math.max(result.best_offered_price, value)
          : value
      else if (order.side == 1 && order.static_extradata === '0x')
        result.current_price = result.current_price
          ? Math.min(result.current_price, value)
          : value
    }
  }
  return result
}
function getPrice(order: any) {
  if (order.payment_token_contract.symbol === 'USDC')
    return (order.current_price / 1e6) * order.payment_token_contract.eth_price
  if (order.payment_token_contract.symbol === 'SAND')
    return (
      (order.current_price / 1e18) * 3 * order.payment_token_contract.eth_price
    )
  return (order.current_price / 1e18) * order.payment_token_contract.eth_price
}