import isEmpty from "is-empty";
import * as actionType from "../actions/types";

const initialState = {
  postAlbumDetails: null,
  error: null,
  postAlbumDetailsLoading: false,
  postAlbumSuccess: false
};

const userUploadAlbum = (state = initialState, action) => {
  switch (action.type) {
    case actionType.UPLOAD_USER_ALBUM_SUCCESS:
      return {
        ...state,
        postAlbumDetails: action.album,
        postAlbumDetailsLoading: false,
        postAlbumSuccess: !isEmpty(action.album)
      };
    case actionType.UPLOAD_USER_ALBUM_ERROR:
      return {
        ...state,
        postAlbumDetails: null,
        error: action.error,
        postAlbumDetailsLoading: false
      };
    case actionType.UPLOAD_USER_ALBUM_ISLOADING:
      return {
        ...state,
        postAlbumDetails: null,
        error: null,
        postAlbumDetailsLoading: true
      };
    case actionType.DELETE_UPLOAD_USER_ALBUM_ERROR:
      return {
        ...state,
        postAlbumDetails: null,
        error: ""
      };
    default:
      return state;
  }
};

export default userUploadAlbum;
