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
  Object.assign(newObject, obj)
  return newObject
}

const removeTiles = (obj, arr, count = 1) => {
  arr.forEach(tile => {
    obj[[tile[0], tile[1]]] -= count
    if (obj[[tile[0], tile[1]]] === 0) delete obj[[tile[0], tile[1]]]
  })
}

//don't forget chiitoitsu/kokushi
const calcShanten = (
  handHash,
  threes = 0,
  twos = 0
) => {
  let shantenMin = 13
  for (let i = 0; i < suits.length; i++) {
    let suit = suits[i]
    for (let j = 0; j < suitValues[suit].length; j++) {
      let value = suitValues[suit][j]
      if (!handHash[[suit, value]]) continue
      if (handHash[[suit, value]] >= 3) {
        let handCopy = copyHand(handHash)
        removeTiles(handCopy, [[suit, value]], 3)
        shantenMin = Math.min(
          shantenMin,
          calcShanten(handCopy, threes + 1, twos)
        )
      }
      if (i < 3 && handHash[[suit, value + 1]] && handHash[[suit, value + 2]]) {
        let handCopy = copyHand(handHash)
        removeTiles(handCopy, [
          [suit, value],
          [suit, value + 1],
          [suit, value + 2]
        ])
        shantenMin = Math.min(
          shantenMin,
          calcShanten(handCopy, threes + 1, twos)
        )
      }
      if (i < 3 && threes + twos < 4 && handHash[[suit, value + 1]]) {
        let handCopy = copyHand(handHash)
        removeTiles(handCopy, [[suit, value], [suit, value + 1]])
        shantenMin = Math.min(
          shantenMin,
          calcShanten(handCopy, threes, twos + 1)
        )
      }
      if (i < 3 && threes + twos < 4 && handHash[[suit, value + 2]]) {
        let handCopy = copyHand(handHash)
        removeTiles(handCopy, [[suit, value], [suit, value + 2]])
        shantenMin = Math.min(
          shantenMin,
          calcShanten(handCopy, threes, twos + 1)
        )
      }
      if (threes + twos < 4 && handHash[[suit, value]] >= 2) {
        let handCopy = copyHand(handHash)
        removeTiles(handCopy, [[suit, value]], 2)
        shantenMin = Math.min(
          shantenMin,
          calcShanten(handCopy, threes, twos + 1)
        )
      }
    }
  }
  const values = Object.values(handHash)
  const sum = values.reduce((a, b) => +a + +b, 0)
  let shanten = twos + (sum - (twos + 1)) * 2 / 3
  if (sum > values.length) shanten--
  return Math.min(shanten, shantenMin)
}

export const getShanten = hand => {
  const shantens = {}
  const handHash = {}
  hand.forEach(tile => {
    let count = handHash[[tile.suit, tile.value]] || 0
    handHash[[tile.suit, tile.value]] = count + 1
  })
  Object.keys(handHash).forEach(tile => {
    let handCopy = copyHand(handHash)
    removeTiles(handCopy, [tile.split(',')])
    shantens[tile] = calcShanten(handCopy)
  })
  console.log(shantens)
}
