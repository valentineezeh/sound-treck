import { axios, _catchAxiosError } from "services/axios";
import { SELECT_USER_ROLE, SELECT_USER_ROLE_ERROR } from "./types";

export const setUserRole = role => ({
  type: SELECT_USER_ROLE,
  role
});

export const setUserRoleError = error => ({
  type: SELECT_USER_ROLE_ERROR,
  error
});

const getUserRole = (userOption, onError = false) => async dispatch => {
  try {
    const response = await axios({
      method: "get",
      url: `/api/roles`
    });
    const { data } = response;
    const mainData = {};
    data.forEach(i => {
      if (i.name === userOption) {
        mainData["id"] = i._id;
        mainData["name"] = i.name;
      }
      return i;
    });
    dispatch(setUserRole(mainData));
  } catch (e) {
    _catchAxiosError(e, onError);
    dispatch(setUserRoleError("Ooops, something went wrong try again."));
  }
};

export default getUserRole;
