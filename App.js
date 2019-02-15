// @flow
import React from "react"

import { Provider } from "react-redux"
import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from "redux-thunk"
import Root from "./src/Root"

import { generalReducer as general } from "./src/reducers/generalReducer"
import { ctkReducer as ctk } from "./src/reducers/ctkReducer"

const reducer = combineReducers({
  general,
  ctk,
})

const store = createStore(reducer, applyMiddleware(thunk))

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    )
  }
}

export default App
