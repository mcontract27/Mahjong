const deck = require('../classes/deck')

let rooms = {}

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    rooms[socket.id] = {deck: new deck(true)}

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('newhand', () => {
      let tiles = rooms[socket.id].deck.draw(13)
      socket.emit('newhand', tiles)
    })

    socket.on('draw', () => {
      let tile = rooms[socket.id].deck.draw(1)[0]
      // console.log(`${socket.id} drew the ${tile.value} ${tile.suit}`)
      socket.emit('draw', tile)
    })

    socket.on('discard', tile => {
      // console.log(`${socket.id} discarded the ${tile.value} ${tile.suit}`)
    })

    socket.on('newgame', () => {
      rooms[socket.id].deck.newDeck()
    })
  })
}
