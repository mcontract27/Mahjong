import React from 'react'

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
