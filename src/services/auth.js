import { axios, _catchAxiosError } from "./axios";
import {
  authStart,
  getCurrentUser,
  authFail,
  authLogout,
  setAuthRedirectPath
} from "store/actions";
import { removeUserToken } from "store/actions/auth/login";

export const logout = () => async dispatch => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("loginAction");
  localStorage.removeItem("expiry");

  dispatch(authLogout());
  dispatch(removeUserToken());
  dispatch(setAuthRedirectPath("/"));
  // return (window.location.href = '/')
};

export const setCurrentUser = (userId, onError = false) => async dispatch => {
  dispatch(authStart());

  try {
    const response = await axios({
      method: "get",
      url: `/api/users/${userId}`
    });

    const data = { ...response.data };

    dispatch(getCurrentUser(data));
  } catch (e) {
    _catchAxiosError(e, onError);

    dispatch(authFail("Could not get user info, please login again"));
    dispatch(logout());
  }
};
