import isEmpty from "is-empty";
import {
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  FORGET_PASSWORD_IS_LOADING,
  DELETE_FORGET_PASSWORD_ERROR
} from "store/actions/types";

const initialState = {
  forgetPasswordIsSuccessful: false,
  error: null,
  forgetPasswordIsLoading: false,
  data: null
};

const forgetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        forgetPasswordIsSuccessful: !isEmpty(action.result),
        forgetPasswordIsLoading: false,
        data: action.result
      };
    case DELETE_FORGET_PASSWORD_ERROR:
      return {
        error: ""
      };
    case FORGET_PASSWORD_IS_LOADING:
      return {
        ...state,
        forgetPasswordIsLoading: true
      };
    case FORGET_PASSWORD_ERROR:
      return {
        ...state,
        data: null,
        error: action.error,
        forgetPasswordIsLoading: false
      };
    default:
      return state;
  }
};

export default forgetPasswordReducer;
