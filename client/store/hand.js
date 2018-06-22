import {tileSort} from '../classes/deck'

const ADD_TILE_TO_HAND = 'ADD_TILE_TO_HAND'
const NEW_HAND = 'NEW_HAND'
const DISCARD_TILE = 'DISCARD_TILE'
const CALL_TILE = 'CALL_TILE'

const createNewHand = hand => ({
  type: NEW_HAND,
  hand
})

const addTile = tile => ({
  type: ADD_TILE_TO_HAND,
  tile
})

const discardTile = index => ({
  type: DISCARD_TILE,
  index
})

export const newHand = tiles => {
  return dispatch => {
    dispatch(createNewHand(tiles))
  }
}

export const draw = tile => {
  return dispatch => {
    dispatch(addTile(tile))
  }
}

export const discard = tile => {
  return dispatch => {
    dispatch(discardTile(tile))
  }
}

const handReducer = (state = [], action) => {
  switch (action.type) {
    case NEW_HAND:
      return tileSort(action.hand)
    case ADD_TILE_TO_HAND:
      return state.concat(action.tile)
    case DISCARD_TILE:
      return tileSort(
        state.slice(0, action.index).concat(state.slice(action.index + 1))
      )
    case CALL_TILE:
      action.discarded.forEach(tile => {
        let index = state.indexOf(tile)
        state = state.slice(0, index).concat(state.slice(index + 1))
      })
      return state
    default:
      return state
  }
}

export default handReducer
