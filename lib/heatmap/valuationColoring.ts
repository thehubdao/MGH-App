import { ValuationTile } from './commonTypes'

export const getAverage = (array: number[]) => {
  const max = Math.max(...array.sort((a, b) => a + b).slice(1))
  const sum = array.reduce((prev, current) => prev + current)
  const average = sum / array.length
  return { max, average }
}

export const getPercentage = (partialValue: number, totalValue: number) => {
  return parseInt(((partialValue * 100) / totalValue).toFixed(0))
}

export const setColours = (valuationAtlas: Record<string, ValuationTile>) => {
  const predictions = Object.keys(valuationAtlas).map(
    (valuation) => valuationAtlas[valuation].eth_predicted_price
  )
  const { max, average } = getAverage(predictions)
  Object.keys(valuationAtlas).forEach((valuation) => {
    const percent = getPercentage(
      valuationAtlas[valuation].eth_predicted_price,
      max
    )
    valuationAtlas[valuation] = {
      ...valuationAtlas[valuation],
      percent: percent,
    }
  })
}

export const getTileColor = (percent: number) => {
  if (percent <= 100 && percent > 20) return 'rgb(255,0,0)'
  if (percent < 20 && percent > 15) return 'rgb(255,137,0)'
  if (percent < 15 && percent > 10) return 'rgb(255,255,0)'
  if (percent < 10 && percent > 5) return 'rgb(0,255,0)'
  if (percent < 5) return 'rgb(0,255,255)'
  else return 'rgb(255,255,255)'
}