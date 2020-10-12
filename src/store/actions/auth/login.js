import { axios, _catchAxiosError } from "services/axios";
import toastr from "toastr";
import jwt from "jsonwebtoken";
import { authSuccess, getCurrentUser } from "../auth";
import {
  LOGIN_USER,
  SET_CURRENT_USER_ERROR,
  DELETE_ERROR_MESSAGE,
  IS_LOADING,
  SET_CURRENT_USER,
  SET_USER_TOKEN,
  REMOVE_USER_TOKEN
} from "../types";
import {
  checkAuthTimeout
  // updateMusicianProfile
} from "store/actions";

import { getMusicianDetailsApi } from "controllers/music";

const loginCurrentUser = loginUserData => ({
  type: LOGIN_USER,
  loginUserData
});

const isLoading = () => ({
  type: IS_LOADING
});

export const setCurrentUserError = error => ({
  type: SET_CURRENT_USER_ERROR,
  error
});

export const setCurrentUser = id => ({
  type: SET_CURRENT_USER,
  id
});

export const setUserToken = token => ({
  type: SET_USER_TOKEN,
  token
});

export const removeUserToken = () => ({
  type: REMOVE_USER_TOKEN
});

export const deleteErrorMessages = () => ({
  type: DELETE_ERROR_MESSAGE
});

export const userLoginRequest = (
  userData,
  onError = false
) => async dispatch => {
  try {
    dispatch(isLoading());
    const response = await axios({
      method: "post",
      url: `/api/login`,
      data: userData
    });
    const { data } = response;
    const expirationDate = new Date(data.expiry * 2000);
    dispatch(loginCurrentUser(data.user));
    dispatch(setCurrentUser(data.user._id));
    dispatch(setUserToken(data.token));
    dispatch(authSuccess(data.token));
    dispatch(getCurrentUser(data.user));
    localStorage.setItem("token", data.token);
    localStorage.setItem("currentUser", data.user._id);
    localStorage.setItem("expirationDate", expirationDate);
    localStorage.setItem("loginAction", "true");
    localStorage.setItem("expiry", data.expire);
    toastr.success(`Welcome back ${data.user.fullName}`);
    dispatch(checkAuthTimeout(data.expire));
    localStorage.removeItem("email");
  } catch (e) {
    if (e.response === undefined) {
      dispatch(
        setCurrentUserError(
          "Ooops! something went wrong with your network. Please try again."
        )
      );
    } else {
      const { data } = e.response;
      _catchAxiosError(e, onError);
      dispatch(setCurrentUserError(data.message));
    }
    throw e;
  }
};
