const CHANGE_CALL_OPTIONS = 'CHANGE_CALL_OPTIONS'
const CHANGE_ROOM = 'CHANGE_ROOM'

const initialState = {
  room: '',
  player: -1,
  calls: {}
}

const changePlayerRoom = (room, player) => ({
  type: CHANGE_ROOM,
  room,
  player
})

const changeCallOptions = calls => ({
  type: CHANGE_CALL_OPTIONS,
  calls
})

export const setPlayerRoom = (room, player) => {
  return dispatch => {
    dispatch(changePlayerRoom(room, player))
  }
}

export const setCallOptions = calls => {
  return dispatch => {
    dispatch(changeCallOptions(calls))
  }
}

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ROOM:
      return {...state, room: action.room, player: action.player}
    case CHANGE_CALL_OPTIONS:
      return {...state, calls: action.calls}
    default:
      return state
  }
}

export default playerReducer
