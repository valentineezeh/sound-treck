import { axios, _catchAxiosError } from "services/axios";
import toastr from "toastr";
import {
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  FORGET_PASSWORD_IS_LOADING,
  DELETE_FORGET_PASSWORD_ERROR
} from "../types";

const forgetPasswordSuccess = result => ({
  type: FORGET_PASSWORD_SUCCESS,
  result
});

const forgetPasswordError = error => ({
  type: FORGET_PASSWORD_ERROR,
  error
});

const forgetPasswordIsLoading = () => ({
  type: FORGET_PASSWORD_IS_LOADING
});

export const deleteForgetPasswordError = () => ({
  type: DELETE_FORGET_PASSWORD_ERROR
});

export const postForgetPassword = (
  payload,
  onError = false
) => async dispatch => {
  try {
    dispatch(forgetPasswordIsLoading());
    const response = await axios({
      method: "post",
      url: `/api/send-reset-link`,
      data: payload
    });
    const { data } = response;
    dispatch(forgetPasswordSuccess(data));
    toastr.success(
      "Success! Forget password request has been sent, Please Check your email for a verification link."
    );
    localStorage.setItem("email", payload.email);
  } catch (e) {
    if (e.response === undefined) {
      dispatch(
        forgetPasswordError(
          "Ooops! something went wrong with your network. Please try again."
        )
      );
    } else {
      const { data } = e.response;
      _catchAxiosError(e, onError);
      dispatch(forgetPasswordError(data));
    }
    throw e;
  }
};
