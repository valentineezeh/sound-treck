import { _updateObject } from "utils";
import * as actionTypes from "../actions/types";

const initialState = {
  authRedirectPath: "/",
  error: null,
  loading: false,
  token: null,
  user: null,
  onSuccess: false,
  isAuthenticated: false
};

const authStart = state =>
  _updateObject(state, { error: null, loading: true, onSuccess: false });

const authSuccess = (state, action) =>
  _updateObject(state, {
    error: null,
    loading: false,
    token: action.token,
    onSuccess: true,
    isAuthenticated: true
  });

const authFail = (state, action) =>
  _updateObject(state, {
    error: action.error,
    loading: false,
    onSuccess: false
  });

const authLogout = state => _updateObject(state, { token: null, user: null });

const getCurrentUser = (state, action) =>
  _updateObject(state, {
    error: null,
    loading: false,
    onSuccess: action.onSuccess,
    user: action.user
  });

const setAuthRedirectPath = (state, action) =>
  _updateObject(state, { authRedirectPath: action.path });

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.GET_CURRENT_USER:
      return getCurrentUser(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default authReducer;
