import isEmpty from "is-empty";
import {
  UPDATE_USER_SONG_SUCCESS,
  UPDATE_USER_SONG_ERROR,
  UPDATE_USER_SONG_IS_LOADING,
  DELETE_UPDATE_USER_SONG_ERROR
} from "../actions/types.js";

const initialState = {
  updatedSong: null,
  error: null,
  updatedSongIsLoading: false,
  updatedSongSuccess: false
};

const updateSongByUser = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_SONG_SUCCESS:
      return {
        ...state,
        updatedSong: action.updatedSong,
        updatedSongIsLoading: false,
        updatedSongSuccess: !isEmpty(action.updatedSong)
      };
    case UPDATE_USER_SONG_ERROR:
      return {
        ...state,
        updatedSong: null,
        updatedSongIsLoading: false,
        error: action.error
      };
    case UPDATE_USER_SONG_IS_LOADING:
      return {
        ...state,
        updatedSongIsLoading: true
      };
    case DELETE_UPDATE_USER_SONG_ERROR:
      return {
        error: null
      };
    default:
      return state;
  }
};

export default updateSongByUser;
