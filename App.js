import React from 'react';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { generalReducer } from "./src/reducers/generalReducer";
import Root from "./src/Root";

const store = createStore(generalReducer);

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
