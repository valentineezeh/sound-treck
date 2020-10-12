import {
  UPLOAD_PROFILE_IMG_SUCCESS,
  UPLOAD_PROFILE_IMG_ERROR,
  UPLOAD_PROFILE_IMG_IS_LOADING,
  DELETE_UPLOAD_PROFILE_IMG_ERROR
} from "store/actions/types";

const initialState = {
  profilePicUrl: null,
  error: null,
  profileImgLoading: false
};

const userProfileUploader = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_PROFILE_IMG_SUCCESS:
      return {
        ...state,
        profilePicUrl: action.profileImage,
        profileImgLoading: false
      };
    case UPLOAD_PROFILE_IMG_ERROR:
      return {
        ...state,
        profilePicUrl: null,
        error: action.error,
        profileImgLoading: false
      };
    case UPLOAD_PROFILE_IMG_IS_LOADING:
      return {
        ...state,
        profileImgLoading: true
      };
    case DELETE_UPLOAD_PROFILE_IMG_ERROR:
      return {
        error: ""
      };
    default:
      return state;
  }
};

export default userProfileUploader;
