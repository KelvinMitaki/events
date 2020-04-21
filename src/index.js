import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/layout/App";
import reducers from "./redux/reducers";

import * as serviceWorker from "./serviceWorker";

import { BrowserRouter } from "react-router-dom";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const combineEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, combineEnhancers());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
