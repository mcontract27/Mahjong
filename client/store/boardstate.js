const UPDATE_BOARDSTATE = 'UPDATE_BOARDSTATE'

const initialState = {
  1: {discards: [], calls: [], handsize: 0},
  2: {discards: [], calls: [], handsize: 0},
  3: {discards: [], calls: [], handsize: 0},
  4: {discards: [], calls: [], handsize: 0},
  wall: [],
  activePlayer: 0
}

const updateState = boardstate => ({
  type: UPDATE_BOARDSTATE,
  boardstate
})

export const updateBoardstate = boardstate => {
  return dispatch => {
    dispatch(updateState(boardstate))
  }
}

const boardstateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BOARDSTATE:
      return action.boardstate
    default:
      return state
  }
}

export default boardstateReducer
