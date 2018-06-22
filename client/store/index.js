import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import handReducer from './hand'
import playerReducer from './player'
import gamestateReducer from './gamestate'
import boardstateReducer from './boardstate'

const reducer = combineReducers({
  player: playerReducer,
  hand: handReducer,
  gamestate: gamestateReducer,
  boardstate: boardstateReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
// export * from './user'
