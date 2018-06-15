import React from 'react'

//{`playertile ${props.position ? `tile-${props.position}` : null}`}
const Tile = props => {
  const tile = props.tile
  return (
    <img
      className="playertile"
      onClick={(props.onClick) ? () => props.onClick(props.index) : null}
      src={tile.imgUrl}
    />
  )
}

export default Tile
