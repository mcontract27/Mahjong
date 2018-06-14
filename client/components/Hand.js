// const wind = {east: 1, south: 2, west: 3, north:4}
// const dragon = {red: 1, white: 2, green: 3}
import {tileSort} from '../classes/deck'
import React from 'react'
import socket from '../socket'

export default class Hand extends React.Component {
  constructor() {
    super()
    this.state = {
      tiles: []
    }
  }

  newHand = () => {
    this.setState({tiles: tileSort(this.props.deck.draw(13))})
  }

  drawTile = () => {
    const tile = this.props.deck.draw()[0]
    this.setState(prevState => {
      prevState.tiles.push(tile)
      return {prevState}
    })
    console.log(this.state)
  }

  discard = index => {
    let tile = this.state.tiles[index]
    this.setState(prevState => {
      prevState.tiles.splice(index, 1)
      tileSort(prevState.tiles)
      return {prevState}
    })
    console.log(tile)
    socket.emit('discard', tile)
    return tile
  }

  componentDidMount = () => {
    if (this.props.deck) this.newHand()
  }

  render() {
    const hand = this.state.tiles
    return (
      <div>
        <div id="hand">
          {hand.map((tile, ind) => (
            <img
              className="playertile"
              key={ind}
              onClick={() => {
                this.discard(ind)
                this.drawTile()
              }}
              src={tile.imgUrl}
            />
          ))}
        </div>
        <button type="submit" onClick={this.drawTile}>
          Draw
        </button>
      </div>
    )
  }
}
