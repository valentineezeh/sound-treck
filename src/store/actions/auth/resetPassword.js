import { axios, _catchAxiosError } from "services/axios";
import toastr from "toastr";
import {
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_IS_LOADING,
  DELETE_RESET_PASSWORD_ERROR,
  VALIDATE_PASSWORD_TOKEN_SUCCESS,
  VALIDATE_PASSWORD_TOKEN_ERROR
} from "../types";

const resetPasswordSuccess = result => ({
  type: RESET_PASSWORD_SUCCESS,
  result
});

const resetPasswordError = error => ({
  type: RESET_PASSWORD_ERROR,
  error
});

const resetPasswordIsLoading = () => ({
  type: RESET_PASSWORD_IS_LOADING
});

export const deleteResetPasswordError = () => ({
  type: DELETE_RESET_PASSWORD_ERROR
});

const validatePasswordToken = validatePasswordData => ({
  type: VALIDATE_PASSWORD_TOKEN_SUCCESS,
  validatePasswordData
});

const validatePasswordTokenError = validatePasswordError => ({
  type: VALIDATE_PASSWORD_TOKEN_ERROR,
  validatePasswordError
});

export const verifyPasswordToken = (
  passwordToken,
  onError = false
) => async dispatch => {
  try {
    const response = await axios({
      method: "get",
      url: `/api/verify-reset-link/${passwordToken}`
    });
    const { data } = response;
    dispatch(validatePasswordToken(data));
  } catch (e) {
    if (e.response === undefined) {
      dispatch(
        validatePasswordTokenError(
          "Ooops! something went wrong with your network. Please try again."
        )
      );
    } else {
      const { data } = e.response;
      _catchAxiosError(e, onError);
      dispatch(validatePasswordTokenError(data));
    }
  }
};

export const postResetPassword = (
  passwordData,
  onError = false
) => async dispatch => {
  try {
    dispatch(resetPasswordIsLoading());
    const response = await axios({
      method: "post",
      url: `/api/reset-user-password/${passwordData.resetToken}`,
      data: passwordData
    });
    const { data } = response;
    dispatch(resetPasswordSuccess(data));
    toastr.success("Password reset was successful. Login you in now.");
  } catch (e) {
    if (e.response === undefined) {
      dispatch(
        resetPasswordError(
          "Ooops! something went wrong with your network. Please try again."
        )
      );
    } else {
      const { data } = e.response;
      _catchAxiosError(e, onError);
      dispatch(resetPasswordError(data));
    }
  }
};
