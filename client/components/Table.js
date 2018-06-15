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
      player: -1,
      discards: {1: [], 2: [], 3: [], 4: []}
    }
    socket.on('joinedroom', (room, player) => {
      this.setState({room, player})
      console.log(
        `Joined room ${this.state.room} as player ${this.state.player}`
      )
      if (player === 4) socket.emit('newgame', room)
    })

    socket.on('discard', (tile, playerNo) => {
      let newDiscards = this.state.discards[playerNo].concat(tile)
      this.setState(prevState => {
        return {discards: {...prevState.discards, [playerNo]: newDiscards}}
      })
    })
  }

  componentDidMount() {
    socket.emit('joinroom', 'Fullstack')
  }

  render() {
    const player = this.state.player
    return (
      <div>
        <EnemyHand position="top" />
        <Discards
          position="top"
          discards={
            this.state.discards[player + 2 > 4 ? (player + 2) % 4 : player + 2]
          }
        />
        <EnemyHand position="left" />

        <Discards
          position="left"
          discards={
            this.state.discards[player + 3 > 4 ? (player + 3) % 4 : player + 3]
          }
        />
        <EnemyHand position="right" />

        <Discards
          position="right"
          discards={
            this.state.discards[player + 1 > 4 ? (player + 1) % 4 : player + 1]
          }
        />
        <Discards position="bottom" discards={this.state.discards[player]} />
        <Hand room={this.state.room} />
      </div>
    )
  }
}
