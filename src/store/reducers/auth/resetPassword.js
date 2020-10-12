import isEmpty from "is-empty";
import {
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_IS_LOADING,
  DELETE_RESET_PASSWORD_ERROR,
  VALIDATE_PASSWORD_TOKEN_SUCCESS,
  VALIDATE_PASSWORD_TOKEN_ERROR
} from "store/actions/types";

const initialState = {
  resetPasswordIsSuccessful: false,
  error: null,
  resetPasswordIsLoading: false,
  data: null,
  verifyPasswordSuccess: null,
  verifyPasswordError: null,
  verifyPasswordIsSuccessful: false
};

const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordIsSuccessful: !isEmpty(action.result),
        resetPasswordIsLoading: false,
        data: action.result
      };
    case DELETE_RESET_PASSWORD_ERROR:
      return {
        error: ""
      };
    case RESET_PASSWORD_IS_LOADING:
      return {
        ...state,
        resetPasswordIsLoading: true
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        data: null,
        error: action.error,
        resetPasswordIsLoading: false
      };
    case VALIDATE_PASSWORD_TOKEN_SUCCESS:
      return {
        ...state,
        verifyPasswordSuccess: action.validatePasswordData,
        verifyPasswordError: null,
        verifyPasswordIsSuccessful: !isEmpty(action.validatePasswordData)
      };
    case VALIDATE_PASSWORD_TOKEN_ERROR:
      return {
        ...state,
        verifyPasswordError: action.validatePasswordError
      };
    default:
      return state;
  }
};

export default resetPasswordReducer;
