const deck = require('../classes/deck')

let rooms = {}

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    rooms[socket.id] = {deck: new deck(true)}

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('joinroom', roomName => {
      socket.join(roomName)
      if (!rooms[roomName]) rooms[roomName] = {deck: new deck(true), players: []}
      const players = rooms[roomName].players
      players.push({id: socket.id, player: players.length + 1})
      socket.emit('joinedroom', roomName, players.length)
      if (players.length === 4) io.in(roomName).emit('gameready')
    })

    socket.on('newhand', roomName => {
      let tiles = rooms[roomName].deck.draw(13)
      socket.emit('newhand', tiles)
    })

    socket.on('draw', roomName => {
      let tile = rooms[roomName].deck.draw(1)[0]
      // console.log(`${socket.id} drew the ${tile.value} ${tile.suit}`)
      socket.emit('draw', tile)
    })

    socket.on('discard', (tile, roomName) => {
      console.log(`${socket.id} discarded the ${tile.value} ${tile.suit}`)
      const {player} = rooms[roomName].players.filter(client => client.id === socket.id)[0]
      io.in(roomName).emit('discard', tile, player)
    })

    socket.on('newgame', roomName => {
      rooms[roomName].deck.newDeck()
      io.in(roomName).emit('gameready')
    })
  })
}
