import toastr from "toastr";
import * as actionTypes from "./types";
import { logout } from "services/auth";

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = token => ({
  type: actionTypes.AUTH_SUCCESS,
  token
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error
});

export const authLogout = () => ({
  type: actionTypes.AUTH_LOGOUT
});

export const getCurrentUser = (user, onSuccess = false) => ({
  type: actionTypes.GET_CURRENT_USER,
  onSuccess,
  user
});

export const checkAuthTimeout = expirationTime => dispatch => {
  setTimeout(() => {
    dispatch(logout());
    toastr.success("Goodbye! Come again soon.");
  }, 1000 * 60 * 60);
};

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("currentUser");

  if (!token || !userId) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate > new Date()) {
      dispatch(authSuccess(token));
      dispatch(
        checkAuthTimeout(expirationDate.getTime() - new Date().getTime())
      );
    } else {
      dispatch(logout());
    }
  }
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path
});
