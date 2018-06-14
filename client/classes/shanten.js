const suits = ['pin', 'sou', 'man', 'wind', 'dragon']
const suitValues = {
  pin: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  sou: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  man: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  wind: ['east', 'south', 'west', 'north'],
  dragon: ['red', 'white', 'green']
}

const copyHand = obj => {
  const newObject = {}
  return Object.assign(newObject, obj)
}

const removeTiles = (obj, arr, count = 1) => {
    console.log(obj, arr)
  arr.forEach(tile => {
    obj[[tile[0], tile[1]]] -= count
    if (obj[[tile[0], tile[1]]] === 0) delete obj[[tile[0], tile[1]]]
  })
  console.log(obj,arr)
}

const calculateShanten = (handHash, suitPos = 0, valuePos = 0) => {
  //don't forget chiitoitsu/kokushi
  let shantenMin = 13
  for (let i = suitPos; i < suits.length; i++) {
    let suit = suits[i]
    for (let j = valuePos; j < suitValues[suit].length; j++) {
      let value = suitValues[suit][j]
      if (!handHash[[suit, value]]) continue;
      if (handHash[[suit, value]] >= 3) {
        let handCopy = copyHand(handHash)
        removeTiles(handCopy, [[suit, value]], 3)
        shantenMin = Math.min(shantenMin, calculateShanten(handCopy, i, j))
      }
      if (handHash[[suit, value]] >= 2) {
        let handCopy = copyHand(handHash)
        removeTiles(handCopy, [[suit, value]], 2)
        shantenMin = Math.min(shantenMin, calculateShanten(handCopy, i, j))
      }
      if (i < 3) {
        if (handHash[[suit, value + 1]] && handHash[[suit, value + 2]]) {
          let handCopy = copyHand(handHash)
          removeTiles(handCopy, [
            [suit, value],
            [suit, value + 1],
            [suit, value + 2]
          ])
          shantenMin = Math.min(shantenMin, calculateShanten(handCopy, i, j))
        }
        if (handHash[[suit, value + 1]]) {
          let handCopy = copyHand(handHash)
          removeTiles(handCopy, [[suit, value], [suit, value + 1]])
          shantenMin = Math.min(shantenMin, calculateShanten(handCopy, i, j))
        }
        if (handHash[[suit, value + 2]]) {
          let handCopy = copyHand(handHash)
          removeTiles(handCopy, [[suit, value], [suit, value + 2]])
          shantenMin = Math.min(shantenMin, calculateShanten(handCopy, i, j))
        }
      }
    }
  }
  const values = Object.values(handHash)
  let sum = values.reduce((a, b) => a + b, 0)
  if (sum > values.length) sum -= 2
  return Math.min(sum, shantenMin)
}

export const getShanten = hand => {
  const shantens = {}
  const handHash = {}
  hand.forEach(tile => {
    let count = handHash[[tile.suit, tile.value]] || 0
    handHash[[tile.suit, tile.value]] = count + 1
  })
  hand.forEach(tile => {
    let handCopy = copyHand(handHash)
    removeTiles(handCopy, [[tile.suit, tile.value]])
    // console.log(tile, obj)
    shantens[[tile.suit, tile.value]] = calculateShanten(handCopy)
  })
  console.log(shantens)
}
