import React from 'react'
import socket from '../socket'
import {SideNav, SideNavItem, Button, Row, Input} from 'react-materialize'

class Sidebar extends React.Component {
  constructor() {
    super()
    this.state = {
      rooms: [],
      current: [],
      newRoom: ''
    }

    socket.on('open rooms', rooms => {
      this.setState({rooms})
    })
  }

  componentDidMount = () => {
      this.getRooms()
  }

  getRooms = () => {
    socket.emit('get available rooms')
  }

  createRoom = event => {
    socket.emit('joinroom', this.state.newRoom)
  }

  joinRoom = room => {
    socket.emit('joinroom', room)
  }

  handleChange = event => {
    this.setState({newRoom: event.target.value})
  }

  render() {
    return (
      <SideNav className="fixed" trigger={<Button>Rooms</Button>}>
        <SideNavItem>
          <Row>
            <Input s={12} label="Room" validate onChange={this.handleChange} />
          </Row>
          <Button onClick={this.createRoom}>Create Room</Button>
          {/* <form className="col s12" onSubmit={this.joinRoom}>
            <div className="row">
              <div className="input-field col s12">
                <input id="roomName" type="text" className="validate" />
                <label htmlFor="roomName">Create a new room!</label>
              </div>
            </div>
          </form> */}
        </SideNavItem>
        <SideNavItem divider />
        <SideNavItem>
          <Button onClick={this.getRooms}>Find available rooms</Button>
        </SideNavItem>
        {this.state.rooms.map(room => (
          <SideNavItem onClick={() => this.joinRoom(room[0])}>{`${room[0]}: ${
            room[1]
          } players`}</SideNavItem>
        ))}
      </SideNav>
    )
  }
}

export default Sidebar
