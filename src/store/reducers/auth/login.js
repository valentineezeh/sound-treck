import isEmpty from "is-empty";
import {
  LOGIN_USER,
  SET_CURRENT_USER_ERROR,
  DELETE_ERROR_MESSAGE,
  IS_LOADING,
  SET_CURRENT_USER,
  SET_USER_TOKEN,
  REMOVE_USER_TOKEN
} from "store/actions/types";

const initialState = {
  authRedirectPath: "/",
  isAuthenticated: false,
  user: {},
  error: "",
  loading: false,
  userId: "",
  token: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.loginUserData),
        user: action.loginUserData,
        loading: false
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.id),
        userId: action.id,
        loading: false
      };
    case SET_USER_TOKEN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.token),
        token: action.token,
        loading: false
      };
    case SET_CURRENT_USER_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        error: action.error,
        loading: false
      };
    case REMOVE_USER_TOKEN:
      return {
        ...state,
        token: null,
        userId: ""
      };
    case DELETE_ERROR_MESSAGE:
      return {
        error: ""
      };
    case IS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default loginReducer;
