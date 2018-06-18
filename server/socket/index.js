const deck = require('../classes/deck')

let rooms = {}
// const freshBoardState = {
//   1: {discards: [], calls: []},
//   2: {discards: [], calls: []},
//   3: {discards: [], calls: []},
//   4: {discards: [], calls: []},
//   wall: []
// }

const newRound = (roomName, io) => {
  const room = rooms[roomName]
  const freshBoardState = {
    1: {discards: [], calls: [], handsize: 13},
    2: {discards: [], calls: [], handsize: 13},
    3: {discards: [], calls: [], handsize: 13},
    4: {discards: [], calls: [], handsize: 13},
    wall: [],
    activePlayer: 0,
    activeDiscard: {}
  }
  room.deck.newDeck()
  room.gamestate.turn++
  room.gamestate.dealer = room.gamestate.dealer % 4 + 1
  io.in(roomName).emit('update_gamestate', room.gamestate)
  room.boardstate = freshBoardState
  room.boardstate.activePlayer = room.gamestate.dealer
  io.in(roomName).emit('update_boardstate', room.boardstate)
  io.in(roomName).emit('gameready')
}

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    // rooms[socket.id] = {deck: new deck(true)}

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('get available rooms', () => {
      let openRooms = Object.keys(rooms)
      openRooms = openRooms.filter(room => rooms[room].players.length < 4)
      openRooms = openRooms.map(room => [room, rooms[room].players.length])
      socket.emit('open rooms', openRooms)
    })

    socket.on('joinroom', roomName => {
      if (!rooms[roomName])
        rooms[roomName] = {
          deck: new deck(true),
          wall: [],
          players: [],
          gamestate: {
            turn: 0,
            dealer: 0,
            score: {1: 25000, 2: 25000, 3: 25000, 4: 25000}
          },
          boardstate: {},
          ready: 0
        }
      const players = rooms[roomName].players
      if (players.length < 4) {
        players.push({id: socket.id, player: players.length + 1})
        socket.join(roomName)
        socket.emit('joinedroom', roomName, players.length)
        if (players.length === 4) newRound(roomName, io)
      }
    })

    socket.on('newhand', roomName => {
      let tiles = rooms[roomName].deck.draw(13)
      console.log(`${socket.id} drew a new hand`)
      socket.emit('update_boardstate', rooms[roomName].boardstate)
      socket.emit('newhand', tiles)
    })

    socket.on('draw', roomName => {
      let tile = rooms[roomName].deck.draw(1)[0]
      const {player} = rooms[roomName].players.filter(
        client => client.id === socket.id
      )[0]
      rooms[roomName].boardstate[player].handsize++
      io.in(roomName).emit('update_boardstate', rooms[roomName].boardstate)
      console.log(rooms[roomName].deck.tiles.length)
      socket.emit('draw', tile)
    })

    socket.on('discard', (tile, roomName) => {
      console.log(`${socket.id} discarded the ${tile.value} ${tile.suit}`)
      const {player} = rooms[roomName].players.filter(
        client => client.id === socket.id
      )[0]
      rooms[roomName].boardstate[player].discards.push(tile)
      rooms[roomName].boardstate[player].handsize--
      rooms[roomName].boardstate.activeDiscard = tile
      rooms[roomName].ready = 0
      io.in(roomName).emit('update_boardstate', rooms[roomName].boardstate)
      io.in(roomName).emit('discard', tile, player)
    })

    socket.on('no call', roomName => {
      rooms[roomName].ready++
      if (rooms[roomName].ready === 4) {
        rooms[roomName].boardstate.activePlayer =
          rooms[roomName].boardstate.activePlayer % 4 + 1
        io.in(roomName).emit('update_boardstate', rooms[roomName].boardstate)
        io.in(roomName).emit('change turn')
      }
    })

    socket.on('call', (roomName, call) => {
      const room = rooms[roomName]
      const {player} = room.players.filter(
        client => client.id === socket.id
      )[0]
      room.boardstate[player].calls.push([...call, room.boardstate.activeDiscard])
      room.boardstate[player].handsize -= call.length
      room.boardstate.activePlayer = player
      io.in(roomName).emit('update_boardstate', room.boardstate)
    })

    socket.on('newgame', roomName => {
      newRound(roomName, io)
    })
  })
}
