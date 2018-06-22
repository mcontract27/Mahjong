import React from 'react'
import socket from '../socket'
import {SideNav, SideNavItem, Button, Row, Input} from 'react-materialize'

class Sidebar extends React.Component {
  constructor() {
    super()
    this.state = {
      rooms: [],
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

  createRoom = () => {
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
        <div id="sidebar">
      <SideNav className="fixed" trigger={<Button>Rooms</Button>}>
        <SideNavItem>
          <Row>
            <Input s={12} label="Room" validate onChange={this.handleChange} />
          </Row>
          <Button onClick={this.createRoom}>Create Room</Button>
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
      </div>
    )
  }
}

export default Sidebar
