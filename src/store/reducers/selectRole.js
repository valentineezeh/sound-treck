import isEmpty from "is-empty";
import { SELECT_USER_ROLE, SELECT_USER_ROLE_ERROR } from "../actions/types";

const initialState = {
  userRole: {},
  errorMessage: "",
  success: false
};

const getUserRole = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_USER_ROLE:
      return {
        ...state,
        userRole: action.role,
        success: !isEmpty(action.role)
      };
    case SELECT_USER_ROLE_ERROR:
      return {
        ...state,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

export default getUserRole;
