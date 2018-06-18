import React from 'react'
import deck from '../classes/deck'
import Hand from './Hand'
import EnemyHand from './EnemyHand'
import Discards from './Discards'
import socket from '../socket'

export default class Table extends React.Component {
  constructor() {
    super()
    this.state = {
      room: '',
      player: 99,
      gamestate: {},
      boardstate: {
        1: {discards: [], handsize: 0},
        2: {discards: [], handsize: 0},
        3: {discards: [], handsize: 0},
        4: {discards: [], handsize: 0},
        wall: [],
        activePlayer: 0
      }
    }

    socket.on('joinedroom', (room, player) => {
      this.setState({room, player})
      console.log(
        `Joined room ${this.state.room} as player ${this.state.player}`
      )
    })

    socket.on('gameready', () => {
      socket.emit('newhand', this.state.room)
      if (this.state.player === this.state.boardstate.activePlayer)
        socket.emit('draw', this.state.room)
    })

    socket.on('update_boardstate', boardstate => {
      this.setState({boardstate})
    })

    socket.on('update_gamestate', gamestate => {
      this.setState({gamestate})
    })

    //check if call can be made
    socket.on('discard', (tile, playerNo) => {
      //   let newDiscards = this.state.discards[playerNo].concat(tile)
      //   this.setState(prevState => {
      //     return {discards: {...prevState.discards, [playerNo]: newDiscards}}
    })
  }

//   componentDidMount() {
//     socket.emit('joinroom', 'Fullstack')
//   }

  render() {
    const player = this.state.player
    return this.state.boardstate.activePlayer ? (
      <div id="table">
        <EnemyHand
          position="top"
          handsize={
            this.state.boardstate[
              player + 2 > 4 ? (player + 2) % 4 : player + 2
            ].handsize
          }
        />
        <Discards
          position="top"
          discards={
            this.state.boardstate[
              player + 2 > 4 ? (player + 2) % 4 : player + 2
            ].discards
          }
        />

        <EnemyHand
          position="left"
          handsize={
            this.state.boardstate[
              player + 3 > 4 ? (player + 3) % 4 : player + 3
            ].handsize
          }
        />
        <Discards
          position="left"
          discards={
            this.state.boardstate[
              player + 3 > 4 ? (player + 3) % 4 : player + 3
            ].discards
          }
        />

        <EnemyHand
          position="right"
          handsize={
            this.state.boardstate[
              player + 1 > 4 ? (player + 1) % 4 : player + 1
            ].handsize
          }
        />
        <Discards
          position="right"
          discards={
            this.state.boardstate[
              player + 1 > 4 ? (player + 1) % 4 : player + 1
            ].discards
          }
        />

        <Discards
          position="bottom"
          discards={this.state.boardstate[player].discards}
        />
        <Hand room={this.state.room} player={this.state.player} active={this.state.boardstate.activePlayer} />
      </div>
    ) : null
  }
}
