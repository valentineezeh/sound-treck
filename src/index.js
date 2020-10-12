import React from "react";
import ReactDOM from "react-dom";
import "assets/sass/main.scss";
import "react-toastify/dist/ReactToastify.css";
import "toastr/build/toastr.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import store from "store/reducers";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import setAuthorizationToken from "utils/setAuthorizationToken";
import { setCurrentUser, setUserToken } from "./store/actions/auth/login";

const token = localStorage.getItem("token");
const loginAction = localStorage.getItem("loginAction");

if (token && loginAction === "true") {
  const user = jwt.decode(token);
  store.dispatch(setCurrentUser(user.id));
  store.dispatch(setUserToken(token));
  setAuthorizationToken(token);
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
