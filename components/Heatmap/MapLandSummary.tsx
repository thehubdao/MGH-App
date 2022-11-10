import React from 'react'
import { Metaverse } from '../../lib/metaverse'
import { handleLongLandName, typedKeys } from '../../lib/utilities'

interface Props {
  coordinates: { x: number; y: number }
  metaverse: Metaverse
  owner?: string
  name?: string
}

const MapLandSummary = ({ name, owner, coordinates, metaverse }: Props) => {
  return (
    <div className='gray-box bg-[#F9FAFB] flex flex-col gap-2 text-sm overflow-auto'>
      <div className='flex gap-4'>
        {typedKeys(coordinates).map((coord) => (
          <span
            key={coord}
            className='text-grey-content font-light whitespace-nowrap text-base'
          >
            {coord.toUpperCase()}:{' '}
            {isNaN(coordinates[coord]) ? 'xx' : coordinates[coord]}
          </span>
        ))}
      </div>

      {metaverse !== 'sandbox' && (
        <>
          {metaverse === 'decentraland' && (
            <p className='text-grey-content font-light text-base whitespace-nowrap'>
              {name
                ? handleLongLandName(name, 13)
                : `Parcel ${coordinates.x}, ${coordinates.y}`}
            </p>
          )}
          <p className='text-grey-content font-light font-plus whitespace-nowrap'>
            Owner: {owner ? owner : 'None'}
          </p>
        </>
      )}
    </div>
  )
}

export default MapLandSummary
