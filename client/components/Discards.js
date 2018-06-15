import React from 'react'
import socket from '../socket'
import Tile from './Tile'

export default class Discards extends React.Component {
  // constructor(){
  //     super()
  //     this.state = {
  //         tiles: []
  //     }
  // }

  render() {
    const tiles = this.props.discards ? this.props.discards : []
    return (
      <div id={`discards-${this.props.position}`}>
        {tiles.map(tile => <Tile position={this.props.position} tile={tile} />)}
      </div>
    )
  }
}