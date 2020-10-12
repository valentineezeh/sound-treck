import {
  UPLOAD_SONG_SUCCESS,
  UPLOAD_SONG_ERROR,
  UPLOAD_SONG_IS_LOADING,
  DELETE_UPLOAD_SONG_ERROR
} from "store/actions/types";

const initialState = {
  musicUrl: null,
  error: null,
  isLoading: false
};

const userMusicUploader = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_SONG_SUCCESS:
      return {
        ...state,
        musicUrl: action.song,
        isLoading: false
      };
    case UPLOAD_SONG_ERROR:
      return {
        ...state,
        musicUrl: null,
        error: action.error,
        isLoading: false
      };
    case UPLOAD_SONG_IS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_UPLOAD_SONG_ERROR:
      return {
        error: ""
      };
    default:
      return state;
  }
};

export default userMusicUploader;
