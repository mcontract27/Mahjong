const deck = require('../classes/deck')

let rooms = {}

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    rooms[socket.id] = {deck: new deck(true)}

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('draw', count => {
      let tiles = rooms[socket.id].deck.draw(count)
      socket.emit('draw', tiles)
    })

    socket.on('discard', tile => {
      console.log(`${socket.id} discarded the ${tile.value} ${tile.suit}`)
    })

    socket.on('newgame', () => {
      rooms[socket.id].deck.newDeck()
    })
  })
}
