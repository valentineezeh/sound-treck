import axios from "axios";
import toastr from "toastr";
import config from "services/config";
import {
  UPLOAD_PROFILE_IMG_SUCCESS,
  UPLOAD_PROFILE_IMG_ERROR,
  UPLOAD_PROFILE_IMG_IS_LOADING,
  DELETE_UPLOAD_PROFILE_IMG_ERROR
} from "./types";

const uploadProfilePicSuccess = profileImage => ({
  type: UPLOAD_PROFILE_IMG_SUCCESS,
  profileImage
});

const uploadProfilePicError = error => ({
  type: UPLOAD_PROFILE_IMG_ERROR,
  error
});

const uploadProfilePicIsLoading = () => ({
  type: UPLOAD_PROFILE_IMG_IS_LOADING
});

export const deleteUploadProfilePicErrorMessages = () => ({
  type: DELETE_UPLOAD_PROFILE_IMG_ERROR
});

export const uploadProfilePic = pic => async dispatch => {
  dispatch(uploadProfilePicIsLoading());
  const token = localStorage.getItem("token");
  try {
    const formData = new FormData();
    formData.append("picture", pic);

    const response = await axios.post(
      `${config.apiUrl}/upload/picture`,
      formData,
      {
        headers: {
          Authorization: token
        }
      }
    );
    const { data } = response;
    dispatch(uploadProfilePicSuccess(data.data));
    toastr.success("Profile pic upload was successful.");
    formData.delete("picture");
  } catch (e) {
    if (e.response === undefined) {
      dispatch(
        uploadProfilePicError(
          "Ooops! something went wrong with your network. Please try again."
        )
      );
    } else {
      const { data } = e.response;
      dispatch(uploadProfilePicError(data.message));
    }
  }
};
