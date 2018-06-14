// const wind = {east: 1, south: 2, west: 3, north:4}
// const dragon = {red: 1, white: 2, green: 3}
import {tileSort} from '../classes/deck'
import {getShanten} from '../classes/shanten'
import React from 'react'
import socket from '../socket'

export default class Hand extends React.Component {
  constructor() {
    super()
    this.state = {
      tiles: []
    }
    socket.on('newhand', tiles => {
      this.setState({tiles: tileSort(tiles)})
    })

    socket.on('draw', tile => {
      this.setState(
        prevState => {
          prevState.tiles.push(tile)
          return {prevState}
        },
        () => getShanten(this.state.tiles)
      )
    })
  }

  newHand = () => {
    socket.emit('newhand')
  }

  drawTile = () => {
    socket.emit('draw')
    console.log(this.state.tiles)
    getShanten(this.state.tiles)
  }

  discard = index => {
    let tile = this.state.tiles[index]
    this.setState(prevState => {
      prevState.tiles.splice(index, 1)
      tileSort(prevState.tiles)
      return {prevState}
    })
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
        <button
          type="submit"
          onClick={() => {
            socket.emit('newgame')
            this.newHand()
            this.drawTile()
          }}
        >
          New Hand
        </button>
        <button type="submit" onClick={this.drawTile}>
          Draw
        </button>
      </div>
    )
  }
}
