import React from 'react'
import socket from '../socket'

class CallOptions extends React.Component {
  makeCall = call => {
    socket.emit('call', this.props.room, this.props.calls[call])
    this.props.updateCalls({})
  }

  pass = () => {
    socket.emit('no call', this.props.room)
    this.props.updateCalls({})
  }

  render() {
    const callOptions = Object.keys(this.props.calls).filter(
      call => this.props.calls[call]
    )
    return (
      <div id="call-options">
        {callOptions.map(option => (
          <button key={option} type="submit" onClick={() => this.makeCall(option)}>
            {option}
          </button>
        ))}
        {callOptions.length ? (
          <button type="submit" onClick={this.pass}>
            No call
          </button>
        ) : null}
      </div>
    )
  }
}

export default CallOptions
