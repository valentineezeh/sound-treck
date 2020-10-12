import isEmpty from "is-empty";
import {
  SIGN_UP_ERRORS,
  DELETE_ERROR_MESSAGE,
  SIGN_UP_IS_LOADING,
  SIGN_UP_SUCCESS
} from "../../actions/types";

const initialState = {
  isAuthenticated: false,
  signUpuser: {},
  error: "",
  loading: false
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        signUpuser: action.user,
        loading: false
      };

    case SIGN_UP_ERRORS:
      return {
        ...state,
        isAuthenticated: false,
        signUpuser: {},
        error: action.error,
        loading: false
      };

    case DELETE_ERROR_MESSAGE:
      return {
        error: ""
      };

    case SIGN_UP_IS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default signUpReducer;
