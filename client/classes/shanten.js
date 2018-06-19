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

const removeTwos = (handHash, threes, twos = 0) => {
  const tiles = Object.keys(handHash)
  let suit, value, handCopy
  let shantenMin = 6
  if (threes + twos < 4) {
    tiles.forEach(tile => {
      ;[suit, value] = tile.split(',')
      if (handHash[tile] >= 2) {
        handCopy = copyHand(handHash)
        removeTiles(handCopy, [[suit, value]], 2)
        shantenMin = Math.min(
          shantenMin,
          removeTwos(handCopy, threes, twos + 1)
        )
      }
      if (suits.indexOf(suit) >= 3) return
      value = Number(value)
      if (handHash[[suit, value + 1]]) {
        handCopy = copyHand(handHash)
        removeTiles(handCopy, [[suit, value], [suit, value + 1]])
        shantenMin = Math.min(
          shantenMin,
          removeTwos(handCopy, threes, twos + 1)
        )
      }
      if (handHash[[suit, value + 2]]) {
        handCopy = copyHand(handHash)
        removeTiles(handCopy, [[suit, value], [suit, value + 2]])
        shantenMin = Math.min(
          shantenMin,
          removeTwos(handCopy, threes, twos + 1)
        )
      }
    })
  }
  const values = Object.values(handHash)
  const sum = values.reduce((a, b) => a + b, 0)
  let shanten = twos + (sum - (twos + 1)) * 2 / 3
  if (sum > values.length) shanten--
  return Math.min(shanten, shantenMin)
}

//don't forget chiitoitsu/kokushi
const removeThrees = (handHash, threes = 0) => {
  const tiles = Object.keys(handHash)
  let suit, value, handCopy
  let shantenMin = 6
  tiles.forEach(tile => {
    ;[suit, value] = tile.split(',')
    if (handHash[tile] >= 3) {
      handCopy = copyHand(handHash)
      removeTiles(handCopy, [[suit, value]], 3)
      shantenMin = Math.min(shantenMin, removeThrees(handCopy, threes + 1))
    }
    if (suits.indexOf(suit) >= 3) return
    value = Number(value)
    if (handHash[[suit, value + 1]] && handHash[[suit, value + 2]]) {
      handCopy = copyHand(handHash)
      removeTiles(handCopy, [
        [suit, value],
        [suit, value + 1],
        [suit, value + 2]
      ])
      shantenMin = Math.min(shantenMin, removeThrees(handCopy, threes + 1))
    }
  })
  shantenMin = Math.min(shantenMin, removeTwos(handHash, threes))
  return shantenMin
}

const chitoiitsuCheck = handHash => {
  const values = Object.values(handHash)
  let shanten = 7
  shanten -= values.filter(value => value >= 2).length
  if (values.indexOf(1) >= 0) shanten--
  return shanten
}

const kokushiCheck = handHash => {
  const kTiles = [
    'pin,1',
    'pin,9',
    'sou,1',
    'sou,9',
    'man,1',
    'man,9',
    'wind,east',
    'wind,south',
    'wind,west',
    'wind,north',
    'dragon,red',
    'dragon,white',
    'dragon,green'
  ]
  let shanten = 13
  const filteredHand = Object.keys(handHash).filter(tile => kTiles.indexOf(tile) >= 0)
  shanten -= filteredHand.length
  for (let i = 0; i < filteredHand.length; i++){
    if (handHash[filteredHand[i]] >= 2) return shanten - 1
  }
  return shanten
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
    shantens[tile] = Math.min(
      removeThrees(handCopy),
      chitoiitsuCheck(handCopy),
      kokushiCheck(handCopy)
    )
  })
  console.log(shantens)
}
