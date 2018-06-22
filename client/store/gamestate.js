const UPDATE_GAMESTATE = 'UPDATE_GAMESTATE'

const initialState = {}

const updateState = gamestate => ({
  type: UPDATE_GAMESTATE,
  gamestate
})

export const updategamestate = gamestate => {
  return dispatch => {
    dispatch(updateState(gamestate))
  }
}

const gamestateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_GAMESTATE:
      return action.gamestate
    default:
      return state
  }
}

export default gamestateReducer
