export type Coord = {
  x: number
  y: number
}
export type Atlas = {
  ITRM: Record<string, ValuationTile>
  decentraland?: Record<string, AtlasTile>
}

export type Layer = (
  x: number,
  y: number,
  atlas?: Atlas,
  filter?: MapFilter,
  percentFilter?: PercentFilter
) => Tile | null

export type Tile = {
  color: string
  top?: boolean
  left?: boolean
  topLeft?: boolean
  scale?: number
}

export type AtlasTile = {
  x: number
  y: number
  type: number
  district_id?: number
  estate_id?: number
  left?: number
  top?: number
  topLeft?: number
  price?: number
}

type valuationTransfer = {
  timestamp: number
  time: string
  price: number
  priceUsd: number
  owner: string
}

// This is how the End Valuation Tile looks, some information is added after the API Request
export type ValuationTile = {
  predicted_price: number
  eth_predicted_price: number
  history?: valuationTransfer[]
  variation_last_week: number
  variation_last_four_weeks: number
  variation_last_six_months: number
  manipulation_index: number
  suggested_operation?: string
  coords: { x: number; y: number }
  current_price_eth?: number
  best_offered_price_eth?: number
  percent?: number
  land_id?: string
  watchlist?: boolean
  portfolio?: boolean
  images: { image_url: string }
  owner: string
  external_link: string
}
// export type ValidFilter =

export type MapFilter =
  | 'eth_predicted_price'
  | 'variation_last_week'
  | 'variation_last_four_weeks'
  | 'variation_last_six_months'
  | 'price_difference'
  | 'transfers'
  | 'basic'
  | 'listed_lands'

export type HeatmapSize = {
  maxX: number
  maxY: number
  minX: number
  minY: number
  initialY: number
  initialX: number
}

/**
 * Percent Filter triggers when a user clicks on a colored squared.
 * Once clicked, only the lands on that percentage/number range will display
 */
export type PercentFilter = 20 | 40 | 60 | 80 | 100 | undefined

// For Clicks and Searches
export type LandCoords = { x?: string | number; y?: string | number }
