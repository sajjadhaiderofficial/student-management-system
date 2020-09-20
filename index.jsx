import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./ReduxHandling/Store/store";
import "./Styles/index.css";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <Fragment>
      <App />
    </Fragment>
  </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
