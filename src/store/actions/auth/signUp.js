import toastr from "toastr";
import { axios, _catchAxiosError } from "services/axios";
import {
  SIGN_UP_ERRORS,
  DELETE_ERROR_MESSAGE,
  SIGN_UP_IS_LOADING,
  SIGN_UP_SUCCESS
} from "../types";

/**
 * Action to Register a user and return a JWT token
 * @param {*} user - Response object
 * @returns {user} setCurrentUser - to store
 */
const signUpSuccess = user => ({
  type: SIGN_UP_SUCCESS,
  user
});

const isLoading = () => ({
  type: SIGN_UP_IS_LOADING
});

const signUpError = error => ({
  type: SIGN_UP_ERRORS,
  error
});

export const deleteErrorMessage = () => ({
  type: DELETE_ERROR_MESSAGE
});

/**
 * Register a user and return a JWT token
 * @param {*} userData - Response object
 * @param {*} history - Next function
 * @param {*} done - Next function
 * @returns {token} token - JWT token
 */

export const userSignUpRequest = (
  userData,
  onError = false
) => async dispatch => {
  try {
    dispatch(isLoading());
    const response = await axios({
      method: "post",
      url: `/api/signup`,
      data: userData
    });
    const { data } = response;
    dispatch(signUpSuccess(data));
    toastr.success("You have successfully sign up.");
  } catch (e) {
    if (e.response === undefined) {
      dispatch(
        signUpError(
          "Ooops! something went wrong with your network. Please try again."
        )
      );
    } else {
      const { data } = e.response;
      dispatch(signUpError(data));
      _catchAxiosError(e, onError);
    }
    throw e;
  }
};
