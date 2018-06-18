// const wind = {east: 1, south: 2, west: 3, north:4}
// const dragon = {red: 1, white: 2, green: 3}
import {tileSort} from '../classes/deck'
import {getShanten} from '../classes/shanten'
import {checkCalls} from '../classes/calls'
import React from 'react'
import socket from '../socket'
import Tile from './Tile'

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

    socket.on('discard', tile => {
        const calls = checkCalls(tile, this.state.tiles, this.props.active % 4 === this.props.player - 1) 
        const filtered = Object.keys(calls).filter(call => calls[call])
        if (filtered.length){
            console.log('can make call', calls)
            // socket.emit('can make call')
            socket.emit('no call', this.props.room)
        } else {
            socket.emit('no call', this.props.room)
        }
    })

    socket.on('change turn', () => {
        if (this.props.active === this.props.player) this.drawTile()
    })
  }

  drawTile = () => {
    socket.emit('draw', this.props.room)
  }

  discard = index => {
    let tile = this.state.tiles[index]
    this.setState(prevState => {
      prevState.tiles.splice(index, 1)
      tileSort(prevState.tiles)
      return {prevState}
    })
    socket.emit('discard', tile, this.props.room)
    return tile
  }

  render() {
    const hand = this.state.tiles
    const yourTurn = this.props.active === this.props.player
    return (
      <div id="hand-bottom">
        {/* <div id="hand"> */}
        {hand.map((tile, ind) => (
          <Tile
            key={ind}
            index={ind}
            onClick={() => {
              if (yourTurn) this.discard(ind)
            }}
            tile={tile}
          />
        ))}
      </div>
    )
  }
}

{
  /* </div> */
}
{
  /* <button
  type="submit"
  onClick={() => {
    socket.emit('newgame')
    // this.newHand()
    this.drawTile()
  }}
>
  New Hand
</button> */
}
{
  /* <button type="submit" onClick={this.drawTile}>
  Draw
</button> */
}
